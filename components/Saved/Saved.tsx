import React, { Ref, useEffect } from 'react';
import { TouchableOpacity, View, Image, ActivityIndicator, Modal, Alert, ToastAndroid } from 'react-native';
import {SubTitle, DefaultText, SmallText} from '../Shared/Typography/Typography';
import BigList from "react-native-big-list";
import ImageItem from '../ImageItem/ImageItem';
import * as FileSystem from 'expo-file-system';
import ImageViewer from 'react-native-image-zoom-viewer';
// import Footer from '../ListHandler/Footer';
import { colors } from '../Styles/Styles';
import { Feather } from '@expo/vector-icons';
import { shareAsync } from 'expo-sharing';
import * as ScreenOrientation from 'expo-screen-orientation';
import GridSetting from '../GridSetting/GridSetting';
import { observer, inject } from "mobx-react";
interface Props {
    navigation: any;
    store: any;
}

const Saved: React.FC<Props> = inject('store')(observer((props) => {
    const [list, setList] = React.useState([]);
    const [numColumns, setColumns] = React.useState(2);
    const [index, setIndex] = React.useState(0); //image index for viewer
    const [imageOpen, setOpen] = React.useState(false);
    useEffect(()=> {
        ScreenOrientation.addOrientationChangeListener((event: any)=> {
            // console.log(event);
            if (event.orientationInfo.orientation > 2) {
                // setHeaderBtn();
                // toggleButton(true);
                props.store.setNumColumns(3);
                toggleGridButton(true);
                
            } 
            else if (event.orientationInfo.orientation < 3 ) {
                // setHeaderBtn();
                // toggleButton(false);
                props.store.setNumColumns(2);
                toggleGridButton(false);
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

    useEffect(()=> {
        let fileList: any = [];
        FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}`).then((files)=> {
            console.log(files);
            files.forEach(item=> {
                FileSystem.getInfoAsync(`${FileSystem.documentDirectory}${item}`).then(fileInfo=> {
                    const fileObj: any = fileInfo;
                    fileObj['url'] = fileInfo.uri;
                    console.log(fileObj);
                    fileList.push(fileObj);
                    setList(fileList);
            }).catch(error=> console.log(error))  
            })
        }).catch(error=> console.log(error));
    }, [])

    const viewImage = (index: number)=> {
        // alert(index);
        setIndex(index);
        setOpen(true);
        // props.navigation.navigate("ViewImage", {index: index})
    }

    const listRef: Ref<any> = React.useRef();

    // close image viewer modal
    const closeImageViewer = ()=> {
        setOpen(false);
    }

    // sets index of viewer and scrolling main list to curent viewed image index
    const handleViewerChange = (index: any)=> {
        // console.log(index);
        setIndex(index);
        listRef.current.scrollToIndex({ index: index, animated: true });
    }
    // render individual image item
    const renderItem = (item: any)=> {
        // alert(item.item.uri)
        const size: any = Math.ceil(item.item.size/1000000);
        const uri: string = item.item.uri;
        size.toString();
        return (
            // margin: 5, maxHeight: 200 
            <TouchableOpacity onPress = {()=> viewImage(item.index)} style={{flex: 1}}>
                <ImageItem item = {item} />
                {/* <SmallText title={size + ' mb'} textAlign="center" /> */}
            </TouchableOpacity>
        )
    }

    const confirm = (title: string, message: string, callback: (arg1?: any, arg2?: any)=> void)=> {
        Alert.alert(title, message, [
            {
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'Proceed',
                style: 'default',
                onPress: ()=> callback()
            }
        ], {
            
        })
    }

    const del = (image: any)=> {
        FileSystem.deleteAsync(image.uri).then(done=> {
            Alert.alert("Done", "Image deleted");
            const newList = list;
            newList.splice(index, 1);
            setList(newList);
            closeImageViewer();
        }).catch(error=> {
            Alert.alert("Error", "Failed to delete file");
        })
    }

    // shares image with other apps
    const share = (image: any)=> {
        shareAsync(image.uri).then(done=> {
            ToastAndroid.show("Shared image", ToastAndroid.SHORT);
        })
    }
    return (
        <View style = {{flex: 1}}>
            {list.length > 0 ? (
                <BigList
                ref={listRef}
                data={list}
                
                numColumns={props.store.numColumns} // Set the number of columns
                renderItem={renderItem}
                itemHeight={300}
                columnWrapperStyle = {{overflow: 'hidden'}}
                keyExtractor = {(item: any) => item.id}
            />
            ) : (
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <Image source={require('../../assets/img_empty.png')} style={{height: 100, width: 100, resizeMode: 'contain', alignSelf: 'center'}} />
                    <DefaultText title="Saved files will be displayed here" />
                </View>
            )}
                {/* view image modal */}
                <Modal style={{backgroundColor: 'black'}} animationType="slide" presentationStyle = "fullScreen" hardwareAccelerated visible={imageOpen} onRequestClose={closeImageViewer} >
                
                <ImageViewer failImageSource = {require('../../assets/error2.png')} saveToLocalByLongPress={true} imageUrls={list} useNativeDriver index={index} loadingRender={
                    ()=> (<ActivityIndicator color={colors.light} />)} onChange = {handleViewerChange} enableSwipeDown onSwipeDown={closeImageViewer}
                    />
                    <View style={{alignItems: 'center', padding: 5, backgroundColor: 'black'}}>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity>
                                <Feather name = "share-2" size = {25} color={colors.light} style={{marginRight: 20}} onPress={()=>share(list[index])} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Feather name = "trash" size = {25} color={colors.light} style={{marginLeft: 20}} onPress={()=>confirm('Delete', 'Do you want to delete this image?', ()=> del(list[index])) } />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* {imageOpen ? (
                        <Footer name={images[index].name} likes={images[index].likes} photographer_profile={images[index].photographer_profile} />
                    ): (null)}   */}
            </Modal>
        </View>
    )
}))

export default Saved;