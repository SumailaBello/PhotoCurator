import React, {useEffect, useState} from 'react';
import ImageView from "react-native-image-viewing";
import {observer, inject} from 'mobx-react';

interface Props {
    /**global state store */
    store?: any;
    /**index number of the image to display */
    route: any;
    /**navigation props */
    navigation?: any;
}
const ViewImage: React.FC<Props> = inject('store')(observer((props: Props) => {
    const [visible, setIsVisible] = useState(true);
    const [imageList, setImage] = useState([]);

    useEffect(() => {
        let images = props.store.imageList;
        let list: any = [];
        images.forEach((image: any, index: number) => {
            list.push({uri: image.urls.full, key: index});
            setImage(list);
        })
    }, [])
    return (
        <ImageView
            images = {imageList}
            imageIndex={props.route.params.index}
            visible={visible}
            onRequestClose={() => {setIsVisible(false); props.navigation.pop()}}
            onImageIndexChange = {(index: number)=> props.store.setIndex(index)}
            keyExtractor = {(item: any) => item.key}
        />
    )
}))

export default ViewImage;
