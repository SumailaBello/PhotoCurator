import React, {useEffect, useRef} from 'react';
import { View, StatusBar, StyleSheet, Alert, Dimensions, ActivityIndicator} from 'react-native';
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
const height = Dimensions.get("window").height;
const Home: React.FC<Props> = inject('store')(observer((props: Props) => {
    let listRef: any = useRef();
    let index: number = 0;
    // const [showGridButton, toggleButton] = React.useState(false);
    useEffect(()=> {
        ScreenOrientation.addOrientationChangeListener((event: any)=> {
            // console.log(event);
            if (event.orientationInfo.orientation > 2) {
                // setHeaderBtn();
                // toggleButton(true);
                props.store.setNumColumns(3);
                toggleGridButton(true);
                setTimeout(() => {
                    setHeaderBtn(); 
                }, 100);
            } 
            else if (event.orientationInfo.orientation < 3 ) {
                // setHeaderBtn();
                // toggleButton(false);
                props.store.setNumColumns(2);
                toggleGridButton(false);
                setTimeout(() => {
                    setHeaderBtn(); 
                }, 100);
            }
        })
        return ()=> {
            ScreenOrientation.removeOrientationChangeListeners();
        }
    }, []);

    const toggleGridButton = (show: boolean)=> {
        if (show) {
            props.navigation.setOptions({ 
                headerRight: () => (
                    <GridSetting />
                ) 
            })
        }
        else {
            props.navigation.setOptions({ 
                headerRight: () => (null) 
            })
        }

    }

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
          // do something
        //   }
        if (props.store.imageList.length > 0 ) {
            // scroll to last index user viewed in fullscreen
            listRef.scrollToIndex({ index: index, animated: true }) 
            listRef.current.scrollTo({
                y: height * (index + 1),
                animated: true,
            });
        }
        });
    
        return unsubscribe();
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

    return (
        <View style = {{flex: 1, paddingRight: 10}}>
            <StatusBar translucent = {true} backgroundColor = 'transparent' />
            {/* {!props.store.isLoading ? ( */}
                <ListHandler navigation={props.navigation} />
            {/* // ) : (<ActivityIndicator color={colors.primary} style={{flex: 1}} size={30} />)} */}
            
            {props.store.error && !props.store.isLoading && props.store.imageList.length === 0 ? (
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
