import { combineReducers } from 'redux';

import bookings from './bookings';
import rooms from './rooms';

import config from './common/config';
import calendar from './common/calendar';

const common = combineReducers({
  config: config || (() => null),
  calendar: calendar || (() => null),
});

const reducers = {
  bookings,
  rooms,
  common,
};

export default reducers;
