import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainApp from './components/MainApp/MainApp';
import FlashMessage, {showMessage, MessageType} from 'react-native-flash-message';
import NetInfo from '@react-native-community/netinfo';
import Store from './components/Store/Store';
import {Provider} from 'mobx-react';

const store = new Store(); //instantiating state store
export const App = ()=> {
  return (
    <Provider store={store}>
      {/* <Text>Open up App.tsx to start working on your app!</Text> */}
      <StatusBar style="auto" />
      <MainApp />
    </Provider>
  );
}

export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: '#fff',
//     // alignItems: 'center',
//     // justifyContent: 'center',
//   },
// });
