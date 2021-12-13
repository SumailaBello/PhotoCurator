import React from 'react';
import { StyleSheet, View } from 'react-native';
import {SubTitle, DefaultText} from '../Shared/Typography/Typography'

const About = () => {
    return (
        <View style = {{flex: 1, justifyContent: 'center'}}>
            <SubTitle title="Photo Curator" />
            <DefaultText title = "Version 1.0" />
        </View>
    )
}

export default About;

const styles = StyleSheet.create({

})
