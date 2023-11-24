import axios from "axios";

// import router from '@/router';

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



    const api = axios.create({
        // baseURL: 'http://localhost:8080/',
        headers: {
          Authorization: useAuthStore().token ? `Bearer ${useAuthStore().token}` : undefined,
        },
    });


    const errorHandler = (error: any) => {
        let message = null;
        if (!error.response) {
            message = "اتصال شما به اینترنت قطع شده است";
        }

        if (error.response?.status === 503) {
            // navigateTo("/maintenance");
        }
        if (error.response?.status === 401) {
            // if (endpoint.includes("login"))
            //     message = "شماره همراه و رمز عبور مطابقت ندارند";
            // else {
                message = "لطفا مجددا وارد شوید!";
                console.log(message);
                // resetAuth();
                // setTimeout(() => {
                //     navigateTo("/admin/auth/login");
                // }, 100);
            // }
        }
        // if (error.response?.status === 414) message = null;
        // if (error.response?.status === 400 && "error" in error.response) {
        //     message = errorFormat(error.response.error);
        // }
        // if (error.response?.status === 500) {
        //     if (error.response._data.includes("DoesNotExist")) {
        //         message = "موردی یافت نشد";
        //     } else {
        //         message = "مشکلی در برقراری ارتباط رخ داده است";
        //     }
        // }
        // if (
        //     message &&
        //     (lastMessage !== message || lastRequestUrl !== error.response?.url)
        // ) {
        //     lastMessage = message;
        //     lastRequestUrl = error.response?.url;
        //     errorToast(message);
        // }
        // throw error;

        // router.push('/profile');
    }

    const get = async (url: any, queryParams = {}) => {
        return await api.get(url, { params: queryParams });
        // .then((response) => {
        //     return response;
        // }) 
        // .catch((err) => {
        //     errorHandler(err)
        // });
    }

    const post = async (url: any, queryParams = {}) => {
        return await api.post(url, queryParams);
    }

    const deleteRequest = async (url: any, queryParams = {}) => {
        return await api.delete(url, { params: queryParams });
    }

    const patch = async (url: any, queryParams = {}) => {
        return await api.patch(url, { params: queryParams });
    }


    return {
        get,
        post,
        deleteRequest,
        patch,
        errorHandler
    }

}
