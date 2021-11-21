import { SUCCESS, PENDING, ERROR } from '@constants/actionStatus';
import update from 'immutability-helper';

import { FETCH_ROOMS } from './index';

const initialState = {
  list: [],
  fetchListPending: false,
  fetchListError: false,
};

// Create reducer
const bookings = (state = initialState, action = {}) => {
  switch (action.type) {
  case FETCH_ROOMS + PENDING:
    return update(state, {
      list: { $set: [] },
      fetchListPending: { $set: true },
      fetchListError: { $set: false },
    });
  case FETCH_ROOMS + SUCCESS:
    return update(state, {
      list: { $set: action.payload.data },
      fetchListPending: { $set: false },
      fetchListError: { $set: false },
    });
  case FETCH_ROOMS + ERROR:
    return update(state, {
      fetchListPending: { $set: false },
      fetchListError: { $set: true },
    });
  default:
    return { ...state };
  }
};

export default bookings;
