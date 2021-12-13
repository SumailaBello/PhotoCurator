import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainApp from './components/MainApp/MainApp';
import FlashMessage, {showMessage, MessageType} from 'react-native-flash-message';
import NetInfo from '@react-native-community/netinfo';
import Store from './components/Store/Store';
import {Provider} from 'mobx-react';
import {colors} from './components/Styles/Styles';

const store = new Store(); //instantiating state store
export const App = ()=> {
  let count: number;
  React.useEffect(()=> {
    NetInfo.addEventListener(state => {
      console.log(count);
      count++;
          // internet diconnected
      if (!state.isConnected && !state.isInternetReachable) {
        count++
        presentNetworkAlert('Internet unavailable!', 'danger');
      }
      // internet connected
      else if (state.isConnected && state.isInternetReachable && count > 2) {
        count++
        presentNetworkAlert('Internet connected',  'success');
      }
    })
  })

  const presentNetworkAlert = (msg: string, type: MessageType)=> {
    showMessage({
      message: msg,
      floating: true,
      type: type,
      duration: 1000,
      backgroundColor: type === 'success' ? colors.success : colors.danger,
      icon: "auto"
    });
  }
  return (
    <Provider store={store}>
      {/* <Text>Open up App.tsx to start working on your app!</Text> */}
      <StatusBar style="auto" />
      <MainApp />
    </Provider>
  );
}

export default App;
