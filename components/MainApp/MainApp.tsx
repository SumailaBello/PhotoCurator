import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { observer, inject } from "mobx-react";
import NavStack from '../NavStack/NavStack';
import Menu from '../Menu/Menu';

const Drawer = createDrawerNavigator();
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

export default MainApp;
