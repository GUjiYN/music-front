import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Album, sampleAlbums } from '../../models/music';
import { SongItem } from '../../components/SongItem';

export function AlbumDetail(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const [album, setAlbum] = useState<Album | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    // 在实际应用中，这里会从API获取数据
    // 这里使用示例数据
    const foundAlbum = sampleAlbums.find(a => a.id === id);
    setAlbum(foundAlbum || null);
  }, [id]);

  const handleToggleFavorite = (songId: string) => {
    setFavorites(prev => 
      prev.includes(songId) 
        ? prev.filter(id => id !== songId)
        : [...prev, songId]
    );
  };

  if (!album) {
    return (
      <div className="flex justify-center items-center h-dvh w-full">
        <div className="text-xl text-gray-500">加载中...</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[100vw] overflow-x-hidden">
      <div className="min-h-dvh bg-gradient-to-b from-purple-50 to-pink-50 w-full">
        {/* 导航栏 */}
        <nav className="p-4 w-full bg-white/80 backdrop-blur-md sticky top-0 z-10 shadow-sm">
          <div className="w-full px-4 md:px-8 flex justify-between items-center">
            <div className="text-2xl font-bold text-purple-600">Taylor's World</div>
            <div className="flex gap-6">
              <a href="/" className="hover:text-purple-600 transition-colors">首页</a>
              <a href="#" className="hover:text-purple-600 transition-colors">专辑</a>
              <a href="#" className="hover:text-purple-600 transition-colors">歌曲</a>
              <a href="#" className="hover:text-purple-600 transition-colors">演唱会</a>
              <a href="#" className="hover:text-purple-600 transition-colors">关于</a>
            </div>
          </div>
        </nav>
        
        {/* 专辑信息 */}
        <div className="w-full px-4 md:px-8 pt-8 pb-16">
          <div className="flex flex-col md:flex-row gap-8">
            {/* 专辑封面 */}
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <img 
                  src={album.coverImage} 
                  alt={album.title} 
                  className="w-full h-auto rounded"
                />
                <div className="mt-4 flex justify-center">
                  <button 
                    className={`px-6 py-2 rounded-full flex items-center gap-2 ${
                      isPlaying
                        ? 'bg-pink-100 text-pink-700'
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>暂停</span>
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        <span>播放</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
            
            {/* 专辑详情 */}
            <div className="flex-1">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-3xl font-bold text-purple-800">{album.title}</h1>
                  <span className="text-gray-500">({album.releaseYear})</span>
                </div>
                <p className="text-lg text-gray-700 mb-4">Taylor Swift</p>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                    {album.trackCount} 首歌曲
                  </div>
                  <div className="text-gray-500 text-sm flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>约 {Math.floor(album.trackCount * 3.5)} 分钟</span>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-2">专辑简介</h2>
                  <p className="text-gray-700">{album.description}</p>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">歌曲</h2>
                  <div className="bg-gray-50 rounded-lg">
                    {album.songs?.map((song) => (
                      <SongItem
                        key={song.id}
                        id={song.id}
                        title={song.title}
                        duration={song.duration}
                        isExplicit={song.isExplicit}
                        isFavorite={favorites.includes(song.id)}
                        onPlay={() => console.log(`Playing song: ${song.title}`)}
                        onToggleFavorite={() => handleToggleFavorite(song.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 相关专辑推荐 */}
        <div className="w-full bg-white py-12">
          <div className="w-full px-4 md:px-8">
            <h2 className="text-2xl font-bold mb-6 text-purple-800">你可能也喜欢</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {sampleAlbums
                .filter(a => a.id !== album.id)
                .slice(0, 5)
                .map(relatedAlbum => (
                  <a 
                    key={relatedAlbum.id} 
                    href={`/album/${relatedAlbum.id}`}
                    className="block group"
                  >
                    <div className="bg-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="h-40 overflow-hidden">
                        <img 
                          src={relatedAlbum.coverImage} 
                          alt={relatedAlbum.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-purple-700 truncate">{relatedAlbum.title}</h3>
                        <p className="text-xs text-gray-500">{relatedAlbum.releaseYear}</p>
                      </div>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </div>
        
        {/* 页脚 */}
        <footer className="w-full bg-gray-800 text-white py-8">
          <div className="w-full px-4 md:px-8">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-xl font-bold text-purple-300">Taylor's World</h3>
                <p className="mt-2 text-gray-400">全球Swifties的音乐天堂</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-purple-300">浏览</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="#" className="hover:text-white">专辑</a></li>
                    <li><a href="#" className="hover:text-white">歌曲</a></li>
                    <li><a href="#" className="hover:text-white">MV</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-purple-300">关注我们</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="#" className="hover:text-white">微博</a></li>
                    <li><a href="#" className="hover:text-white">微信</a></li>
                    <li><a href="#" className="hover:text-white">抖音</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-purple-300">支持</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="#" className="hover:text-white">联系我们</a></li>
                    <li><a href="#" className="hover:text-white">隐私政策</a></li>
                    <li><a href="#" className="hover:text-white">使用条款</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400">
              <p>© 2023 Taylor's World. 保留所有权利。本网站仅用于粉丝交流，与Taylor Swift官方无关。</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
} 