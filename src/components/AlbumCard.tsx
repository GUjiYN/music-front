import React from 'react';

interface AlbumProps {
  id: string;
  title: string;
  coverImage: string;
  releaseYear: number;
  trackCount: number;
  onClick?: () => void;
}

export const AlbumCard: React.FC<AlbumProps> = ({
  id,
  title,
  coverImage,
  releaseYear,
  trackCount,
  onClick
}) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
      onClick={onClick}
    >
      <div className="h-64 bg-gray-200 relative group/img">
        <img 
          src={coverImage || `https://placehold.co/400x400/pink/white?text=${title}`} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col justify-end p-4">
          <div className="grid grid-cols-3 gap-2 w-full">
             <span className="text-white text-sm font-medium col-span-1">{trackCount} 首歌曲</span>
            <button className="col-span-2 group/btn relative overflow-hidden bg-stone-200 text-stone-600 font-medium py-1.5 px-3 rounded-md flex items-center justify-center text-sm w-full">
              <span className="relative z-10">查看详情</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 ml-1 transition-transform duration-300 group-hover:translate-x-0.5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="absolute inset-0 bg-gradient-to-r from-stone-200 to-stone-300 transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500"></span>
            </button>
          </div>
        </div>
      </div>
      <div className="p-4 flex flex-col">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-stone-600 leading-tight">{title}</h3>
        </div>
      </div>
    </div>
  );
}; 