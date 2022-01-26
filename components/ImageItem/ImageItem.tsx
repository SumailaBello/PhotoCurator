import React, {Fragment} from 'react';
import Image from 'react-native-scalable-image';

interface ItemProps {
    item: any;
}

const ImageItem: React.FC<ItemProps> = (props: ItemProps) => {
    return (
        <Fragment key={props.item.toString()}>
            <Image
                style={{margin: 10, width: 50, height: 50}}
                source={{
                uri: props.item?.item?.urls?.thumb ? props.item.item.urls.thumb : props.item.item.uri,
                }}
                defaultSource = {require('../../assets/placeholder.jpg')}
            />
        </Fragment>
    )
}

export default ImageItem;

// const styles = StyleSheet.create({})
