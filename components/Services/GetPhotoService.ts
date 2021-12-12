import axios, {AxiosRequestConfig} from 'axios';

let page: number = 0;
export const getPhoto = async ()=> {
    page++;
    const headers = { 'Authorization': `Client-ID Y70ExMiTIaCUD95m3IQBLDid9S65s6UQGa-QuevV5UY`};
    const options: AxiosRequestConfig = {
        headers: headers,
    };
    // let response
    const res = await axios.get(`https://api.unsplash.com/photos/?page=${page}`, options);
    return res
        // .then(res => {
        //     // this.toggleCustomLoader(false)
        //     console.log(res.data);
        //     console.log(res.data.data);
        //     const list = res.data.data;
        //     // response = list;
        //     return list;
        //     // const user = res.data.data; //returns customer obj only
        //     // console.log(user);
        //     // this.error = false;
        //     // this.isLoading = false;
        //     // this.updateUserObj(user);
        // }, error => {
        //     // this.toggleCustomLoader(false);
        //     // this.error = true;
        //     console.log(error);
        //     console.log(error.response);
        //     return error;
        //     // this.errorHandler(error.response);
        // });
        // return response;
}

export default getPhoto;