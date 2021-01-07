import {action, computed, makeObservable, observable, runInAction} from 'mobx';
import {StoreType} from "../rootStore";
import {User} from "./User";
import {changeUser, createUser, getUsersPerPage} from "../../api";
import {mainData, userAPI} from "../../api/types";
import {IBodyInterface} from "../../api/utils";
import {prepareNewUserAPI} from "./utils";


export class UserStore {
    constructor(protected readonly store: StoreType) {
        makeObservable(this,
            {
                users: observable,
                pages: observable,
                isLoading: observable,
                userIds: computed,
                getUserById: action,
                fetchUserPerPage: action,
                addUser: action,
            }
        )
    }

    // observable ------------------------------------------------------------------------------------------------------
    users: Map<number, User> = new Map()
    pages: number[] = []
    isLoading: boolean = false

    // computed --------------------------------------------------------------------------------------------------------
    get userIds(): number[] {
        return Array.from(this.users.keys())
    }

    // sync methods ----------------------------------------------------------------------------------------------------
    getUserById(id: number): User | undefined {
        return this.users.get(id)
    }

    // async methods ---------------------------------------------------------------------------------------------------
    fetchUserPerPage = async (pageNumber: number) => {
        this.isLoading = true
        try {
            const data = await getUsersPerPage(pageNumber);
            runInAction(() => {
                this.workerAfterFetch(data);
            })
        } catch (e) {
            console.log(e)
        }
    }


    addUser = async (data: IBodyInterface) => {
        this.isLoading = true
        try {
            const response = await createUser(data)
            if(response.id) {
                const newUserData: userAPI = prepareNewUserAPI(data, Number(response.id))
                this.setUser(newUserData)
            }
        } catch (e) {
            console.log(e)
        }
        this.isLoading = false
    }


    // private methods -------------------------------------------------------------------------------------------------

    private clearStore() {
        this.users = new Map()
        this.pages = []
    }

    private workerAfterFetch(response: mainData) {
        const {data, total_pages} = response
        this.clearStore();
        for (let i = 1; i <= total_pages; i++) {
            this.pages.push(i)
        }
        for (const user of data) {
            this.setUser(user);
        }
        this.isLoading = false
    }

    private setUser(userAPI: userAPI): void {
        const user = new User(this.store);
        user.fromAPI(userAPI);
        this.users.set(user.id, user);
    }


}