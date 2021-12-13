import axios, {AxiosRequestConfig} from 'axios';

let page: number = 0;
export const getPhoto = async (next?: boolean)=> {
    // next parameter tells us whether to load net page or not
    next ? page++ : page = 1;
    // const headers = { 'Authorization': `Client-ID Y70ExMiTIaCUD95m3IQBLDid9S65s6UQGa-QuevV5UY`};
    const headers = { 'Authorization': `Client-ID FXf6O0RdmDU7tSa6d1UTrxnYed_belcgDYz8EFt6Asg`};
    const options: AxiosRequestConfig = {
        headers: headers,
    };
    // let response
    const res = await axios.get(`https://api.unsplash.com/photos/?page=${page}`, options);
    return res;
}

export default getPhoto;