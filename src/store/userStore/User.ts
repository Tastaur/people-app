import {action, computed, makeObservable, observable} from "mobx";
import {userAPI} from "../../api/types";
import {deleteUser, changeUser} from "../../api";
import {StoreType} from "../rootStore";
import {IBodyInterface} from "../../api/utils";
import {prepareNewUserAPI} from "./utils";

export class User {
    constructor(protected readonly store: StoreType) {
        makeObservable(this,
            {
                id: observable,
                fistName: observable,
                lastName: observable,
                email: observable,
                avatar: observable,
                change: action,
                delete: action,
                fromAPI: action,
                fullName: computed
            }
        )
    }

    id: number = 0;
    fistName: string = ''
    lastName: string = ''
    avatar: string = ''
    email: string = ''

    get fullName(): string {
        return `${this.fistName} ${this.lastName}`
    }

    async delete() {
        const {userStore} = this.store
        userStore.isLoading = true
        try {
            const status = await deleteUser(this.id)
            if (status) {
                userStore.users.delete(this.id)
            }
        } catch (e) {
            console.log(e)
        }
        userStore.isLoading = false
    }

    async change(data: IBodyInterface) {
        try {
            const body = prepareNewUserAPI(data,this.id)
            const response = await changeUser(body)
            if (response.updatedAt) {
                this.fromAPI(body)
            }
        } catch (e) {
            console.log(e)
        }
    }

    fromAPI(user: userAPI) {
        this.id = user.id;
        this.fistName = user.first_name;
        this.lastName = user.last_name;
        this.avatar = user.avatar;
        this.email = user.email
    }
}