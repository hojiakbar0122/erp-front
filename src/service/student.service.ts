import { ApiUrls } from "../api/api-urls"
import { apiConfig } from "../api/config"

export const studentService = {
    async getStudent(params:object){
        const res = await apiConfig().getRequest(ApiUrls.STUDENTS, params)
        return res
    },
    async createStudent(model:object):Promise<any>{
        const res = await apiConfig().postRequest(ApiUrls.STUDENTS, model)
        return res
    },
    async updateStudent(model:object, id:number):Promise<any>{
        const res = await apiConfig().putRequest(`${ApiUrls.STUDENTS}/${id}`, model)
        return res
    },
    async deleteStudent(id:number):Promise<any>{
        const res = await apiConfig().deleteRequest(`${ApiUrls.STUDENTS}/${id}`)
        return res
    }
}