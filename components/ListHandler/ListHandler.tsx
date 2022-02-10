import React, { Ref, useEffect, useState } from 'react'
import { TouchableOpacity, RefreshControl, View, Modal, Dimensions, ActivityIndicator, Alert, Keyboard} from 'react-native';
import ImageItem from '../ImageItem/ImageItem';
import { observer, inject } from "mobx-react";
import {colors} from '../Styles/Styles';
import ImageViewer from 'react-native-image-zoom-viewer';
import BigList from "react-native-big-list";
// import { DefaultText, SmallText } from '../Shared/Typography/Typography';
import Footer from './Footer';
import * as FileSystem from 'expo-file-system';
import { Feather } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import IconButton from '../Shared/Buttons/IconButton';
interface Props {
    store?: any,
    navigation: any;
}
const width = Dimensions.get('window').width;

const ListHandler: React.FC<Props> = inject('store')(observer((props: Props) => {
    const [imageOpen, setOpen] = useState(false);
    const [images, setImages]: any = useState([]); //list for viewer
    const [index, setIndex] = useState(0); //list for viewer
    const [downloading, toggleDownloading] = useState(false);
    const [focus, setFocus] = useState(false);
    const [query, setQuery] = useState("");
    const [placeholder, setPlaceholder] = useState('Search');

    // sets image urls in an array
    useEffect(()=> {
        // console.log(listRef)
        let newImgList: any = [];
        // if (props.store.imageList?.length > 0) {
            // setTimeout(()=> {
        props.store.imageList.forEach((image: any)=> {
            console.log(image.user)
            const img = {
                id: image.id,
                url: image.urls.full,
                name: image.user.name,
                likes: image.likes,
                photographer_profile: image.user.links.html
            }
            newImgList.push(img);
            setImages(newImgList);
        })
            // }, 1000)

        // }
    }, [props.store.imageList])

    const viewImage = (index: number)=> {
        // alert(index);
        setIndex(index);
        setOpen(true);
    }

    const listRef: Ref<any> = React.useRef();

    // close image viewer modal
    const closeImageViewer = ()=> {
        setOpen(false);
    }

    const downloadImage = (image: any)=> {
        toggleDownloading(true);
        FileSystem.downloadAsync(image.url, `${FileSystem.documentDirectory}${image.id}.jpg`)
        .then(res=> {
            Alert.alert("Done", "Image saved")
            toggleDownloading(false);
            // console.log(res);
        }).catch(error => {
            toggleDownloading(false);
            Alert.alert(error);
            console.log(error);
        })
        props.store.triggerDownload(image.id);
    }

    // render individual image item
    const renderItem = (item: any)=> {
        return (
            // margin: 5, maxHeight: 200 
            <TouchableOpacity onPress = {()=> viewImage(item.index)} style={{flex: 1}}>
                <ImageItem item = {item} />
            </TouchableOpacity>
        )
    }

    // sets index of viewer and scrolling main list to curent viewed image index
    const handleViewerChange = (index: any)=> {
        // console.log(index);
        setIndex(index);
        listRef.current.scrollToIndex({ index: index, animated: true });
    }

    const [searchMode, setSearchMode] = useState(false);
    const search = ()=> {
        setSearchMode(true);
        Keyboard.dismiss();
        props.store.searchPhotos(query);
        setPlaceholder(`Last search: ${query}`);
        setQuery("");
    }

    return (
        <>
            <View style={{padding: 5, paddingLeft: 10, flexDirection: 'row', position: 'absolute', zIndex: 1000, backgroundColor: colors.light}}>
                <TextInput value={query} placeholder={placeholder} style={{borderWidth: 1, borderRadius: 10, borderColor: focus ? colors.success : colors.disabled, padding: 5, flex: 10}} onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)} onChangeText={(text)=> setQuery(text)} />
                <IconButton disabled = {props.store.isSearching} icon={props.store.isSearching ? <ActivityIndicator size={20} color={colors.light} /> : <Feather name="search" color={colors.light} size={20} />} backgroundColor={colors.primary} style={{flex: 2, borderRadius: 10, marginLeft: 5}} onPress = {search} />
            </View>
            <BigList
                ref={listRef}
                data={props.store.imageList}
                numColumns={props.store.numColumns} // Set the number of columns
                renderItem={renderItem}
                itemHeight={300}
                columnWrapperStyle = {{overflow: 'hidden'}}
                onEndReached = {
                    ()=>{
                        searchMode ? null : props.store.loadPhotos(true);
                    }
                }
                keyExtractor = {(item: any) => item.id}
                refreshControl = {<RefreshControl colors = {[colors.primary, colors.medium]} refreshing = {props.store.imageList.length === 0 && !props.store.error ? true : false} 
                onRefresh = {
                    ()=> {
                        setSearchMode(false);
                        setPlaceholder(`Search`);
                        props.store.loadPhotos();
                    }} />
                }
            />
            
            <Modal style={{backgroundColor: 'black'}} animationType="slide" presentationStyle = "fullScreen" hardwareAccelerated visible={imageOpen} onRequestClose={closeImageViewer} >
                <View style = {{backgroundColor: 'black', flexDirection: 'row', justifyContent: 'flex-end'}}>
                    {downloading ? (
                        <View style={{padding: 5}}>
                            <ActivityIndicator color={colors.light} size={22} />
                        </View>
                    ): (
                        <TouchableOpacity onPress={()=>downloadImage(images[index])} style={{padding: 5}}>
                            <Feather name="download" size = {20} color={colors.light} />
                        </TouchableOpacity>
                    )}
                </View>
                <ImageViewer failImageSource = {require('../../assets/error2.png')} imageUrls={images} useNativeDriver index={index} loadingRender={
                    ()=> (<ActivityIndicator color={colors.light} />)} onChange = {handleViewerChange} enableSwipeDown onSwipeDown={closeImageViewer}
                    />
                    {imageOpen ? (
                        <Footer name={images[index].name} likes={images[index].likes} photographer_profile={images[index].photographer_profile} />
                    ): (null)}  
            </Modal>
        </>
    )
}))

export default ListHandler
