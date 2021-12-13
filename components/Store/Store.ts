import { BackHandler } from 'react-native';
import { action, makeObservable, observable } from 'mobx';
import getPhoto from '../Services/GetPhotoService';
class Store {
    /** index of currently visible image*/
    index: number = 0;
    currentRoute: string = '';
    numColumns: number = 2;
    imageList: Array<any> = [];
    constructor() {
        makeObservable(this, {
            index: observable,
            currentRoute: observable,
            numColumns: observable,
            imageList: observable,
            setIndex: action,
            setCurrentRoute: action,
            setNumColumns: action,
            setList: action,
        });
    }

    setIndex = (value: number)=> {
        this.index = value
    }

    // set number of colmns in grid view
    setNumColumns = (num: number) => {
        this.numColumns = num;
    }

    setCurrentRoute = (currentRouteName: string)=> {
        this.currentRoute = currentRouteName
    };

    // load photos from api
    // next parameter tells us to get the next page from api
    loadPhotos = (next?: boolean)=> {
        // const num: any = pageNum;
        getPhoto(next).then(res => {
            const images = res.data;
            let prevList = this.imageList;
            if (next) {
                let newList: any = [...prevList, ...images];
                this.setList(newList);
            }
            else {
                let newList: any = images;
                this.setList(newList);
            }
        }, error => {
            console.log(error.response)
        })
    }

    // updates image list
    setList = (newList: Array<any>)=> {
        console.log(newList)
        this.imageList = newList;
    };

    exit = ()=> {
        BackHandler.exitApp();
    }

}

export default Store;
