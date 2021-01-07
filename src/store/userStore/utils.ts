import {IBodyInterface} from "../../api/utils";
import {userAPI} from "../../api/types";

export const prepareNewUserAPI = (data: IBodyInterface, userId: number): userAPI => {
    return {
        id: userId,
        ...data
    }
}