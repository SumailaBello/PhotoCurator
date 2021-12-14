import React, {useEffect, useState} from 'react';
import ImageView from "react-native-image-viewing";
import {observer, inject} from 'mobx-react';
import { DefaultText } from '../Shared/Typography/Typography';
import { View } from 'react-native';
import { colors } from '../Styles/Styles';
import { Feather } from '@expo/vector-icons';
import Footer from './Footer';

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
            list.push({
                uri: image.urls.full, 
                key: index, 
                name: image.user.first_name,
                likes: image.likes
            });
            setImage(list);
        })
    }, [])
    const footer: React.FC = (props: any)=> { 
        const index: number = props.imageIndex;
        let image: any = imageList[index];
        const name = image?.name;
        const likes = image?.likes;
        return (
            <Footer name={name} likes={likes} />
        )
    }
    return (
        <ImageView
            images = {imageList}
            imageIndex={props.route.params.index}
            visible={visible}
            onRequestClose={() => {setIsVisible(false); props.navigation.pop()}}
            onImageIndexChange = {(index: number)=> props.store.setIndex(index)}
            keyExtractor = {(item: any) => item.key}
            FooterComponent = {footer}
        />
    )
}))

export default ViewImage;
