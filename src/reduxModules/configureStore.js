import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import apiErrorHandler from '@utils/apiErrorHandler';
import reducers from './index';

const rootReducer = combineReducers({ ...reducers });
const middlewares = applyMiddleware(thunk, apiErrorHandler);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const configureStore = createStore(rootReducer, composeEnhancers(middlewares));

export default configureStore;
