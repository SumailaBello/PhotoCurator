import React, { Component } from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import {colors} from '../Styles/Styles';
import {observer, inject} from 'mobx-react';
import IconButton  from '../Shared/Buttons/IconButton';
import Home from '../Home/Home';
import About from '../About/About';
import { Feather } from '@expo/vector-icons';

const Stack = createStackNavigator();
interface Props {
    store?: any,
}
export const NavStack: React.FC<Props> = inject('store')(observer((props: Props)=> {
    const onStateChanged = (event: any)=> {
        console.log(event)
        console.log(event.data.state.routes);
        let routesArr = event.data.state.routes;
        let currentRouteName = routesArr[routesArr.length - 1].name;
        // console.log(lastRouteName);
        props.store.setCurrentRoute(currentRouteName);
    }
        return (
            <>
                <Stack.Navigator initialRouteName="Home" screenOptions={{
                    headerTitleAlign: 'center',
                    // ...TransitionPresets.SlideFromRightIOS,
                    headerStatusBarHeight: StatusBar.currentHeight
                    }}
                    screenListeners={{
                        state: onStateChanged,
                    }}
                >
                        <Stack.Screen name="Home" component={Home}
                        options={({ navigation }) => ({
                            // title: '',
                            // headerTransparent: true,
                        })} 
                        />
                        <Stack.Screen name="About" component={About} 
                        options={({navigation}: any) => ({
                            headerLeft: ()=> (
                                <IconButton icon={<Feather name = "chevron-left" color={colors.light} />} style={styles.backBtn} 
                                onPress={()=> {navigation.goBack()}} />
                            ),
                            headerStyle: {
                                backgroundColor: colors.primary,
                            },
                            headerTitleStyle: {
                                color: colors.light,
                            },
                            headerTitleAlign: 'center'
                        })} 
                        />
                </Stack.Navigator>
            </>
        )
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
    solidBackBtn: {
        width: 40, 
        height: 40, 
        borderRadius: 20, 
        backgroundColor: colors.light, 
        // padding: 10,
        marginLeft: 10,
        borderColor: colors.light,
        borderWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backBtnDark: {
        width: 40, 
        height: 40, 
        borderRadius: 20, 
        // backgroundColor: colors.light, 
        // padding: 10,
        marginLeft: 10,
        borderColor: colors.dark,
        borderWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default NavStack
