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
    return BaseApi<BaseResponse<PageEntity<AlbumEntity>>>(
        MethodType.GET,
        "/api/v1/album/list",
        null,
        data,
        null,
        { Authorization: `Bearer ${GetAuthorizationToken()}` },
    )
}

export { GetAlbumListAPI }