import React, { useEffect } from 'react'
import { FlatList, TouchableOpacity, RefreshControl} from 'react-native';
import ImageItem from '../ImageItem/ImageItem';
import { observer, inject } from "mobx-react";
import {colors} from '../Styles/Styles';

interface Props {
    store?: any;
    navigation: any;
    // flatListRef: any;
    setListRef: (ref: any)=> void
}
const ListHandler: React.FC<Props> = inject('store')(observer((props: Props) => {
    let flatListRef: any;

    const viewImage = (index: number)=> {
        props.navigation.navigate("ViewImage", {index: index})
    }

    // render individual image item
    const _renderItem = (item: any)=> {
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

    return (
        <FlatList
            ref={ref => flatListRef = ref}
            data = {props.store.imageList.slice()}
            renderItem={_renderItem}
            // initialNumToRender={this.state.data.length / 5}
            onEndReached={(e) => {
                // Append data
            }}
            onScroll={(e) => {
                if (e.nativeEvent.contentOffset.y == 0) {
                // Prepend data
                }
            }}
            onScrollToIndexFailed={(error) => {
                // flatListRef.scrollToOffset({ offset:  error.index, animated: true });
                flatListRef.scrollToOffset({ offset: error.averageItemLength * error.index, animated: true });
                setTimeout(() => {
                if (props.store.imageList.length !== 0 && flatListRef !== null) {
                    flatListRef.scrollToIndex({ index: error.index, animated: true });
                }
                }, 100);
            }}
            onScrollEndDrag = {()=>{ setTimeout(() => {
                props.store.loadPhotos(true);
            }, 500)}} 
                key={props.store.numColumns}
                keyExtractor={(item: any) => item.id} showsVerticalScrollIndicator={false}
                numColumns = {props.store.numColumns} 
                refreshControl = {
                    <RefreshControl colors = {[colors.primary, colors.medium]} refreshing = {props.store.imageList.length === 0 ? true : false} onRefresh = {()=> props.store.loadPhotos()} />}  columnWrapperStyle = {{width: '110%'}}
        />
    )
}))

export default ListHandler
