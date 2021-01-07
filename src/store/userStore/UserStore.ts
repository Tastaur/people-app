import {action, computed, makeAutoObservable, observable} from 'mobx';
import {StoreType} from "../rootStore";
import {Show} from "./Show";
import {fetchShow} from "../../api/show";
import {showFromApi} from "../../api/types";
import {computedFn} from 'mobx-utils'


export class ShowStore {
    constructor(protected readonly store: StoreType) {
        makeAutoObservable(this)
    }

    @observable shows: Map<number, Show> = new Map()
    @observable isLoading: boolean = false
    @observable isFinishLoading: boolean = false

    @computed get showsList(): Show[] {
        return Array.from(this.shows.values())
    }

    getSortedShowList = computedFn((genre: string) => {
        if (genre !== '') {
            return this.showsList.filter(item => item.genres?.includes(genre))
        } else {
            return this.showsList
        }
    })


    @computed get genreList(): string[] {
        const genre = new Set<string>()
        this.showsList.forEach(item => item.genres?.forEach(g => genre.add(g)))
        return Array.from(genre.values())
    }

    @action clearStore() {
        this.shows = new Map()
    }

    @action workerAfterFetch(shows: showFromApi[]) {
        this.clearStore();
        for (const show of shows) {
            this.setShowItem(show);
        }
        this.isLoading = false
        this.isFinishLoading = true
    }

    @action
    async getShows() {
        this.isLoading = true
        try {
            const shows = await fetchShow();
            this.workerAfterFetch(shows);
        } catch (err) {
            console.log(err.message)
        }
    }

    @action setShowItem(show: showFromApi): void {
        const showItem = new Show();
        showItem.fromAPI(show);
        this.shows.set(showItem.id, showItem);
    }

    @action getShowById(id: number): Show | undefined {
        return this.shows.get(id)
    }


}