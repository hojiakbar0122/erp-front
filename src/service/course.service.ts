import { ApiUrls } from "../api/api-urls"
import { apiConfig } from "../api/config"

export const courseService = {
    async getCourse(){
        const res = await apiConfig().getRequest(ApiUrls.GET_COURSE)
        return res
    }
}