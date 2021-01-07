import {mainUrl} from "./constant";

interface IFetchMethodProps {
    additionalUrl?: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE'
    requestBody?: IBodyInterface
}

export interface IBodyInterface {
    email: string,
    first_name: string,
    last_name: string,
    avatar: string,
}

export const fetchMethod = async ({additionalUrl, method, requestBody}: IFetchMethodProps) => {
    const requestInit = method === 'GET' || method === 'DELETE'
        ? {method}
        : {method, body: JSON.stringify(requestBody)}
        const url = additionalUrl ? `${mainUrl}${additionalUrl}`: mainUrl
    return await fetch(url, requestInit).then(async response => {
        if ((response.status >= 200 && response.status < 400)) {
            return method === "DELETE" ? response.status : response.json();
        }
    }).catch(err => {
        return new Error(err)
    })
}