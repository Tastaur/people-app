import {
    showExternals,
    showFromApi,
    showImage,
    showLinks,
    showNetwork,
    showRating,
    showSchedule,
    webChannel
} from "../../api/types";
import {action, computed, observable} from "mobx";

export class Show {
    @observable id: number = 0;
    @observable url: string = ''
    @observable name: string = ''
    @observable type: string = ''
    @observable language: string = ''
    @observable genres: string[] | null = []
    @observable status: string = ''
    @observable runtime: number = 0
    @observable premiered: string = ''
    @observable officialSite: string = ''
    @observable time: string = ''
    @observable schedule: showSchedule = {
        days: [],
        time: '',
    }
    @observable rating: showRating = {
        average: null,
    }
    @observable weight: number = 0
    @observable network: showNetwork = {
        country: {
            code: '',
            name: '',
            timezone: '',
        },
        id: 0,
        name: ''
    }
    @observable webChannel: webChannel | null = null

    @observable externals: showExternals = {
        imdb: '',
        thetvdb: 0,
        tvrage: 0
    }
    @observable image: showImage = {
        medium: '',
        original: ''
    }

    @observable summary: string = ''
    @observable updated: number = 0
    @observable _link: showLinks = {
        previousepisode: {
            href: ''
        },
        self: {
            href: ''
        }
    }

    @computed get genreToString(): string {
        return (this.genres && this.genres.length > 0) ? this.genres.join(', ') : 'Without genres'
    }

    @computed get getCurrentRating(): string {
        return this.rating.average ? `${this.rating.average}` : 'Without rating'
    }


    @action fromAPI(apiShow: showFromApi) {
        this.id = apiShow.id;
        this.url = apiShow.url;
        this.name = apiShow.name;
        this.type = apiShow.type;
        this.language = apiShow.language;
        this.genres = apiShow.genres;
        this.status = apiShow.status;
        this.runtime = apiShow.runtime;
        this.premiered = apiShow.premiered;
        this.officialSite = apiShow.officialSite;
        this.time = apiShow.time;
        this.schedule = apiShow.schedule;
        this.rating = apiShow.rating;
        this.weight = apiShow.weight;
        this.network = apiShow.network;
        this.webChannel = apiShow.webChannel;
        this.externals = apiShow.externals;
        this.image = apiShow.image;
        this.summary = apiShow.summary;
        this.updated = apiShow.updated;
        this._link = apiShow._link;
    }
}