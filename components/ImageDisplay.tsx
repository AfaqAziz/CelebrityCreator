
import React from 'react';

interface ImageDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ imageUrl, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-center text-slate-400">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-violet-500"></div>
        <p className="mt-4 text-lg font-semibold">Generating your influencer...</p>
        <p className="text-sm">This may take a moment.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center text-center text-red-400 bg-red-900/20 rounded-lg p-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="font-bold">An Error Occurred</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (imageUrl) {
    return (
      <div className="w-full aspect-square">
        <img 
          src={imageUrl} 
          alt="Generated Celebrity" 
          className="w-full h-full object-cover rounded-lg shadow-2xl animate-fade-in" 
        />
        <style>{`
          @keyframes fade-in {
            0% { opacity: 0; transform: scale(0.95); }
            100% { opacity: 1; transform: scale(1); }
          }
          .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center text-slate-500 border-2 border-dashed border-slate-700 rounded-lg p-8">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <p className="font-semibold">Your generated image will appear here.</p>
      <p className="text-sm">Fill out the form and click "Generate" to begin.</p>
    </div>
  );
};

export default ImageDisplay;
