
import React from 'react';
import { ImageUploader } from './ImageUploader';
import { Product } from '../types';
import { Loader } from './Loader';

interface TryOnCanvasProps {
  userImage: string | null;
  editedImage: string | null;
  isLoading: boolean;
  onImageUpload: (base64Image: string) => void;
  onProductDrop: (product: Product) => void;
  onReset: () => void;
}

export const TryOnCanvas: React.FC<TryOnCanvasProps> = ({ userImage, editedImage, isLoading, onImageUpload, onProductDrop, onReset }) => {
  const [isDraggingOver, setIsDraggingOver] = React.useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (userImage) {
      setIsDraggingOver(true);
    }
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
    if (userImage) {
      const productData = e.dataTransfer.getData("application/json");
      if (productData) {
        onProductDrop(JSON.parse(productData));
      }
    }
  };

  const displayedImage = editedImage || userImage;

  return (
    <div className="w-full lg:w-3/4 h-full bg-white rounded-lg shadow-lg flex justify-center items-center p-4 relative">
      {!displayedImage ? (
        <ImageUploader onImageUpload={onImageUpload} />
      ) : (
        <div 
          className={`w-full h-full rounded-lg transition-all duration-300 ${isDraggingOver ? 'ring-4 ring-indigo-500 ring-offset-2' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="absolute top-4 right-4 z-20 flex space-x-2">
              <button onClick={onReset} className="px-4 py-2 bg-white text-gray-700 font-semibold rounded-full shadow-md hover:bg-gray-100 transition-colors">
                  Réinitialiser
              </button>
          </div>
          {isLoading && <Loader />}
          <img 
            src={displayedImage} 
            alt="Essai virtuel" 
            className="object-contain w-full h-full rounded-lg"
          />
          {!isLoading && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center p-3 rounded-b-lg">
                <p>Glissez un article du panier sur l'image pour l'essayer !</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
