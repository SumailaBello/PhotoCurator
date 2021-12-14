import React, {useEffect, useRef} from 'react';
import { View, StatusBar, StyleSheet, Alert} from 'react-native';
import { Feather } from '@expo/vector-icons';
import globalStyles, {colors} from '../Styles/Styles';
import IconButton  from '../Shared/Buttons/IconButton';
import GridSetting from '../GridSetting/GridSetting';
import { observer, inject } from "mobx-react";
import * as ScreenOrientation from 'expo-screen-orientation';
import ListHandler from '../ListHandler/ListHandler';
import { DefaultText } from '../Shared/Typography/Typography';

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
          // do something
        //   }
        if (props.store.imageList.length > 0 ) {
            // scroll to last index user viewed in fullscreen
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
            {props.store.error ? (
                <View style={{alignSelf: 'center', position: 'absolute', top: '50%', alignItems: 'center' }}>
                    <IconButton style = {globalStyles.iconBtnLg} icon = {<Feather name = "refresh-cw" color={colors.primary} size={25} />} onPress = {()=> props.store.loadPhotos()} backgroundColor = {colors.light}/>
                    <DefaultText title = "refresh" />
                </View>
            ) : (null)}
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
