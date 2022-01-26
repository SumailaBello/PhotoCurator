import {LogBox } from 'react-native';
LogBox.ignoreLogs(['ScrollViewComponent', 'Failed to get size for image']);
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert } from 'react-native';
import MainApp from './components/MainApp/MainApp';
import NetInfo from '@react-native-community/netinfo';
import Store from './components/Store/Store';
import {Provider} from 'mobx-react';

const store = new Store(); //instantiating state store
export const App = ()=> {
  React.useEffect(()=> {
    const unsubscribe = NetInfo.addEventListener(state => {
          // internet disconnected
      if (!state.isConnected && !state.isInternetReachable) {
        presentNetworkAlert('Internet unavailable!');
      }
    })
    return unsubscribe();
  }, [])

  const presentNetworkAlert = (msg: string)=> {
    Alert.alert("Network info", msg);
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
