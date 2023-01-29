import React from 'react';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/Navigation/Navigation';
import { Provider } from 'react-redux';
import { getStore, getPersistor } from './src/Redux/Store';
import { PersistGate } from 'redux-persist/integration/react'
('@react-native-async-storage/async-storage');

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const App = () => {
  const myStore = getStore();
  const myPersistor = getPersistor();

  return (
    <Provider store={myStore}>
      <PersistGate
        persistor={myPersistor}
      >
        <NavigationContainer>
            <Navigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}
export default App;