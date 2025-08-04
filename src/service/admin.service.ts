import { ApiUrls } from "@api/api-urls"
import { apiConfig } from "@api/config"

export const adminService = {
    async getAdmin(params:object){
        const res = await apiConfig().getRequest(ApiUrls.ADMIN, params)        
        return res
    },

    async createAdmin(model:object):Promise<any>{
        const res = await apiConfig().postRequest(ApiUrls.ADMIN, model)
        return res
    },
    async updateAdmin(model:object, id:any):Promise<any>{
        const res = await apiConfig().putRequest(`${ApiUrls.ADMIN}/${id}`, model)
        return res
    },
    async deleteAdmin(id:number):Promise<any>{
        const res = await apiConfig().deleteRequest(`${ApiUrls.ADMIN}/${id}`)
        return res
    },

    async getProfile(){
        const res = await apiConfig().getRequest(ApiUrls.ADMIN_PROFILE)        
        return res
    },
    
    async changeAdminPassword(model:object, id:any):Promise<any>{
        const res = await apiConfig().putRequest(`${ApiUrls.ADMIN_CHANGE_PASSWORD}/${id}`, model)
        return res
    },
    
}