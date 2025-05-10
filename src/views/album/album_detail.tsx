import {JSX, useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SongItem } from '../../components/SongItem';
import { AlbumEntity } from '../../models/entity/album_entity';
import { SongEntity } from '../../models/entity/song_entity';
import { GetAlbumDetailAPI } from '../../api/album_api';
import { GetAlbumSongsAPI } from '../../api/song_api';
import { message } from 'antd';

export function AlbumDetail(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [album, setAlbum] = useState<AlbumEntity | null>(null);
  const [songs, setSongs] = useState<SongEntity[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchAlbumData = async () => {
      setLoading(true);
      try {
        // 获取专辑详情
        const albumResp = await GetAlbumDetailAPI(id);
        if (albumResp?.message === "OK" && albumResp.data) {
          setAlbum(albumResp.data);
          
          // 获取歌曲列表
          const songsResp = await GetAlbumSongsAPI(id);
          if (songsResp?.message === "OK" && songsResp.data?.data?.records) {
            setSongs(songsResp.data.data.records || []);
            console.log("获取歌曲列表成功:", songsResp.data.data.records);
          } else {
            message.error("获取歌曲列表失败");
          }
        } else {
          message.error("获取专辑详情失败");
          navigate('/');
        }
      } catch (error) {
        console.error("获取专辑详情时出错:", error);
        message.error("获取数据时出错");
      } finally {
        setLoading(false);
      }
    };

    fetchAlbumData();
  }, [id, navigate]);



  if (loading) {
    return (
      <div className="flex justify-center items-center h-dvh w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-800"></div>
      </div>
    );
  }

  if (!album) {
    return (
      <div className="flex justify-center items-center h-dvh w-full">
        <div className="text-xl text-gray-500">未找到专辑信息</div>
      </div>
    );
  }

  // 从发布日期中提取年份
  const releaseYear = album.release_date ? new Date(album.release_date).getFullYear() : '未知';

  return (
    <div className="w-full max-w-[100vw] overflow-x-hidden">
      <div className="min-h-dvh bg-gradient-to-b from-stone-300 to-stone-400 w-full">
        {/* 导航栏 */}
        <nav className="p-4 w-full bg-stone-300 backdrop-blur-md fixed top-0 z-10 shadow-sm">
          <div className="w-full px-4 md:px-8 flex justify-between items-center">
            <div className="text-3xl font-extrabold text-stone-700 font-serif tracking-wider italic">TS</div>
            <div className="flex gap-6">
              <a href="/" className="hover:text-gray-400 transition-colors text-stone-700 font-bold font-serif tracking-wider">首页</a>
              <a href="#" className="hover:text-gray-400 transition-colors text-stone-700 font-bold font-serif tracking-wider">专辑</a>
              <a href="#" className="hover:text-gray-400 transition-colors text-stone-700 font-bold font-serif tracking-wider">歌曲</a>
              <a href="#" className="hover:text-gray-400 transition-colors text-stone-700 font-bold font-serif tracking-wider">演唱会</a>
              <a href="#" className="hover:text-gray-400 transition-colors text-stone-700 font-bold font-serif tracking-wider">关于</a>
            </div>
          </div>
        </nav>
        
        {/* 主内容区 - 需要有一定顶部空间避免被导航栏遮挡 */}
        <div className="w-full px-4 md:px-8 pt-24 pb-16">
          <div className="flex flex-col md:flex-row gap-8">
            {/* 专辑封面 */}
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <img 
                  src={album.cover_image || `https://placehold.co/400x400/stone/white?text=${album.title || 'Album Cover'}`} 
                  alt={album.title || '专辑封面'} 
                  className="w-full h-auto rounded"
                />
                <div className="mt-4 flex justify-center">
                  <button 
                    className={`px-6 py-2 rounded-full flex items-center gap-2 ${
                      isPlaying
                        ? 'bg-stone-100 text-stone-700'
                        : 'bg-stone-700 text-white hover:bg-stone-800'
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
                  <h1 className="text-3xl font-bold text-stone-800">{album.title}</h1>
                  <span className="text-gray-500">({releaseYear})</span>
                </div>
                <p className="text-lg text-gray-700 mb-4">Taylor Swift</p>
                
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="px-3 py-1 bg-stone-100 text-stone-700 rounded-full text-sm">
                    {album.total_songs || 0} 首歌曲
                  </div>
                  {album.total_duration && (
                    <div className="text-gray-500 text-sm flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>总时长: {album.total_duration}</span>
                    </div>
                  )}
                  {album.producer && (
                    <div className="text-gray-500 text-sm">
                      制作人: {album.producer}
                    </div>
                  )}
                  {album.release_date && (
                    <div className="text-gray-500 text-sm">
                      发行日期: {new Date(album.release_date).toLocaleDateString()}
                    </div>
                  )}
                </div>
                
                {album.description && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">专辑简介</h2>
                    <p className="text-gray-700">{album.description}</p>
                  </div>
                )}
                
                {album.background_story && (
                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">背景故事</h2>
                    <p className="text-gray-700">{album.background_story}</p>
                  </div>
                )}
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">歌曲</h2>
                  <div className="flex justify-between items-center mb-4">
                    <div></div>
                    <button 
                      className="px-4 py-2 bg-stone-700 text-white rounded-md hover:bg-stone-800 flex items-center gap-2"
                      onClick={() => console.log('添加歌曲')}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                      <span>添加歌曲</span>
                    </button>
                  </div>
                  {songs.length > 0 ? (
                    <div className="bg-gray-50 rounded-lg">
                      {songs.map((song) => (
                        <SongItem
                          key={song.songUuid}
                          id={song.songUuid || ''}
                          title={song.songTitle || ''}
                          albumTitle={album.title || ''}
                          duration={song.duration || ''}
                          onPlay={() => console.log(`Playing song: ${song.songTitle}`)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg text-gray-500">
                      暂无歌曲数据
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 相关专辑推荐 - 这部分可以在未来实现，目前先保留结构 */}
        <div className="w-full bg-white py-6">
          <div className="w-full px-4 md:px-8">
            <h2 className="text-2xl font-bold mb-6 text-stone-800">你可能也喜欢</h2>
            <div className="text-center py-8 text-gray-500">
              相关专辑推荐功能正在开发中...
            </div>
          </div>
        </div>
        
        {/* 页脚 */}
        <footer className="w-full bg-gray-800 text-white py-8">
          <div className="w-full px-4 md:px-8">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-xl font-bold text-gray-300">Taylor's World</h3>
                <p className="mt-2 text-gray-400">全球Swifties的音乐天堂</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-gray-300">浏览</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="#" className="hover:text-white">专辑</a></li>
                    <li><a href="#" className="hover:text-white">歌曲</a></li>
                    <li><a href="#" className="hover:text-white">MV</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-gray-300">关注我们</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="#" className="hover:text-white">微博</a></li>
                    <li><a href="#" className="hover:text-white">微信</a></li>
                    <li><a href="#" className="hover:text-white">抖音</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-3 text-gray-300">支持</h4>
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