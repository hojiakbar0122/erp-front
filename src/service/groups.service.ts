import { ApiUrls } from "@api/api-urls"
import { apiConfig } from "@api/config"
import { type Group } from "@types"

export const groupService = {
    async getGroups(params:object){
        const res = await apiConfig().getRequest(ApiUrls.GROUPS, params)        
        return res
    },

    async createGroup(model:Group):Promise<any>{
        const res = await apiConfig().getRequest(ApiUrls.GROUPS, model)
        return res
    },
    async updateGroup(model:Group, id:number):Promise<any>{
        const res = await apiConfig().putRequest(`${ApiUrls.GROUPS}/${id}`, model)
        return res
    },
    async deleteGroup(id:number):Promise<any>{
        const res = await apiConfig().deleteRequest(`${ApiUrls.GROUPS}/${id}`)
        return res
    }
    
}