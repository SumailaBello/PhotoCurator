import { TouchableOpacity, View } from 'react-native';
import globalStyles, { colors } from '../Styles/Styles';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { DefaultText, SmallText } from '../Shared/Typography/Typography';
import * as Linking from 'expo-linking';
import Button from '../Shared/Buttons/Button';

interface Props {
    name: string;
    likes: any;
    photographer_profile: string;
}
const Footer = (props: Props)=> {
    console.log(props.photographer_profile)
    const openUrl = (url: string)=> {
        const link = `${url}`;
        // const link = `${url}&utm_source=Mobile_photo_curator&utm_medium=referral`;
        alert(link);
        Linking.openURL(link).then(res=>{
            console.log(res);
        }).catch(err=> console.log(err));
    }
    return (
        <View style={{flexDirection: 'row', backgroundColor: 'black', paddingVertical: 5}}>
            <View style={{flex: 2, flexDirection: 'row', alignItems: 'flex-end'}}>
                <Feather name = "heart" color={colors.light} size={20} style={{marginHorizontal: 10}} />
                <SmallText title={props.likes} color={colors.light} />
            </View>
            <View style={{alignItems: 'flex-end', justifyContent: 'flex-end', flex: 8, paddingHorizontal: 10,}}>
                {/* <Feather name = "user" color={colors.light} size={20} style={{marginHorizontal: 10, alignSelf: 'center'}} /> */}
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                    <Feather name = "user" color={colors.light} size={20} style={{marginHorizontal: 5, alignSelf: 'center'}} />
                    <Button style={[globalStyles.primaryOutlineBtn, {backgroundColor: 'black', marginLeft: 5}]} title={props.name} textColor={colors.light} onPress={()=>openUrl(props.photographer_profile)} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                    <SmallText title="From " />
                    <TouchableOpacity onPress={()=>openUrl('https://unsplash.com')} style={{alignSelf: 'center', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.light, marginLeft: 5}}>
                        <SmallText title="Unsplash" color={colors.light} lines={2} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Footer;