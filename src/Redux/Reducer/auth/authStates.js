import {
SIGNUP_SUCCESS,
LOGIN_SUCCESS
} from "../../Actions/Types/Types"

const INITIAL_STATE = {
  data:null,
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return {
        ...state,
        data: action.data
      };
      case LOGIN_SUCCESS:
      return {
        ...state,
        data: action.data
      };
    default:
      return state;
  }
};
