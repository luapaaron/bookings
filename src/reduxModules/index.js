import { combineReducers } from 'redux';

import config from './common/config';

const common = combineReducers({
  config: config || (() => null),
});

const reducers = {
  common,
};

export default reducers;
