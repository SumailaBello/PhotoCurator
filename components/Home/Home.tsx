import React, {useEffect, useRef} from 'react';
import { View, StatusBar, StyleSheet, FlatList, ActivityIndicator, Alert} from 'react-native';
import { Feather } from '@expo/vector-icons';
import {colors} from '../Styles/Styles';
import IconButton  from '../Shared/Buttons/IconButton';
// import getPhoto from '../Services/GetPhotoService';
import GridSetting from '../GridSetting/GridSetting';
import { observer, inject } from "mobx-react";
import * as ScreenOrientation from 'expo-screen-orientation';
import ListHandler from '../ListHandler/ListHandler';

interface Props {
    navigation: any;
    store: any;
}
const Home: React.FC<Props> = inject('store')(observer((props: Props) => {
    let flatListRef: any = useRef();
    const [showGridButton, toggleButton] = React.useState(false);
    useEffect(()=> {
        ScreenOrientation.addOrientationChangeListener((event: any)=> {
            // console.log(event);
            if(event.orientationInfo.orientation > 2) {
                toggleButton(true);
            } 
            else if (event.orientationInfo.orientation < 3 ) {
                toggleButton(false);
                props.store.setNumColumns(2);
            }
        })
        return ()=> {
            ScreenOrientation.removeOrientationChangeListeners();
        }
    }, []);

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            console.log(flatListRef)
          // do something
        //   if(flatListRef && flatListRef?.scrollToIndex) {
            // flatListRef.scrollToIndex({ index: props.store.index, animated: true });
        //   }
        if (props.store.imageList.length > 0 ) {
            // Alert.alert(String(props.store.imageList.length));
            // Alert.alert(String(props.store.index));
            // props.store.imageList.length >= props.store.index + 2 ?
            // flatListRef.scrollToIndex({ index: props.store.index, animated: true }) :
            flatListRef.scrollToIndex({ index: props.store.index, animated: true }) 
        }
        });
    
        return unsubscribe;
    }, []);

    // sets button in navigation header container
    const setHeaderBtn = ()=> {
        props.navigation.setOptions({
            headerLeft: () => (
                <IconButton icon={<Feather name="menu" color={colors.medium} size = {17} style={{alignSelf: 'center'}} />} style={styles.headerBtn} 
                onPress={()=> {props.navigation.toggleDrawer() }} />
            ),
        });
    }

    // sets menu button on header component
    useEffect(() => {
        setHeaderBtn();
        // get photos on mount
        // return
        props.store.loadPhotos();
    }, [])

    const setListRef = (ref: any)=> {
        Alert.alert("Set ref")
        flatListRef = ref
    }
    return (
        <View style = {{flex: 1, paddingRight: 10}}>
            <StatusBar translucent = {true} backgroundColor = 'transparent' />
            <View style = {{alignItems: 'flex-end'}}>
                {showGridButton ? (
                    <GridSetting />
                ): (null)}
            </View>
            <ListHandler navigation = {props.navigation} setListRef = {setListRef} />
        </View>
    )
}))

const styles = StyleSheet.create({
    headerBtn: {
        width: 40, 
        height: 40, 
        borderRadius: 20, 
        backgroundColor: colors.light, 
        padding: 10,
        marginLeft: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default Home;
