import * as types from '../actions/actionTypes';

const initialState = {
  isAuthenticated: false,
  user: {},
}

export default function(state = initialState, action) {
  switch(action.type) {
    case types.REGISTER_ARTIST:
    return {
      ...state,
      user: action.payload,
    }
    default:
    return state;
  }
}