import React, {useEffect} from 'react';
import { View, StatusBar, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import { Feather } from '@expo/vector-icons';
import {colors} from '../Styles/Styles';
import IconButton  from '../Shared/Buttons/IconButton';
import getPhoto from '../Services/GetPhotoService';
import ImageItem from '../ImageItem/ImageItem';
import GridSetting from '../GridSetting/GridSetting';

interface Props {
    navigation: any;
}
const Home: React.FC<Props> = (props: Props) => {
    const [list, setList] = React.useState([]);
    // sets button in navigation header container
    const setHeaderBtn = ()=> {
        props.navigation.setOptions({
            headerLeft: () => (
                <IconButton icon={<Feather name="menu" color={colors.dark} size = {20} />} style={styles.headerBtn} 
                onPress={()=> {props.navigation.toggleDrawer() }} />
            ),
        });
    }

    // sets menu button on header component
    useEffect(() => {
        setHeaderBtn();
    }, [])

    const loadPhotos = ()=> {
        getPhoto().then(res => {
            const images = res.data;
            let prevList = list;
            let newList: any = [...prevList, ...images];
            setList(newList);
        })
    }

    // get photos on mount
    useEffect(() => {
        return
        loadPhotos();
    }, [])

    const _renderItem = (item: any)=> {
        console.log(item);
        return (
            <ImageItem item = {item} />
        )
    }
    return (
        <View style = {{flex: 1}}>
            <StatusBar translucent = {true} backgroundColor = 'transparent' />
            <GridSetting />
            {list.length > 0 ? (
                <FlatList data = {list} renderItem = {_renderItem} contentContainerStyle = {{flexDirection: 'column',  alignItems: 'flex-start'}} numColumns = {2} onScrollEndDrag = {()=>{ setTimeout(() => {
                    loadPhotos();
                }, 1000)}} />
            ) : (
                <ActivityIndicator color = {colors.primary} size = {50} style = {{flex: 1}} />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    headerBtn: {
        width: 40, 
        height: 40, 
        borderRadius: 20, 
        backgroundColor: colors.light, 
        padding: 10,
        marginLeft: 20,
    },
    // image: {}
})

export default Home;
