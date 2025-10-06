
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center z-10 rounded-lg">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-400"></div>
      <p className="text-white text-lg mt-4 font-semibold">L'IA prépare votre tenue...</p>
    </div>
  );
};
