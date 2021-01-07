export interface mainData {
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    data: userAPI[],
    support: supportApi,
}


export interface userAPI {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string
}

export interface supportApi {
    url: string,
    text: string
}

export interface postUserApi{
    id: string,
    createdAt : string
}
export interface putApiInfo{
    updatedAt: string,
}