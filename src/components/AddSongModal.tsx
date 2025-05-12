import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { SongEntity } from '../models/entity/song_entity';
import { CreateSongAPI } from '../api/song_api';

interface AddSongModalProps {
  albumId: string;
  isOpen: boolean;
  onClose: () => void;
  onSongAdded: (song: SongEntity) => void;
}

export const AddSongModal: React.FC<AddSongModalProps> = ({ 
  albumId, 
  isOpen, 
  onClose, 
  onSongAdded 
}) => {
  const [songData, setSongData] = useState<SongEntity>({
    album_id: albumId,
    song_title: '',
    duration: '',
    writer: 'Taylor Swift',
    producer: '',
    genre: '',
    language: '英语',
    lyrics: '',
    release_date: '',
    release_version: '',
    is_single: false,
    label: '',
    instruments: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalRef = React.useRef<HTMLDialogElement>(null);

  // 处理模态框打开和关闭
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    if (isOpen) {
      modal.showModal();
    } else {
      modal.close();
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSongData({ ...songData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 验证表单
    if (!songData.song_title) {
      message.error('请输入歌曲名称');
      return;
    }

    // 调用API添加歌曲
    setIsSubmitting(true);
    
    try {
      const response = await CreateSongAPI(songData);
      
      if (response?.message === "OK" && response.data) {
        message.success('歌曲添加成功！');
        onSongAdded(response.data);
        resetForm();
        onClose();
      } else {
        message.error(response?.error_message || '添加歌曲失败，请重试');
      }
    } catch (error) {
      console.error('添加歌曲失败:', error);
      message.error('添加歌曲失败，请重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSongData({
      album_id: albumId,
      song_title: '',
      duration: '',
      writer: 'Taylor Swift',
      producer: '',
      genre: '',
      language: '英语',
      lyrics: '',
      release_date: '',
      release_version: '',
      is_single: false,
      label: '',
      instruments: ''
    });
  };

  return (
    <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle" onClose={onClose}>
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
        </form>
        <h3 className="font-bold text-lg mb-4">添加歌曲</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">歌曲名称</span>
              <span className="label-text-alt text-red-500">*</span>
            </label>
            <input 
              type="text" 
              name="song_title"
              value={songData.song_title || ''}
              onChange={handleInputChange}
              placeholder="请输入歌曲名称" 
              className="input input-bordered w-full" 
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">时长</span>
              </label>
              <input 
                type="text" 
                name="duration"
                value={songData.duration || ''}
                onChange={handleInputChange}
                placeholder="例如: 3:45" 
                className="input input-bordered w-full" 
              />
            </div>
            
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">创作者/演唱者</span>
              </label>
              <input 
                type="text" 
                name="writer"
                value={songData.writer || ''}
                onChange={handleInputChange}
                placeholder="例如: Taylor Swift" 
                className="input input-bordered w-full" 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">制作人</span>
              </label>
              <input 
                type="text" 
                name="producer"
                value={songData.producer || ''}
                onChange={handleInputChange}
                placeholder="例如: Jack Antonoff" 
                className="input input-bordered w-full" 
              />
            </div>
            
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">语言</span>
              </label>
              <select 
                name="language"
                value={songData.language || '英语'}
                onChange={handleInputChange}
                className="select select-bordered w-full"
              >
                <option value="英语">英语</option>
                <option value="中文">中文</option>
                <option value="其他">其他</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">流派</span>
              </label>
              <select 
                name="genre"
                value={songData.genre || ''}
                onChange={handleInputChange}
                className="select select-bordered w-full"
              >
                <option value="">请选择</option>
                <option value="流行">流行</option>
                <option value="乡村">乡村</option>
                <option value="民谣">民谣</option>
                <option value="摇滚">摇滚</option>
                <option value="电子">电子</option>
                <option value="其他">其他</option>
              </select>
            </div>
            
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">是否单曲</span>
              </label>
              <select 
                name="is_single"
                value={songData.is_single ? '1' : '0'}
                onChange={(e) => {
                  const value = e.target.value === '1';
                  setSongData({ ...songData, is_single: value });
                }}
                className="select select-bordered w-full"
              >
                <option value="0">否</option>
                <option value="1">是</option>
              </select>
            </div>
          </div>
          
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">歌词</span>
            </label>
            <textarea 
              name="lyrics"
              value={songData.lyrics || ''}
              onChange={handleInputChange}
              placeholder="请输入歌词" 
              className="textarea textarea-bordered h-24" 
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">发布日期</span>
            </label>
            <input 
              type="date" 
              name="release_date"
              value={songData.release_date || ''}
              onChange={handleInputChange}
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">发行版本</span>
            </label>
            <input 
              type="text" 
              name="release_version"
              value={songData.release_version || ''}
              onChange={handleInputChange}
              placeholder="例如: 1.0"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">标签</span>
            </label>
            <input 
              type="text" 
              name="label"
              value={songData.label || ''}
              onChange={handleInputChange}
              placeholder="例如: 流行"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">乐器</span>
            </label>
            <input 
              type="text" 
              name="instruments"
              value={songData.instruments || ''}
              onChange={handleInputChange}
              placeholder="例如: 吉他, 钢琴"
              className="input input-bordered w-full"
            />
          </div>
          <div className="modal-action">
            <button 
              type="button" 
              className="btn btn-outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              取消
            </button>
            <button 
              type="submit" 
              className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? '提交中...' : '添加歌曲'}
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop">
        <button onClick={onClose}>关闭</button>
      </div>
    </dialog>
  );
}; 