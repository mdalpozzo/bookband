import isEmpty from '../validation/is-empty';
import { REGISTER_ARTIST, SET_CURRENT_USER } from '../actions/actionTypes';

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case REGISTER_ARTIST:
      return {
        ...state,
        user: action.payload,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    default:
      return state;
  }
}
