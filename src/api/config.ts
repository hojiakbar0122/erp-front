import axiosInstance from ".";
import { Notification } from "@helpers";

export function apiConfig() {
    async function getRequest(url:string, params:object={}) {
        try {
            const res = await axiosInstance.get(url, {params})
            return res
        } catch (err) {
            console.log(err);
            
        }
    }

    async function postRequest(url:string, body:object={}) {
        try {
            const res = await axiosInstance.post(url, body)
            return res
        } catch (err:any) {
            // console.log(err);
            Notification("error", err?.message)
        }
    }
    return{
        getRequest,
        postRequest
    }
}