import {
  UPDATE_HOMESCREEN_STATE,
} from "../Types/Types"


export const updateHomeState = props => {
  return async dispatch => {
        dispatch({ type: UPDATE_HOMESCREEN_STATE, data: props });
  };
};
