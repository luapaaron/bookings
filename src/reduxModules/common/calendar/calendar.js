import { TOGGLE_CALENDAR } from './index';

const initialState = {
  show: false,
  left: 0,
  top: 0,
  onChange: () => {
    // onchange function
  },
  value: new Date(),
};

// Create reducer
const calendar = (state = initialState, action = {}) => {
  if (action.type === TOGGLE_CALENDAR) {
    return { ...state, ...action.payload };
  }
  return state;
};

export default calendar;
