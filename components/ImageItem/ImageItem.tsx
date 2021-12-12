import React, {Fragment} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Image from 'react-native-scalable-image';

interface ItemProps {
    item: any;
}

const ImageItem: React.FC<ItemProps> = (props: ItemProps) => {
    return (
        <Fragment key={props.item.toString()}>
                <Image
                style={{margin: 10}}
                source={{
                uri: props.item.item.urls.thumb,
                }}
                defaultSource = {require('../../assets/placeholder.jpg')}
            />
        </Fragment>
    )
}

export default ImageItem;

const styles = StyleSheet.create({})
