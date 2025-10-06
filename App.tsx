
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ProductPanel } from './components/ProductPanel';
import { TryOnCanvas } from './components/TryOnCanvas';
import { PRODUCTS } from './constants';
import { Product } from './types';
import { applyClothingToImage } from './services/geminiService';

const App: React.FC = () => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (base64Image: string) => {
    setUserImage(base64Image);
    setEditedImage(null);
    setError(null);
  };
  
  const handleProductDrop = useCallback(async (product: Product) => {
    const baseImage = editedImage || userImage;
    if (!baseImage) return;

    setIsLoading(true);
    setError(null);
    try {
      const newImage = await applyClothingToImage(baseImage, product);
      setEditedImage(newImage);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur inconnue est survenue.");
    } finally {
      setIsLoading(false);
    }
  }, [userImage, editedImage]);

  const handleReset = () => {
    setEditedImage(null);
    setError(null);
  }

  const handleNewPhoto = () => {
    setUserImage(null);
    setEditedImage(null);
    setError(null);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 lg:p-8">
        {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4" role="alert">
                <strong className="font-bold">Erreur : </strong>
                <span className="block sm:inline">{error}</span>
            </div>
        )}
        {userImage && (
             <div className="mb-4 text-right">
                <button onClick={handleNewPhoto} className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-full shadow-md hover:bg-indigo-700 transition-colors">
                    Changer de photo
                </button>
            </div>
        )}
        <div className="flex flex-col lg:flex-row gap-8 h-[75vh]">
          <ProductPanel products={PRODUCTS} />
          <TryOnCanvas 
            userImage={userImage} 
            editedImage={editedImage}
            isLoading={isLoading}
            onImageUpload={handleImageUpload}
            onProductDrop={handleProductDrop}
            onReset={handleReset}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
