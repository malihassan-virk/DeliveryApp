import axios from 'axios';
import { API_BaseURL } from '../../../ServicesConfig/api';
import APIs from '../../../ServicesConfig/createApi';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGIN_SUCCESS, SIGNUP_SUCCESS } from '../Types/Types';


export const registerService = (data, cbSuccess, cbError) => {
  return async dispatch => {
    try {
      const response = await axios({
        method: 'POST',
        url: `${API_BaseURL}/register`,
        data: data,
      });
      if (response.data) {
        if ([200, 201, 202].includes(response?.status)) {
          AsyncStorage.setItem('userToken', JSON.stringify(response.data.token));
          AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
          APIs.apiAuth.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;
          APIs.apiAuth.defaults.baseURL = API_BaseURL;
          if (cbSuccess) cbSuccess(response.data)
          dispatch({ type: SIGNUP_SUCCESS, data: response.data });
        }
        else {
          if (cbError) cbError(err)
        }
      }
    } catch (err) {
      if (err) {
        if (cbError) cbError(err)
      }
    }
  };
};


export const loginService = (data, cbSuccess, cbError) => {
  return async dispatch => {
    try {
      const response = await axios({
        method: 'POST',
        url: `${API_BaseURL}/login`,
        data: data,
      });
      if (response.data) {
        if(response?.data.message == "Wrong Credentials") {
          if (cbError) cbError(err)
          return;
        }
        if ([200, 201, 202].includes(response?.status)) {
          console.log("jshjkashdjksh",response)
          AsyncStorage.setItem('userToken', JSON.stringify(response.data.token));
          AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
          APIs.apiAuth.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;
          APIs.apiAuth.defaults.baseURL = API_BaseURL;
          if (cbSuccess) cbSuccess(response.data)
          dispatch({ type: LOGIN_SUCCESS, data: response.data });
        }

      }
    } catch (err) {
      if (err) {
        if (cbError) cbError(err)
      }
    }
  };
};


export const updateUserData = (data) => {
  return async dispatch => {
    try {
      if (data) {
        AsyncStorage.setItem('userToken', JSON.stringify(data.token));
        AsyncStorage.setItem('userData', JSON.stringify(data.user));
        APIs.apiAuth.defaults.headers['Authorization'] = `Bearer ${data.token}`;
        APIs.apiAuth.defaults.baseURL = API_BaseURL;
        dispatch({ type: LOGIN_SUCCESS, data: data });
      }
    } catch (err) {
    }
  };
};