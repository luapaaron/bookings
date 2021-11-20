import update from 'immutability-helper';
import { SET_THEME } from './index';

const initialState = {
  theme: 'default',
};

const config = (state = initialState, action = {}) => {
  if (action.type === SET_THEME) {
    return update(state, {
      theme: { $set: action.payload.props },
    });
  }
  return state;
};

export default config;
