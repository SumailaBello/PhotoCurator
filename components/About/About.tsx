import React from 'react';
import { View, Image } from 'react-native';
import {SubTitle, DefaultText} from '../Shared/Typography/Typography'

const About = () => {
    return (
        <View style = {{flex: 1, justifyContent: 'center'}}>
            <Image source={require('../../assets/icon.png')} style={{height: 50, width: 50, resizeMode: 'contain', alignSelf: 'center'}} />
            <SubTitle title="Photo Curator" />
            <DefaultText title = "Version 1.0" />
        </View>
    )
}

export default About;
