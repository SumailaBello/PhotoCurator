import { View } from 'react-native';
import { colors } from '../Styles/Styles';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { DefaultText } from '../Shared/Typography/Typography';

interface Props {
    name: string;
    likes: number;
}
const Footer: React.FC<Props> = (props: Props)=> {
    return (
        <View style={{flexDirection: 'row'}}>
            <View style={{flex: 6, flexDirection: 'row'}}>
                <Feather name = "heart" color={colors.light} size={25} style={{marginHorizontal: 10}} />
                <DefaultText title={props.likes} color={colors.light} />
            </View>
            <View style={{alignItems: 'flex-end', justifyContent: 'flex-end', flex: 6, paddingHorizontal: 10, flexDirection: 'row'}}>
                <Feather name = "user" color={colors.light} size={25} style={{marginHorizontal: 10}} />
                <DefaultText title={props.name} color={colors.light} />
            </View>
        </View>
    )
}

export default Footer;