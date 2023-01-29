import { createStore, applyMiddleware } from "redux";
import rootReducer from '../Reducer/rootReducer';
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';
//import storeConstants  from './constants'
const persistConfig = {
    key: "root",    
    storage: AsyncStorage
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer,applyMiddleware(thunk));
const persistor = persistStore(store);
const getPersistor = () => persistor;
const getStore = () => store;
const getState = () => {
    return store.getState();
};
export {
    getStore,
    getState,
    getPersistor
}; 
