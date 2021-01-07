import {mainData, postUserApi, putApiInfo, userAPI} from "./types";
import {fetchMethod, IBodyInterface} from "./utils";


export const getUsersPerPage = async (page: number): Promise<mainData> =>{
    return await fetchMethod({
        method: 'GET',
        additionalUrl: `?page=${page}`
    })
}

export const getUserById = async (userId: number): Promise<userAPI> =>{
    return await fetchMethod({
        method: 'GET',
        additionalUrl: `${userId}`
    })
}

export const createUser = async (body: IBodyInterface): Promise<postUserApi> =>{
    return await fetchMethod({
        method: 'POST',
        requestBody: body
    })
}

export const changeUser = async (body: userAPI):Promise<putApiInfo> =>{
    const { last_name, avatar, email, first_name } = body
    return await fetchMethod({
        method: 'PUT',
        additionalUrl: `${body.id}`,
        requestBody: { last_name, avatar, email, first_name }
    })
}

export const deleteUser = async (userId: number):Promise<number> =>{
    return await fetchMethod({
        method: 'DELETE',
        additionalUrl: `${userId}`
    })
}