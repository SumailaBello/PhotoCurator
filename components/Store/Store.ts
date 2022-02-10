import { BackHandler, Alert } from 'react-native';
import { action, makeObservable, observable, runInAction } from 'mobx';
import getPhoto, {searchPhoto, triggerDownload} from '../Services/GetPhotoService';
class Store {
    currentRoute: string = '';
    numColumns: number = 2;
    imageList: Array<any> = [];
    error: boolean = false;
    isLoading: boolean = true;
    isSearching: boolean = false;
    constructor() {
        makeObservable(this, {
            currentRoute: observable,
            numColumns: observable,
            imageList: observable,
            error: observable,
            isLoading: observable,
            isSearching: observable,
            setCurrentRoute: action,
            setNumColumns: action,
            setList: action,
        });
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
        runInAction(()=> {
            this.isLoading = true;
        })
        // const num: any = pageNum;
        getPhoto(next).then(res => {
            runInAction(()=> {
                this.isLoading = false;
            })
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
            console.log(error.response);
            runInAction(()=> {
                this.error = true;
                this.isLoading = false;
            })
            Alert.alert("Error", "unable to load images")
        })
    }

    // searches photos from api
    searchPhotos = (query: string)=> {
        runInAction(()=> {
            this.isSearching = true;
        })
        // const num: any = pageNum;
        searchPhoto(query).then(res => {
            const images = res.data.results;
            // console.log('images below');
            // console.log(images);
            if (images.length > 0) {
                runInAction(()=> {
                    this.isSearching = false;
                    this.setList(images);
                })
            }
        }, error => {
            console.log(error.response);
            runInAction(()=> {
                this.error = true;
                this.isSearching = false;
            })
            Alert.alert("Error", "No search results found");
        })
    }

    // trigger photo download from api
    triggerDownload = (id: string)=> {
        // const num: any = pageNum;
        triggerDownload(id).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

    // updates image list
    setList = (newList: Array<any>)=> {
        this.imageList = newList;
    };

    exit = ()=> {
        BackHandler.exitApp();
    }

}

export default Store;
