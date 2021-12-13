import React, { useEffect } from 'react'
import { View, FlatList, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import ImageItem from '../ImageItem/ImageItem';
import { observer, inject } from "mobx-react";
import {colors} from '../Styles/Styles';
// import ViewImage from '../ViewImage/ViewImage';
import BigList from "react-native-big-list";

interface Props {
    store?: any;
    navigation: any;
    // flatListRef: any;
    setListRef: (ref: any)=> void
}
const ListHandler: React.FC<Props> = inject('store')(observer((props: Props) => {
    let flatListRef: any;
    const [currentIndex, setIndex] = React.useState(0);

    // useEffect(()=> {
    //     // setIndex(Currentndex);
    //     if (props.store.imageList.length > 0 ) {
    //         props.store.imageList.length > props.store.index + 2 ?
    //         flatListRef.scrollToIndex({ index: currentIndex + 2, animated: true }) :
    //         flatListRef.scrollToIndex({ index: currentIndex + 1, animated: true }) 
    //     }
    //     Alert.alert("Index changed")
    // }, [currentIndex])

    const viewImage = (index: number)=> {
        props.navigation.navigate("ViewImage", {index: index})
    }

    // render individual image item
    const _renderItem = (item: any)=> {
        // console.log(item.index);
        return (
            // margin: 5, maxHeight: 200 
            <TouchableOpacity onPress = {()=> viewImage(item.index)} style={{flex: 1, flexDirection: 'column',}}>
                <ImageItem item = {item} />
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        props.setListRef(flatListRef);
    }, [])

    const getItemLayout = (data: any, index: any) => {
        console.log("LAYOUT")
        console.log(data);
        return (
        { length: 50, offset: 50 * index, index }
      )
    }
    return (
        // <BigList ref={ref => flatListRef = ref} data={props.store.imageList.slice()} 
        // renderItem={_renderItem} itemHeight={200} key={props.store.numColumns} keyExtractor={(item: any) => item.id} showsVerticalScrollIndicator={false} numColumns = {props.store.numColumns} onRefresh = {()=> props.store.loadPhotos()} contentContainerStyle = {{overflow: 'scroll'}} onScrollEnd = {()=>{ setTimeout(() => {
        //         props.store.loadPhotos(true);
        //     }, 500)}}
        // />
        <FlatList getItemLayout = {getItemLayout} ref={ref => flatListRef = ref} data = {props.store.imageList.slice()} renderItem = {_renderItem}  
        onScrollEndDrag = {()=>{ setTimeout(() => {
                props.store.loadPhotos(true);
            }, 500)}} 
                key={props.store.numColumns}
                keyExtractor={(item: any) => item.id} showsVerticalScrollIndicator={false}
                numColumns = {props.store.numColumns} 
                refreshControl = {
                    <RefreshControl colors = {[colors.primary, colors.medium]} refreshing = {props.store.imageList.length === 0 ? true : false} onRefresh = {()=> props.store.loadPhotos()} />} columnWrapperStyle = {{flex: 1, width: '110%'}}
        />
        // <FlatList
        //     ref={ref => flatListRef = ref}
        //     data = {props.store.imageList.slice()}
        //     renderItem={_renderItem}
        //     // initialNumToRender={this.state.data.length / 5}
        //     onEndReached={(e) => {
        //         // Append data
        //     }}
        //     onScroll={(e) => {
        //         if (e.nativeEvent.contentOffset.y == 0) {
        //         // Prepend data
        //         }
        //     }}
        //     onScrollToIndexFailed={(error) => {
        //         // flatListRef.scrollToOffset({ offset:  error.index, animated: true });
        //         flatListRef.scrollToOffset({ offset: error.averageItemLength * error.index, animated: true });
        //         setTimeout(() => {
        //         if (props.store.imageList.length !== 0 && flatListRef !== null) {
        //             flatListRef.scrollToIndex({ index: props.store.index, animated: true });
        //         }
        //         }, 100);
        //     }}
        //     onScrollEndDrag = {()=>{ setTimeout(() => {
        //         props.store.loadPhotos(true);
        //     }, 500)}} 
        //         key={props.store.numColumns}
        //         keyExtractor={(item: any) => item.id} showsVerticalScrollIndicator={false}
        //         numColumns = {props.store.numColumns} 
        //         refreshControl = {
        //             <RefreshControl colors = {[colors.primary, colors.medium]} refreshing = {props.store.imageList.length === 0 ? true : false} onRefresh = {()=> props.store.loadPhotos()} />}  
        // />
    )
}))

export default ListHandler
