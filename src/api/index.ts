import axios from "axios";
import { useUserStore } from "@/stores/user";

const store = useUserStore()

const instance = axios.create({
    baseURL: 'https://dist.nd.ru/',
});

instance.interceptors.response.use(function (response) {
    if (response?.data?.accessToken) {
        const { accessToken } = response.data;
        // console.log(accessToken);

        store.setUserToken(accessToken)
    }

    return response;
}, function (error) {
    if (error.response.status === 403 || error.response.status === 401) {
        console.log(error);

    }
    return Promise.reject(error);
});


export const userRegistration = async data => {
    return instance.post('/api/reg', data)
}

export const userLogin = async data => {
    return instance.post('/api/auth', data)
}
