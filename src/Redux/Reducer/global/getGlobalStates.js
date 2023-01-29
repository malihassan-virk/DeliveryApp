import {
  UPDATE_HOMESCREEN_STATE,
} from "../../Actions/Types/Types"

const INITIAL_STATE = {
  reloadHomeScreen: false,
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_HOMESCREEN_STATE:
      return {
        ...state,
        reloadHomeScreen: action.data
      };
    default:
      return state;
  }
};
