import { SUCCESS, PENDING, ERROR, LOAD_MORE } from '@constants/actionStatus';
import update from 'immutability-helper';
import findIndex from 'lodash/findIndex';

import { FETCH_BOOKINGS, DELETE_BOOKING } from './index';

const initialState = {
  list: [],
  fetchListPending: false,
  fetchListError: false,
  hasMore: false,

  fetchMoreListPending: false,
  fetchMoreListError: false,
};

// Create reducer
const bookings = (state = initialState, action = {}) => {
  switch (action.type) {
  case FETCH_BOOKINGS + PENDING:
    return update(state, {
      list: { $set: [] },
      fetchListPending: { $set: true },
      fetchListError: { $set: false },
    });
  case FETCH_BOOKINGS + SUCCESS:
    return update(state, {
      list: { $set: action.payload.data },
      fetchListPending: { $set: false },
      fetchListError: { $set: false },
      hasMore: { $set: !(action.payload.data.length < 10) },
    });
  case FETCH_BOOKINGS + ERROR:
    return update(state, {
      fetchListPending: { $set: false },
      fetchListError: { $set: true },
    });
  case FETCH_BOOKINGS + LOAD_MORE + PENDING:
    return update(state, {
      fetchMoreListPending: { $set: true },
      fetchMoreListError: { $set: false },
    });
  case FETCH_BOOKINGS + LOAD_MORE + SUCCESS:
    return update(state, {
      list: { $push: action.payload.data },
      fetchListPending: { $set: false },
      fetchListError: { $set: false },
    });
  case FETCH_BOOKINGS + LOAD_MORE + ERROR:
    return update(state, {
      fetchMoreListPending: { $set: false },
      fetchMoreListError: { $set: true },
    });
  case DELETE_BOOKING + SUCCESS: {
    const i = findIndex(state.list, { id: action.payload.data });
    return update(state, {
      list: { $splice: [[i, 1]] },
    });
  }
  default:
    return { ...state };
  }
};

export default bookings;
