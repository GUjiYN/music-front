import { PageSearchDTO } from "../models/dto/page/page_search_dto";
import { PageEntity } from "../models/entity/page_entity";
import { BaseResponse } from "../models/base_response";
import { SongEntity } from "../models/entity/song_entity";
import { BaseApi, GetAuthorizationToken, MethodType } from "../assets/ts/base_api.ts";

/**
 * 获取专辑下的歌曲列表
 * @param albumId 专辑ID
 * @returns 歌曲列表
 */
const GetAlbumSongsAPI = async (albumId: string):Promise<BaseResponse<SongEntity[]> | undefined> => {
    console.log("调用GetAlbumSongsAPI, 入参:", albumId);
    const result = await BaseApi<BaseResponse<SongEntity[]>>(
        MethodType.GET,
        `/api/v1/song/album/list`,
        null,
        { albumId: albumId },
        null,
        { Authorization: `Bearer ${GetAuthorizationToken()}` },
    );
    console.log("GetAlbumSongsAPI返回结果:", result);
    return result;
}


/**
 * 添加歌曲到专辑
 * @param albumId 专辑ID
 * @param songId 歌曲ID
 * @returns 添加结果
 */
const AddSongToAlbumAPI = async (albumId: string, songId: string):Promise<BaseResponse<SongEntity[]> | undefined> => {
    console.log("调用AddSongToAlbumAPI, 入参:", albumId, songId);
    const result = await BaseApi<BaseResponse<SongEntity[]>>(
        MethodType.POST,
        `/api/v1/song/create`,
        null,
        { albumId: albumId, songId: songId },
        null,
        { Authorization: `Bearer ${GetAuthorizationToken()}` },
    );
    console.log("AddSongToAlbumAPI返回结果:", result);
    return result;
}

/**
 * 创建新歌曲
 * @param songData 歌曲数据
 * @returns 创建结果
 */
const CreateSongAPI = async (songData: Partial<SongEntity>):Promise<BaseResponse<SongEntity> | undefined> => {
    console.log("调用CreateSongAPI, 入参:", songData);
    const result = await BaseApi<BaseResponse<SongEntity>>(
        MethodType.POST,
        `/api/v1/song/create`,
        songData,
        null,
        null,
        { Authorization: `Bearer ${GetAuthorizationToken()}` },
    );
    console.log("CreateSongAPI返回结果:", result);
    return result;
}

export { GetAlbumSongsAPI, AddSongToAlbumAPI, CreateSongAPI }; 