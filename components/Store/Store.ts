import { Dimensions, Platform, ToastAndroid, Keyboard, Alert, DeviceEventEmitter, BackHandler } from 'react-native'; //DeviceEventEmitter, PermissionsAndroid, Alert, Vibration, BackHandler,
import { action, makeObservable, observable, runInAction, computed, values } from 'mobx';
import axios from 'axios';
// import {colors} from '../Styles/Styles';
const platform = Platform.OS;
class Store {
    index: number = 0;
    currentRoute: string = '';
    constructor() {
        makeObservable(this, {
            index: observable,
            currentRoute: observable,
            setIndex: action,
            setCurrentRoute: action,
        });
    }

    setIndex = (value: number)=> {
        this.index = value
    }

    setCurrentRoute = (currentRouteName: string)=> {
        this.currentRoute = currentRouteName
    };

    exit = ()=> {
        BackHandler.exitApp();
    }

}

export default Store;
