import {UserStore} from "./userStore/UserStore";

export class RootStore {
    userStore: UserStore

    constructor() {
        this.userStore = new UserStore(this)
    }
}

const rootStore = new RootStore();

export default rootStore;
export type StoreType = RootStore;
