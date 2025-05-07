export interface Album {
  id: string;
  title: string;
  coverImage: string;
  releaseYear: number;
  trackCount: number;
  description?: string;
  songs?: Song[];
}

export interface Song {
  id: string;
  title: string;
  duration: string; // 格式: "3:45"
  albumId: string;
  albumTitle: string;
  trackNumber: number;
  isExplicit: boolean;
  lyrics?: string;
}

// 示例数据 - Taylor Swift的几张热门专辑
export const sampleAlbums: Album[] = [
  {
    id: "1",
    title: "Lover",
    coverImage: "https://placehold.co/400x400/ffb6c1/white?text=Lover",
    releaseYear: 2019,
    trackCount: 18,
    description: "《Lover》是Taylor Swift的第七张录音室专辑，于2019年8月23日通过Republic Records发行。这张专辑展现了Taylor更加明亮、浪漫的音乐风格。",
    songs: [
      { id: "1-1", title: "I Forgot That You Existed", duration: "2:51", albumId: "1", albumTitle: "Lover", trackNumber: 1, isExplicit: false },
      { id: "1-2", title: "Cruel Summer", duration: "2:58", albumId: "1", albumTitle: "Lover", trackNumber: 2, isExplicit: false },
      { id: "1-3", title: "Lover", duration: "3:41", albumId: "1", albumTitle: "Lover", trackNumber: 3, isExplicit: false },
      { id: "1-4", title: "The Man", duration: "3:10", albumId: "1", albumTitle: "Lover", trackNumber: 4, isExplicit: true },
      { id: "1-5", title: "The Archer", duration: "3:31", albumId: "1", albumTitle: "Lover", trackNumber: 5, isExplicit: false },
    ]
  },
  {
    id: "2",
    title: "Folklore",
    coverImage: "https://placehold.co/400x400/d3d3d3/white?text=Folklore",
    releaseYear: 2020,
    trackCount: 16,
    description: "《Folklore》是Taylor Swift的第八张录音室专辑，于2020年7月24日通过Republic Records发行。这张专辑展现了更加内省的民谣风格。",
    songs: [
      { id: "2-1", title: "The 1", duration: "3:30", albumId: "2", albumTitle: "Folklore", trackNumber: 1, isExplicit: true },
      { id: "2-2", title: "Cardigan", duration: "3:59", albumId: "2", albumTitle: "Folklore", trackNumber: 2, isExplicit: false },
      { id: "2-3", title: "The Last Great American Dynasty", duration: "3:51", albumId: "2", albumTitle: "Folklore", trackNumber: 3, isExplicit: false },
      { id: "2-4", title: "Exile (feat. Bon Iver)", duration: "4:45", albumId: "2", albumTitle: "Folklore", trackNumber: 4, isExplicit: false },
      { id: "2-5", title: "My Tears Ricochet", duration: "4:15", albumId: "2", albumTitle: "Folklore", trackNumber: 5, isExplicit: false },
    ]
  },
  {
    id: "3",
    title: "1989 (Taylor's Version)",
    coverImage: "https://placehold.co/400x400/87cefa/white?text=1989",
    releaseYear: 2023,
    trackCount: 21,
    description: "《1989 (Taylor's Version)》是Taylor Swift重新录制的第五张录音室专辑，于2023年10月27日发行。这张专辑包含了原版专辑的所有歌曲以及从保险箱中取出的歌曲。",
    songs: [
      { id: "3-1", title: "Welcome To New York (Taylor's Version)", duration: "3:32", albumId: "3", albumTitle: "1989 (Taylor's Version)", trackNumber: 1, isExplicit: false },
      { id: "3-2", title: "Blank Space (Taylor's Version)", duration: "3:51", albumId: "3", albumTitle: "1989 (Taylor's Version)", trackNumber: 2, isExplicit: false },
      { id: "3-3", title: "Style (Taylor's Version)", duration: "3:51", albumId: "3", albumTitle: "1989 (Taylor's Version)", trackNumber: 3, isExplicit: false },
      { id: "3-4", title: "Out Of The Woods (Taylor's Version)", duration: "3:55", albumId: "3", albumTitle: "1989 (Taylor's Version)", trackNumber: 4, isExplicit: false },
      { id: "3-5", title: "All You Had To Do Was Stay (Taylor's Version)", duration: "3:13", albumId: "3", albumTitle: "1989 (Taylor's Version)", trackNumber: 5, isExplicit: false },
    ]
  },
  {
    id: "4",
    title: "Midnights",
    coverImage: "https://placehold.co/400x400/483d8b/white?text=Midnights",
    releaseYear: 2022,
    trackCount: 13,
    description: "《Midnights》是Taylor Swift的第十张录音室专辑，于2022年10月21日通过Republic Records发行。这张专辑探索了Taylor在深夜创作的13首歌曲。",
    songs: [
      { id: "4-1", title: "Lavender Haze", duration: "3:22", albumId: "4", albumTitle: "Midnights", trackNumber: 1, isExplicit: true },
      { id: "4-2", title: "Maroon", duration: "3:38", albumId: "4", albumTitle: "Midnights", trackNumber: 2, isExplicit: true },
      { id: "4-3", title: "Anti-Hero", duration: "3:20", albumId: "4", albumTitle: "Midnights", trackNumber: 3, isExplicit: true },
      { id: "4-4", title: "Snow On The Beach (feat. Lana Del Rey)", duration: "4:16", albumId: "4", albumTitle: "Midnights", trackNumber: 4, isExplicit: false },
      { id: "4-5", title: "You're On Your Own, Kid", duration: "3:14", albumId: "4", albumTitle: "Midnights", trackNumber: 5, isExplicit: false },
    ]
  }
]; 