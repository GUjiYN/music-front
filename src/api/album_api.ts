import { PageSearchDTO } from "../models/dto/page/page_search_dto";
import { PageEntity } from "../models/entity/page_entity";
import { BaseResponse } from "../models/base_response";
import { AlbumEntity } from "../models/entity/album_entity";
import { BaseApi, GetAuthorizationToken, MethodType } from "../assets/ts/base_api.ts";

/**
 * 获取专辑列表
 * @param data 分页搜索条件
 * @returns 专辑列表
 */
const GetAlbumListAPI = async (data: PageSearchDTO):Promise<BaseResponse<PageEntity<AlbumEntity>> | undefined> => {
    console.log("调用GetAlbumListAPI, 入参:", data);
    const result = await BaseApi<BaseResponse<PageEntity<AlbumEntity>>>(
        MethodType.GET,
        "/api/v1/album/list",
        null,
        data,
        null,
        { Authorization: `Bearer ${GetAuthorizationToken()}` },
    );
    console.log("GetAlbumListAPI返回结果:", result);
    return result;
}


const CreateAlbumAPI = async (data: AlbumEntity):Promise<BaseResponse<AlbumEntity> | undefined> => {
    const result = await BaseApi<BaseResponse<AlbumEntity>>(
        MethodType.POST,
        "/api/v1/album/create",
        data,
        null,
        null,
        { Authorization: `Bearer ${GetAuthorizationToken()}` },
    );
    console.log("CreateAlbumAPI返回结果:", result);
    return result;
}

/**
 * 获取专辑详情
 * @param albumId 专辑ID
 * @returns 专辑详情
 */
const GetAlbumDetailAPI = async (albumId: string):Promise<BaseResponse<AlbumEntity> | undefined> => {
    console.log("调用GetAlbumDetailAPI, 入参:", albumId);
    const result = await BaseApi<BaseResponse<AlbumEntity>>(
        MethodType.GET,
        `/api/v1/album/${albumId}`,
        null,
        null,
        null,
        { Authorization: `Bearer ${GetAuthorizationToken()}` },
    );
    console.log("GetAlbumDetailAPI返回结果:", result);
    return result;
}

export { GetAlbumListAPI, CreateAlbumAPI, GetAlbumDetailAPI };