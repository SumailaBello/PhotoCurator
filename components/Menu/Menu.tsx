/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Platform, StatusBar, Image, BackHandler } from 'react-native';
import { SmallText } from '../Shared/Typography/Typography';
import {observer, inject} from 'mobx-react';
import {colors} from '../Styles/Styles';
import { Item } from '../Shared/Menu/MenuItem';
import { Feather } from '@expo/vector-icons';

const ScreenHeight = Dimensions.get('window').height;
// const ScreenWidth = Dimensions.get('window').width;
const platform = Platform.OS;
let height = 17 / 100 * ScreenHeight;

interface Props {
    navigation: any,
    store?: any,
}

export const Menu: React.FC<Props> = inject('store')(observer((props: Props)=> {

    // handles navigation on sidemenu
    const nav = (route: string, props?: any)=> {
        props.navigation.navigate(route);
        props.navigation.closeDrawer();
    };

        return (
            <View style={styles.container}>
                <View style = {[styles.menuHeader, {flex: 2}]} >
                    {/* <Image source = {require('../../assets/img/logo.png')} style={{width: '100%', height: '90%', resizeMode: 'contain'}} /> */}
                    <Feather name = "box" size = {50} color={colors.primary} />
                </View>
                <View style = {[styles.subContainer, {flex: 10}]}>
                    <View style={{marginBottom: 25}}>
                        <Item title = 'About' 
                        icon={<Feather name = "info" color={props.store.currentRoute === 'About' ? colors.primary : colors.iconColor} size={25} />} 
                        color={props.store.currentRoute === 'About' ? colors.primary : colors.medium} onPress = {()=> {nav('About');}} />
                    </View>
                    <View style={{marginBottom: 25}}>
                        <Item title = 'Exit' 
                        icon={<Feather name = "minimize-2" color={colors.danger} size = {25} />} 
                        color={colors.danger} onPress = {()=> props.store.exit()} />
                    </View>
                </View>
            </View>
        );
}))

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: StatusBar.currentHeight,
    },
    subContainer: {
        paddingHorizontal: 10,
        paddingTop: 30,
    },
    thumbnail: {
        height: 70,
        width: 70,
        borderRadius: 50,
    },
    menuHeader: {
        borderBottomColor: colors.iconColor,
        borderBottomWidth: 1,
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    subHeader: {
        paddingHorizontal: 12,
        flexDirection: 'row',
    },
    subTitleStyle: {
        fontSize: 22,
        fontWeight: 'bold',
        fontStyle: 'normal',
        color: colors.dark,
        // textAlign: 'center',
    },
    avatar: {
        // alignSelf: 'center',
        flex: 3,
        marginTop: 25 / 100 * height,
    },
    nameContainer: {
        // flex: 5,
        marginLeft: 30,
    },
    username: {
        marginTop: 35 / 100 * height,
        fontWeight: 'bold',
    },

});

export default Menu;
