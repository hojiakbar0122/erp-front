import { ApiUrls } from "@api/api-urls"
import { apiConfig } from "@api/config"
import { type Group } from "@types"

export const groupService = {
    async getGroups(params:object){
        const res = await apiConfig().getRequest(ApiUrls.GROUPS, params)        
        return res
    },

    async getGroup(id:number){
        const res = await apiConfig().getRequest(`${ApiUrls.GROUPS}/${id}`)        
        return res
    },

    async getGroupTeachers(id:number){
        const res = await apiConfig().getRequest(`${ApiUrls.GROUP_TEACHERS_BY_GROUP_ID}/${id}`)        
        return res
    },

    async getGroupStudents(id:number){
        const res = await apiConfig().getRequest(`${ApiUrls.GROUP_STUDENTS_BY_GROUP_ID}/${id}`)        
        return res
    },

    async createGroup(model:Group):Promise<any>{
        const res = await apiConfig().postRequest(ApiUrls.GROUPS, model)
        return res
    },
    async updateGroup(model:Group, id:number):Promise<any>{
        const res = await apiConfig().putRequest(`${ApiUrls.GROUPS}/${id}`, model)
        return res
    },
    async deleteGroup(id:number):Promise<any>{
        const res = await apiConfig().deleteRequest(`${ApiUrls.GROUPS}/${id}`)
        return res
    },
    async addTeacherToGroup(data:object):Promise<any>{
        const res = await apiConfig().postRequest(ApiUrls.GROUP_TEACHERS, data)
        return res
    },
    async addStudentToGroup(data:object):Promise<any>{
        const res = await apiConfig().postRequest(ApiUrls.GROUP_STUDENTS, data)
        return res
    },
    
}