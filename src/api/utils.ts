import {mainUrl} from "./constant";
import {mainData} from "./types";

export const getAllUsers = async (): Promise<mainData> => {
    return await fetch(mainUrl, {
        method: 'GET'
    }).then(async response => {
        if ((response.status >= 200 && response.status < 400)) {
            return response.json();
        }
    }).catch(err => {
            return new Error(err)
        })
}