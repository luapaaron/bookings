import { SUCCESS, PENDING, ERROR, LOAD_MORE } from '@constants/actionStatus';
import update from 'immutability-helper';
import findIndex from 'lodash/findIndex';

import { FETCH_BOOKINGS, DELETE_BOOKING, FETCH_DETAIL_BOOKING, FETCH_ROOM_DETAIL_BOOKINGS } from './index';

const initialState = {
  list: [],
  fetchListPending: false,
  fetchListError: false,
  hasMore: false,

  fetchMoreListPending: false,
  fetchMoreListError: false,

  detail: {},
  fetchDetailPending: false,
  fetchDetailError: false,

  roomBookings: [],
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
  case FETCH_DETAIL_BOOKING + PENDING:
    return update(state, {
      detail: { $set: {} },
      fetchDetailPending: { $set: true },
      fetchDetailError: { $set: false },
    });
  case FETCH_DETAIL_BOOKING + SUCCESS:
    return update(state, {
      detail: { $set: action.payload.data },
      fetchDetailPending: { $set: false },
      fetchDetailError: { $set: false },
    });
  case FETCH_DETAIL_BOOKING + ERROR:
    return update(state, {
      fetchDetailPending: { $set: false },
      fetchDetailError: { $set: true },
    });
  case FETCH_ROOM_DETAIL_BOOKINGS + SUCCESS:
    return update(state, {
      roomBookings: { $set: action.payload.data },
    });
  default:
    return { ...state };
  }
};

export default bookings;
