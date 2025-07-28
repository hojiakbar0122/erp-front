import { ApiUrls } from "../api/api-urls"
import { apiConfig } from "../api/config"

export const teacherService = {
    async getTeacher(params:object){
        const res = await apiConfig().getRequest(ApiUrls.TEACHER, params)
        return res
    },
    async createTeacher(model:object):Promise<any>{
        const res = await apiConfig().postRequest(ApiUrls.TEACHER, model)
        return res
    },
    async updateTeacher(model:object, id:number):Promise<any>{
        const res = await apiConfig().putRequest(`${ApiUrls.TEACHER}/${id}`, model)
        return res
    },
    async deleteTeacher(id:number):Promise<any>{
        const res = await apiConfig().deleteRequest(`${ApiUrls.TEACHER}/${id}`)
        return res
    }
}