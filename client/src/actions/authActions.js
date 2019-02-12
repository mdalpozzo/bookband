import * as types from './actionTypes';

export const registerUser = (userData) => {
  return {
    type: types.REGISTER_ARTIST,
    payload: userData,
  }
}