import { ApiUrls } from "../api/api-urls"
import { apiConfig } from "../api/config"

export const courseService = {
    async getCourse(params:object){
        const res = await apiConfig().getRequest(ApiUrls.COURSE, params)
        return res
    },
    async createCourse(model:object):Promise<any>{
        const res = await apiConfig().postRequest(ApiUrls.COURSE, model)
        return res
    },
    async updateCourse(model:object, id:number):Promise<any>{
        const res = await apiConfig().putRequest(`${ApiUrls.COURSE}/${id}`, model)
        return res
    },
    async deleteCourse(id:number):Promise<any>{
        const res = await apiConfig().deleteRequest(`${ApiUrls.COURSE}/${id}`)
        return res
    }
}