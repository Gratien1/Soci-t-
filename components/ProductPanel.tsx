
import React from 'react';
import { Product } from '../types';

interface ProductPanelProps {
  products: Product[];
}

export const ProductPanel: React.FC<ProductPanelProps> = ({ products }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, product: Product) => {
    e.dataTransfer.setData("application/json", JSON.stringify(product));
  };

  return (
    <div className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-lg h-full overflow-y-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Mon Panier</h2>
      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            draggable
            onDragStart={(e) => handleDragStart(e, product)}
            className="flex items-center p-3 bg-gray-50 rounded-md cursor-grab active:cursor-grabbing hover:bg-indigo-100 hover:shadow-md transition-all duration-200"
          >
            <img src={product.imageSrc} alt={product.name} className="w-16 h-16 rounded-md object-cover mr-4" />
            <div>
              <p className="font-semibold text-gray-700">{product.name}</p>
              <p className="text-sm text-gray-500">{product.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
