import axios from "axios";

import router from '@/router';
import { isLoading } from '../stores/loading';
import { useAuthStore } from "@/stores/auth";

// export interface ApiUrl {
//     name: string,
//     method: string,
//     url: string
// }

// interface ErrorModel {
//     response: {
//         status: number;
//         error: { non_field_errors?: string[] };
//         url: string;
//         _data: string;
//     };
// }

export function useApi() {


    const authStore = useAuthStore();

    const api = axios.create({
        // baseURL: 'http://localhost:8080/',
        headers: {
          Authorization: useAuthStore().token ? `Bearer ${useAuthStore().token}` : undefined,
        },
    });

    // Add a request interceptor
    api.interceptors.request.use((config) => {
        isLoading.value = true;
        return config;
    }, (error) => {
        isLoading.value = false;
        return Promise.reject(error);
    });
    
    // Add a response interceptor
    api.interceptors.response.use((response) => {
        isLoading.value = false;
        return response;
    }, (error) => {
        isLoading.value = false;
        return Promise.reject(error);
    });


    const errorHandler = (error: any) => {
        let message = null;
        if (!error.response) {
            message = "اتصال شما به اینترنت قطع شده است";
        }

        if (error.response?.status === 401) {
            // authStore.logout();
            // router.push({
            //     name:'login'
            // })
        }   

        if (error.response?.status === 403) {
            authStore.logout();
        }
        if (error.response?.status === 401) {
            //
        }

        throw error;

    }

    const get = async (url: any, queryParams = {}) => {
        return await api.get(url, { params: queryParams })
        .catch((err) => {
            errorHandler(err)
        })
    }

    const post = async (url: any, queryParams = {}) => {
        return await api.post(url, queryParams)
        .catch((err) => {
            errorHandler(err)
        })
    }

    const deleteRequest = async (url: any, queryParams = {}) => {
        return await api.delete(url, { params: queryParams })
        
    }

    const patch = async (url: any, queryParams = {}) => {
        return await api.patch(url, queryParams)
        
    }


    return {
        get,
        post,
        deleteRequest,
        patch,
        errorHandler
    }

}
