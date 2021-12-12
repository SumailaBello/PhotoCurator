import React from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { observer, inject } from "mobx-react";
import NavStack from '../NavStack/NavStack';
import Menu from '../Menu/Menu';
import {colors} from '../Styles/Styles';
import { Feather } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
interface Props {
    store?: any,
}

export const MainApp: React.FC<Props> = inject('store')(observer((props: Props)=> {

    const renderDrawer = (navProps: any) => {
        return (
            <Menu navigation = {navProps.navigation} />
        );
    }
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="NavStack" drawerContent = {renderDrawer}
                screenOptions={{
                    title: '',
                    headerTitleAlign: 'center',
                    header: ()=> null,
                }} 
                >
                    <Drawer.Screen name="NavStack" component={NavStack} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}))

const styles = StyleSheet.create({
    defaultHeader: {
        // position: 'absolute',
        backgroundColor: 'transparent',
        // zIndex: 100,
        // top: 0,
        // left: 0,
    },
    backBtn: {
        width: 40, 
        height: 40, 
        borderRadius: 20, 
        // backgroundColor: colors.light, 
        // padding: 10,
        marginLeft: 10,
        borderColor: colors.light,
        borderWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default MainApp;
