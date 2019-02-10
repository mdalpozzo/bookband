import { createStore, applyMiddleware, compose } from 'redux';
// import { Store, applyMiddleware, compose } from 'react-chrome-redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

const initialState = {};

const middleware = [thunk];

// FOR DEVELOPMENT
/* eslint-disable no-underscore-dangle */
// const store = createStore(
//   rootReducer,
//   initialState,
//   compose(
//     applyMiddleware(...middleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );
/* eslint-enable */

// FOR PRODUCTION
/* eslint-disable no-underscore-dangle */
const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware)));
/* eslint-enable */

window.store = store;
export default store;
