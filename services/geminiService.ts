
import { GoogleGenAI, Modality } from "@google/genai";
import { Product } from '../types';

if (!process.env.API_KEY) {
    throw new Error("La variable d'environnement API_KEY n'est pas définie.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

function base64ToGenerativePart(base64Data: string, mimeType: string) {
  return {
    inlineData: {
      data: base64Data.split(',')[1],
      mimeType
    }
  };
}

export const applyClothingToImage = async (
  baseImage: string,
  product: Product
): Promise<string> => {
  try {
    const imageMimeType = baseImage.substring(baseImage.indexOf(':') + 1, baseImage.indexOf(';'));
    const imagePart = base64ToGenerativePart(baseImage, imageMimeType);

    const fullPrompt = `Tâche : Superposer un vêtement sur une personne dans une image.
    Image de base : [ci-jointe]
    Vêtement à ajouter : ${product.name}
    Instructions : ${product.prompt}. Le vêtement doit s'adapter de manière réaliste à la posture et à la morphologie de la personne. Conserve le fond d'origine. Assure un rendu naturel des textures, des plis et des ombres pour une intégration parfaite. Ne modifie rien d'autre sur l'image.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [imagePart, { text: fullPrompt }]
      },
      config: {
          responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
            const base64ImageBytes: string = part.inlineData.data;
            return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
        }
    }
    
    throw new Error("Aucune image n'a été retournée par l'API.");

  } catch (error) {
    console.error("Erreur lors de l'appel à l'API Gemini:", error);
    throw new Error("Impossible de générer l'image. Veuillez réessayer.");
  }
};
