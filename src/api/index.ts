import axios from "axios";
import { useUserStore } from "@/stores/user";
import type { IUserRegistration, IUserLogin, INote } from '@/types'

const getUserToken = () => {
    return useUserStore().getUserToken
}

const instance = axios.create({
    baseURL: 'https://dist.nd.ru/',
});

// Функция для обработки запросов, требующих токен
const requestWithToken = async (method: string, url: string, data: any, headers = {}) => {
    const token = getUserToken();

    if (!token) {
        throw new Error('Token not found');
    }

    return instance({
        method,
        url,
        data,
        headers: {
            ...headers,
            Authorization: `Bearer ${token}`,
        },
    });
};

// Функция для запросов без токена
const requestWithoutToken = async (method: string, url: string, data?: any, headers = {}) => {
    return instance({
        method,
        url,
        data,
        headers,
    });
};

export const userRegistration = async (data: IUserRegistration) => {
    return requestWithoutToken('POST', '/api/reg', data)
}

export const userLogin = async (data: IUserLogin) => {
    return requestWithoutToken('POST', '/api/auth', data)
}

export const userLogout = async () => {
    return requestWithToken('DELETE', '/api/auth', null)
}

export const getNotes = async () => {
    const result = await requestWithToken('GET', '/api/notes', null)
    return result.data
}

export const deleteNote = async (id: number) => {
    await requestWithToken('DELETE', `/api/notes/${id}`, null)
}
export const createNote = async (data: INote) => {
    await requestWithToken('POST', '/api/notes', data)
}
