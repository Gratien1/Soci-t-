
import { Product } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Casquette Noire",
    imageSrc: "https://picsum.photos/seed/cap/200",
    category: "Accessoires",
    prompt: "Ajoute cette casquette noire sur la tête de la personne."
  },
  {
    id: 2,
    name: "T-shirt Blanc Basique",
    imageSrc: "https://picsum.photos/seed/tshirt1/200",
    category: "Hauts",
    prompt: "Habille la personne avec ce t-shirt blanc basique."
  },
  {
    id: 3,
    name: "T-shirt Graphique",
    imageSrc: "https://picsum.photos/seed/tshirt2/200",
    category: "Hauts",
    prompt: "Habille la personne avec ce t-shirt noir à motif graphique."
  },
  {
    id: 4,
    name: "Jean Bleu Classique",
    imageSrc: "https://picsum.photos/seed/jeans1/200",
    category: "Bas",
    prompt: "Mets ce jean bleu classique à la personne."
  },
  {
    id: 5,
    name: "Pantalon Cargo Beige",
    imageSrc: "https://picsum.photos/seed/jeans2/200",
    category: "Bas",
    prompt: "Mets ce pantalon cargo beige à la personne."
  },
  {
    id: 6,
    name: "Manteau d'Hiver",
    imageSrc: "https://picsum.photos/seed/coat/200",
    category: "Manteaux",
    prompt: "Ajoute ce manteau d'hiver chaud par-dessus les autres vêtements de la personne."
  }
];
