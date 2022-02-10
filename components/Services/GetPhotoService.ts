import axios, {AxiosRequestConfig} from 'axios';
import {unsplash_API_KEY} from '../../secrets';

let page: number = 0;
export const getPhoto = async (next?: boolean)=> {
    let res: any;
    if(res) res();
    // next parameter tells us whether to load net page or not
    next ? page++ : page = 1;
    const headers = { 'Authorization': `Client-ID ${unsplash_API_KEY}`};
    const options: AxiosRequestConfig = {
        headers: headers,
    };
    // let response
    res = await axios.get(`https://api.unsplash.com/photos/?page=${page}`, options);
    return res;
}

export const searchPhoto = async (searchQuery: string)=> {
    let res: any;
    if(res) res();
    const headers = { 'Authorization': `Client-ID ${unsplash_API_KEY}`};
    const options: AxiosRequestConfig = {
        headers: headers,
    };
    // let response
    res = await axios.get(`https://api.unsplash.com/search/photos?page=1&query=${searchQuery}&per_page=40`, options);
    return res;
}

// API usage requirement
export const triggerDownload = async (id: string)=> {
    const headers = { 'Authorization': `Client-ID ${unsplash_API_KEY}`};
    const options: AxiosRequestConfig = {
        headers: headers,
    };
    await axios.get(`https://api.unsplash.com/photos/${id}/download`, options);
}

export default getPhoto;