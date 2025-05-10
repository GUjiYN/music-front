import React from 'react';

interface SongProps {
  id: string;
  title: string;
  duration: string; // 格式: "3:45"
  albumTitle?: string;
  onPlay?: () => void;
}

export const SongItem: React.FC<SongProps> = ({
  id,
  title,
  duration,
  albumTitle,
  onPlay
}) => {
  return (
    <div className="items-center p-3 grid grid-cols-8 hover:bg-purple-50 rounded-md group transition-colors">
      <div className="mr-4 opacity-50 group-hover:opacity-100 w-6 text-center col-span-2">
        <button 
          onClick={(e) => { e.stopPropagation(); onPlay?.(); }} 
          className="text-purple-700 hidden group-hover:block"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
      
    
      <div className="flex items-center col-span-2">
        <span className="font-medium">{title}</span>
      </div>
      
      <div className="flex col-span-2">
        <span className="text-stone-700 text-sm">{albumTitle}</span>
      </div>
      <div className="flex col-span-2 justify-end">
        <span className="text-stone-700 text-sm">{duration}</span>
      </div>
    </div>
  );
}; 