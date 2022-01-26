import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { createStackNavigator} from '@react-navigation/stack';
import {colors} from '../Styles/Styles';
import {observer, inject} from 'mobx-react';
import IconButton  from '../Shared/Buttons/IconButton';
import Home from '../Home/Home';
import About from '../About/About';
import { Feather } from '@expo/vector-icons';
import Saved from '../Saved/Saved';

const Stack = createStackNavigator();
interface Props {
    store?: any,
}
export const NavStack: React.FC<Props> = inject('store')(observer((props: Props)=> {
    const onStateChanged = (event: any)=> {
        // console.log(event)
        // console.log(event.data.state.routes);
        let routesArr = event.data.state.routes;
        let currentRouteName = routesArr[routesArr.length - 1].name;
        // console.log(lastRouteName);
        props.store.setCurrentRoute(currentRouteName);
    }
        return (
            <>
                <Stack.Navigator initialRouteName="Home" screenOptions={{
                    headerTitleAlign: 'center',
                    headerStatusBarHeight: StatusBar.currentHeight
                    }}
                    screenListeners={{
                        state: onStateChanged,
                    }}
                >
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="Saved" component={Saved} 
                        options={({navigation}: any) => ({
                            headerLeft: ()=> (
                                <IconButton icon={<Feather name = "chevron-left" size = {17} color={colors.medium} />} style={styles.backBtn} 
                                onPress={()=> {navigation.goBack()}} />
                            )
                        })} 
                        />
                        <Stack.Screen name="About" component={About} 
                        options={({navigation}: any) => ({
                            headerLeft: ()=> (
                                <IconButton icon={<Feather name = "chevron-left" size = {17} color={colors.medium} />} style={styles.backBtn} 
                                onPress={()=> {navigation.goBack()}} />
                            )
                        })} 
                        />
                </Stack.Navigator>
            </>
        )
}))

const styles = StyleSheet.create({
    defaultHeader: {
        backgroundColor: 'transparent',
    },
    backBtn: {
        width: 40, 
        height: 40, 
        borderRadius: 20,
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
        marginLeft: 10,
        borderColor: colors.dark,
        borderWidth: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default NavStack
