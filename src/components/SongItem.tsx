import React from 'react';

interface SongProps {
  id: string;
  title: string;
  duration: string; // 格式: "3:45"
  albumTitle?: string;
  isExplicit?: boolean;
  isFavorite?: boolean;
  onPlay?: () => void;
  onToggleFavorite?: () => void;
}

export const SongItem: React.FC<SongProps> = ({
  id,
  title,
  duration,
  albumTitle,
  isExplicit = false,
  isFavorite = false,
  onPlay,
  onToggleFavorite
}) => {
  return (
    <div className="flex items-center p-3 hover:bg-purple-50 rounded-md group transition-colors">
      <div className="mr-4 opacity-50 group-hover:opacity-100 w-6 text-center">
        <button 
          onClick={(e) => { e.stopPropagation(); onPlay?.(); }} 
          className="text-purple-700 hidden group-hover:block"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
        <span className="group-hover:hidden">{id}</span>
      </div>
      
      <div className="flex-grow">
        <div className="flex items-center">
          <span className="font-medium">{title}</span>
          {isExplicit && (
            <span className="ml-2 px-1.5 py-0.5 text-xs bg-gray-200 text-gray-700 rounded">
              E
            </span>
          )}
        </div>
        {albumTitle && <p className="text-sm text-gray-500">{albumTitle}</p>}
      </div>
      
      <div className="flex items-center gap-3">
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleFavorite?.(); }}
          className={`text-gray-400 hover:text-pink-500 ${isFavorite ? 'text-pink-500' : ''}`}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill={isFavorite ? "currentColor" : "none"} 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
        <span className="text-gray-500 text-sm">{duration}</span>
      </div>
    </div>
  );
}; 