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
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="h-64 bg-gray-200 relative group">
        <img 
          src={coverImage || `https://placehold.co/400x400/pink/white?text=${title}`} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <span className="text-white text-sm font-medium">{trackCount} 首歌曲</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-purple-800">{title}</h3>
        <p className="text-gray-600 mt-1">发行于 {releaseYear}</p>
        <button className="mt-4 text-purple-600 font-medium hover:underline flex items-center gap-1">
          <span>查看专辑</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}; 