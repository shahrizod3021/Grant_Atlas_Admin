import {BaseUrl} from "./BaseUrl.js";

export const Apis  = {
    auth : "/auth",
    getContent: BaseUrl + "/attachment/download?id=",
    upload: "/attachment/upload",
    rooms: '/rooms',
    order: '/order',
    news: '/news',
    request: '/request',
    comment: '/comment',
    about: '/about'

}