import { JSX, useState, useEffect } from "react";
import { AlbumCard } from "../components/AlbumCard";
import { sampleAlbums } from "../models/music";
import { useNavigate } from "react-router-dom";
import { GetAlbumListAPI } from "../api/album_api";
import { AlbumEntity } from "../models/entity/album_entity";
import { PageSearchDTO } from "../models/dto/page/page_search_dto";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { Button } from "antd";

export function BaseIndex(): JSX.Element {
    const navigate = useNavigate();

    const handleAlbumClick = (albumId: string) => {
        navigate(`/album/${albumId}`);
    };

    const handleCreateAlbumClick = () => {
        navigate('/album/create');
    };

    const [searchRequest, setSearchRequest] = useState<PageSearchDTO>({
        page: 1,
        size: 20,
        is_desc: true,
    } as PageSearchDTO);

    const [loading, setLoading] = useState(true);
    const [albumList, setAlbumList] = useState<AlbumEntity[]>([]);
    const [refreshOperate, setRefreshOperate] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const func = async () => {
            setLoading(true);
            const getResp = await GetAlbumListAPI(searchRequest);
            if (getResp?.message === "OK") {
                console.log("API 成功返回数据:", getResp);
                console.log("获取到的records数据:", getResp.data?.data?.records);
                console.log("records数据长度:", getResp.data?.data?.records?.length || 0);
                setAlbumList(getResp.data?.data?.records || []);
                console.log("设置后的albumList状态:", getResp.data?.data?.records || []);
            } else {
                console.error("API返回错误:", getResp);
                message.error(getResp?.message || "获取专辑列表失败");
            }
            setLoading(false);
        };
        
        func().then();
        
    }, [dispatch, searchRequest]);

    return (
        <div className="w-full max-w-[100vw] overflow-x-hidden">
            <div className="flex flex-col min-h-dvh bg-gradient-to-b from-stone-300 to-stone-400 w-full">
                {/* 导航栏 */}
                <nav className="p-4 w-full bg-stone-300 backdrop-blur-md sticky top-0 z-10 shadow-sm">
                    <div className="w-full px-4 md:px-8 flex justify-between items-center">
                        <div className="text-3xl font-extrabold text-stone-700 font-serif tracking-wider italic">TS</div>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-gray-400 transition-colors text-stone-700 font-bold font-serif tracking-wider">首页</a>
                            <a href="#" className="hover:text-gray-400 transition-colors text-stone-700 font-bold font-serif tracking-wider">专辑</a>
                            <a href="#" className="hover:text-gray-400 transition-colors text-stone-700 font-bold font-serif tracking-wider">歌曲</a>
                            <a href="#" className="hover:text-gray-400 transition-colors text-stone-700 font-bold font-serif tracking-wider">演唱会</a>
                            <a href="#" className="hover:text-gray-400 transition-colors text-stone-700 font-bold font-serif tracking-wider">关于</a>
                        </div>
                    </div>
                </nav>
                
                {/* 主横幅 */}
                <div className="w-full bg-cover bg-center h-96" style={{backgroundImage: "url('https://placehold.co/1600x600/gray/white?text=Taylor+Swift+Banner')"}}>
                    <div className="w-full px-4 md:px-8 h-full flex items-center">
                        <div className="bg-white/70 backdrop-blur-md p-6 rounded-lg max-w-lg">
                            <h1 className="text-5xl font-bold text-stone-600">Taylor Swift</h1>
                            <p className="mt-4 text-lg text-stone-600">探索Taylor Swift的音乐世界，从处女作到最新专辑的完整音乐旅程</p>
                            <button className="mt-6 bg-stone-500 text-white px-6 py-2 rounded-full hover:bg-stone-600 transition-colors">浏览专辑</button>
                        </div>
                    </div>
                </div>
                
                {/* 推荐专辑部分 */}
                <div className="w-full px-4 md:px-8 py-12">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800">热门专辑</h2>
                        <button 
                            onClick={handleCreateAlbumClick}
                            className="bg-stone-500 hover:bg-stone-600 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            创建专辑
                        </button>
                    </div>
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {(() => { console.log("渲染时的albumList:", albumList); return null; })()}
                            {albumList && albumList.length > 0 ? albumList.map((album) => (
                                <AlbumCard 
                                    key={album.album_uuid}
                                    id={album.album_uuid || ""}
                                    title={album.title || ""}
                                    coverImage={album.cover_image || ""}
                                    releaseYear={Number(album.release_date?.substring(0, 4) || 0)}
                                    trackCount={album.total_songs || 0}
                                    onClick={() => handleAlbumClick(album.album_uuid || "")}
                                />
                            )) : (
                                <div className="col-span-4 text-center py-12 text-gray-500">
                                    暂无专辑数据 (albumList长度: {albumList ? albumList.length : 'null/undefined'})
                                </div>
                            )}
                        </div>
                    )}
                </div>
                
                {/* 最新动态部分 */}
                <div className="w-full bg-white py-12">
                    <div className="w-full px-4 md:px-8">
                        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">最新动态</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                {
                                    title: "The Eras Tour",
                                    desc: "Taylor Swift's 'The Eras Tour' 巡演将于2023年继续，查看最新演出日期",
                                    image: "https://placehold.co/600x400/purple/white?text=Eras+Tour"
                                },
                                {
                                    title: "1989 (Taylor's Version)",
                                    desc: "重新录制的《1989》专辑已于2023年10月27日发行，包含多首未发行曲目",
                                    image: "https://placehold.co/600x400/skyblue/white?text=1989+TV"
                                },
                                {
                                    title: "粉丝社区",
                                    desc: "加入我们的Swifties社区，分享你对Taylor音乐的热爱",
                                    image: "https://placehold.co/600x400/pink/white?text=Swifties"
                                }
                            ].map((item, index) => (
                                <div key={index} className="bg-white overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                    <div className="h-48 overflow-hidden">
                                        <img 
                                            src={item.image} 
                                            alt={item.title} 
                                            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-purple-700">{item.title}</h3>
                                        <p className="mt-2 text-gray-600">{item.desc}</p>
                                        <button className="mt-4 bg-purple-100 text-purple-700 px-4 py-1 rounded-full hover:bg-purple-200 transition-colors">了解更多</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* 歌词展示部分 */}
                <div className="w-full py-16 bg-gradient-to-r from-gray-200 to-gray-400">
                    <div className="w-full px-4 md:px-8">
                        <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md p-10 rounded-lg shadow-lg text-center">
                            <p className="text-2xl italic text-gray-700 mb-6">
                                "But I'm a fire, and I'll keep your brittle heart warm<br />
                                If your cascade ocean wave blues come"
                            </p>
                            <p className="text-gray-600 font-medium">— Taylor Swift, "Peace", Folklore</p>
                        </div>
                    </div>
                </div>
                
                {/* 订阅区域 */}
                <div className="w-full bg-gradient-to-r from-gray-500 to-gray-700 text-white py-16">
                    <div className="w-full px-4 md:px-8 text-center">
                        <h2 className="text-3xl font-bold mb-4">订阅最新Taylor Swift消息</h2>
                        <p className="mb-8 max-w-xl mx-auto">获取专辑发布、演唱会信息和特别活动的第一手消息</p>
                        <div className="flex max-w-md mx-auto">
                            <input 
                                type="email" 
                                placeholder="你的邮箱地址" 
                                className="flex-grow px-4 py-2 rounded-l-full text-gray-800 focus:outline-none"
                            />
                            <button className="bg-gray-800 px-6 py-2 rounded-r-full hover:bg-gray-900 transition-colors">
                                订阅
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* 页脚 */}
                <footer className="w-full bg-gray-900 text-white py-8">
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