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
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end p-4">
          <span className="text-white text-sm font-medium">{trackCount} 首歌曲</span>
        </div>
      </div>
      <div className="p-4 flex flex-col">
        <div className="space-y-1 mb-3">
          <h3 className="text-xl font-semibold text-stone-600 leading-tight">{title}</h3>
          <p className="text-stone-500 text-sm">{releaseYear} 年发行</p>
        </div>
        <div className="mt-auto">
          <button className="w-full mt-2 border border-stone-600 text-stone-600 font-medium relative overflow-hidden group/btn py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span>查看专辑详情</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
            <span className="absolute inset-0 bg-stone-200 transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300 ease-out"></span>
          </button>
        </div>
      </div>
    </div>
  );
}; 