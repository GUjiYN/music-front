import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlbumEntity } from '../../models/entity/album_entity';
import { CreateAlbumAPI } from '../../api/album_api';

export function AlbumCreate() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [createAlbumData, setCreateAlbumData] = useState<AlbumEntity>({
    title: '',
    description: '',
    release_date: '',
    producer: '',
    total_songs: 0,
    total_duration: '',
    cover_image: '',
    background_story: ''
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  // 只需要一个图片上传引用，背景故事不再需要
  const coverImageInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'total_songs') {
      setCreateAlbumData({ ...createAlbumData, [name]: parseInt(value) || 0 });
    } else {
      setCreateAlbumData({ ...createAlbumData, [name]: value });
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessingImage(true);
      
      // 检查文件大小，如果过大则提醒但仍然允许使用原图
      if (file.size > 5 * 1024 * 1024) { // 大于5MB的文件给出警告
        alert('图片文件较大，可能会影响上传速度和性能');
      }
      
      // 直接读取原始图片，不进行压缩
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        setPreviewImage(imageData);
        setCreateAlbumData({ ...createAlbumData, cover_image: imageData });
      };
    } catch (error) {
      console.error('图片处理失败:', error);
      alert('图片处理失败，请重试');
    } finally {
      setIsProcessingImage(false);
    }
  };

  // 处理上传区域的点击
  const handleUploadAreaClick = () => {
    if (coverImageInputRef.current) {
      coverImageInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await CreateAlbumAPI(createAlbumData);
      if (response?.code === 0 && response?.data?.album_uuid) {
        // 成功创建专辑
        navigate(`/album/${response.data.album_uuid}`);
      } else {
        // 显示错误
        alert(response?.message || '创建专辑失败');
      }
    } catch (error) {
      console.error('创建专辑出错:', error);
      alert('创建专辑时发生错误，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

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
        
        {/* 主内容 */}
        <div className="w-full px-4 md:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-2xl font-bold text-purple-800 mb-6">创建新专辑</h1>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 左侧表单 */}
                  <div className="space-y-4">
                    <fieldset className="border rounded-lg p-4 border-gray-300">
                      <legend className="text-sm font-medium text-purple-600 px-2">专辑名称</legend>
                      <input 
                        type="text" 
                        name="title" 
                        value={createAlbumData.title} 
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        placeholder="输入专辑名称"
                        required
                      />
                    </fieldset>
                    
                    <fieldset className="border rounded-lg p-4 border-gray-300">
                      <legend className="text-sm font-medium text-purple-600 px-2">发行日期</legend>
                      <input 
                        type="date" 
                        name="release_date" 
                        value={createAlbumData.release_date} 
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        required
                      />
                    </fieldset>
                    
                    <fieldset className="border rounded-lg p-4 border-gray-300">
                      <legend className="text-sm font-medium text-purple-600 px-2">制作人</legend>
                      <input 
                        type="text" 
                        name="producer" 
                        value={createAlbumData.producer} 
                        onChange={handleInputChange}
                        className="input input-bordered w-full"
                        placeholder="输入制作人"
                      />
                    </fieldset>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <fieldset className="border rounded-lg p-4 border-gray-300">
                        <legend className="text-sm font-medium text-purple-600 px-2">歌曲数量</legend>
                        <input 
                          type="number" 
                          name="total_songs" 
                          value={createAlbumData.total_songs} 
                          onChange={handleInputChange}
                          className="input input-bordered w-full"
                          min="1"
                          required
                        />
                      </fieldset>
                      
                      <fieldset className="border rounded-lg p-4 border-gray-300">
                        <legend className="text-sm font-medium text-purple-600 px-2">总时长</legend>
                        <input 
                          type="text" 
                          name="total_duration" 
                          value={createAlbumData.total_duration} 
                          onChange={handleInputChange}
                          className="input input-bordered w-full"
                          placeholder="格式: 45:30"
                        />
                      </fieldset>
                    </div>
                    
                    <fieldset className="border rounded-lg p-4 border-gray-300">
                      <legend className="text-sm font-medium text-purple-600 px-2">专辑描述</legend>
                      <textarea 
                        name="description" 
                        value={createAlbumData.description} 
                        onChange={handleInputChange}
                        className="textarea textarea-bordered w-full"
                        rows={4}
                        placeholder="输入专辑描述"
                      />
                    </fieldset>
                  </div>
                  
                  {/* 右侧 */}
                  <div className="space-y-4">
                    <fieldset className="border rounded-lg p-4 border-gray-300">
                      <legend className="text-sm font-medium text-purple-600 px-2">专辑封面</legend>
                      <div 
                        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-500 transition-colors cursor-pointer"
                        onClick={handleUploadAreaClick}
                      >
                        {isProcessingImage ? (
                          <div className="py-4">
                            <div className="loading loading-spinner loading-md mx-auto"></div>
                            <p className="mt-2 text-sm text-purple-600">正在处理图片...</p>
                          </div>
                        ) : previewImage ? (
                          <div className="relative">
                            <img 
                              src={previewImage} 
                              alt="专辑封面预览" 
                              className="mx-auto h-48 w-48 object-cover rounded-md"
                            />
                            <button 
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation(); // 阻止事件冒泡
                                setPreviewImage(null);
                                setCreateAlbumData({...createAlbumData, cover_image: ''});
                              }}
                              className="btn btn-circle btn-xs btn-error absolute top-2 right-2"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <div className="py-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p className="mt-1 text-sm text-gray-500">点击或拖拽上传封面图片</p>
                            <p className="text-xs text-gray-400">支持各种常见图片格式</p>
                            <p className="text-xs text-purple-500 mt-1">建议图片不超过5MB</p>
                          </div>
                        )}
                      </div>
                      {/* 隐藏的文件输入框 */}
                      <input 
                        ref={coverImageInputRef}
                        type="file" 
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      /> 
                    </fieldset>
                    
                    <fieldset className="border rounded-lg p-4 border-gray-300">
                      <legend className="text-sm font-medium text-purple-600 px-2">背景故事</legend>
                      <textarea 
                        name="background_story" 
                        value={createAlbumData.background_story} 
                        onChange={handleInputChange}
                        className="textarea textarea-bordered w-full"
                        rows={8}
                        placeholder="分享这张专辑的创作背景故事..."
                      />
                    </fieldset>
                  </div>
                </div>
                
                <div className="flex gap-4 justify-end pt-4 border-t border-gray-200">
                  <button 
                    type="button" 
                    onClick={() => navigate(-1)}
                    className="btn btn-outline"
                  >
                    取消
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`btn ${isSubmitting ? 'btn-disabled' : 'btn-primary'}`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <span className="loading loading-spinner loading-sm mr-2"></span>
                        提交中...
                      </span>
                    ) : '创建专辑'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        {/* 页脚 */}
        <footer className="w-full bg-gray-800 text-white py-8 mt-12">
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
                    <li><a href="#" className="hover:text-white">帮助中心</a></li>
                    <li><a href="#" className="hover:text-white">关于我们</a></li>
                    <li><a href="#" className="hover:text-white">联系我们</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Taylor's World. 保留所有权利。
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
