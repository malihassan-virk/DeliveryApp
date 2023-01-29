import { combineReducers } from 'redux';
import getglobalList from './global/getGlobalStates';
import getauthList from './auth/authStates';

export default combineReducers({
  getglobalList:getglobalList,
  getauthList:getauthList
});
