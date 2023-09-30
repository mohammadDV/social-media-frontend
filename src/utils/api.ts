import axios from "axios";

import router from '@/router';

import {useAuthStore} from "../stores/auth.ts";

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


    const errorHandler = (error) => {
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

    const get = async (url, queryParams = {}) => {
        return await api.get(url, { params: queryParams });
        // .then((response) => {
        //     return response;
        // }) 
        // .catch((err) => {
        //     errorHandler(err)
        // });
    }

    const post = async (url, queryParams = {}) => {
        await api.post(url, { params: queryParams })
        .catch((err) => {
            errorHandler(err)
        });
    }

    const deleteRequest = async (url, queryParams = {}) => {
        await api.delete(url, { params: queryParams })
        .catch((err) => {
            errorHandler(err)
        });
    }

    const patch = async (url, queryParams = {}) => {
        await api.patch(url, { params: queryParams })
        .catch((err) => {
            errorHandler(err)
        });
    }


    return {
        get,
        post,
        deleteRequest,
        patch,
        errorHandler
    }

}
