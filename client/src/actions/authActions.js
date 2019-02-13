import axios from 'axios';
import jwt_decode from 'jwt-decode';

import setAuthToken from '../utils/setAuthToken';

import * as types from './actionTypes';

//register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register_artist', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: types.GET_ERRORS,
        payload: err.response.data
      })
    );
};

//login - get user token
export const loginUser = userData => dispatch => {
  axios.post('/api/users/login', userData).then(res => {
    //save to localStorage
    const { token } = res.data;
    //set token to ls
    localStorage.setItem('jwtToken', token);
    //set token to auth header
    setAuthToken(token);
    //decode token to get user data
    const decoded = jwt_decode(token);
    // set current user
    dispatch(setCurrentUser(decoded));
  });
};

//set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
