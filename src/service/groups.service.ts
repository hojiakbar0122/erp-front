import { ApiUrls } from "@api/api-urls"
import { apiConfig } from "@api/config"
import { type Group } from "@types"

export const groupService = {
    async getGroups(){
        const res = await apiConfig().getRequest(ApiUrls.GET_GROUPS)
        return res
    },

    async createGroup(model:Group):Promise<any>{
        const res = await apiConfig().getRequest(ApiUrls.GET_GROUPS, model)
        return res
    }
}