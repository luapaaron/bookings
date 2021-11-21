import { SUCCESS, PENDING, ERROR, LOAD_MORE } from '@constants/actionStatus';

import api from '@utils/api';
import isEmpty from '@utils/isEmpty';

import { FETCH_BOOKINGS, DELETE_BOOKING } from './index';

export const actionFetchBookings = (search, filterBy, filterByValue, sortBy = 'id', sortByValue = 'desc', page = 1, limit = 10) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_BOOKINGS + PENDING });

    let params = {};

    if (!isEmpty(search)) {
      params = { ...params, room_name_like: search };
    }

    if (!isEmpty(filterBy) && !isEmpty(filterByValue)) {
      if (filterBy === 'date_time') {
        params = { ...params, date_time_gte: parseInt(filterByValue, 10), date_time_lte: parseInt(filterByValue, 10) + (86400 - 1) };
      } else {
        params = { ...params, [filterBy]: filterByValue };
      }
    }

    if (!isEmpty(sortBy) && !isEmpty(sortByValue)) {
      params = { ...params, _sort: sortBy, _order: sortByValue };
    }

    if (!isEmpty(limit) && !isEmpty(page)) {
      params = { ...params, _limit: limit, _page: page };
    }

    const { data } = await api({
      url: '/bookings',
      params,
    });

    dispatch({ type: FETCH_BOOKINGS + SUCCESS, payload: { data } });
  } catch (e) {
    dispatch({ type: FETCH_BOOKINGS + ERROR, payload: 'Something went wrong' });
  }
};

export const actionFetchMoreBookings = (search, filterBy, filterByValue, sortBy = 'id', sortByValue = 'desc', page = 0, limit = 10) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_BOOKINGS + LOAD_MORE + PENDING });

    let params = {};

    if (!isEmpty(search)) {
      params = { ...params, room_name_like: search };
    }

    if (!isEmpty(filterBy) && !isEmpty(filterByValue)) {
      if (filterBy === 'date_time') {
        params = { ...params, date_time_gte: parseInt(filterByValue, 10), date_time_lte: parseInt(filterByValue, 10) + (86400 - 1) };
      } else {
        params = { ...params, [filterBy]: filterByValue };
      }
    }

    if (!isEmpty(sortBy) && !isEmpty(sortByValue)) {
      params = { ...params, _sort: sortBy, _order: sortByValue };
    }

    if (!isEmpty(limit) && !isEmpty(page)) {
      params = { ...params, _limit: limit, _page: page };
    }

    const { data } = await api({
      url: '/bookings',
      params,
    });

    dispatch({ type: FETCH_BOOKINGS + LOAD_MORE + SUCCESS, payload: { data } });
  } catch (e) {
    dispatch({ type: FETCH_BOOKINGS + LOAD_MORE + ERROR, payload: 'Something went wrong' });
  }
};

export const actionDeleteBooking = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BOOKING + PENDING });

    await api({
      url: `/bookings/${id}`,
      method: 'DELETE',
    });

    dispatch({ type: DELETE_BOOKING + SUCCESS, payload: { data: id } });
  } catch (e) {
    dispatch({ type: DELETE_BOOKING + ERROR, payload: 'Something went wrong' });
  }
};
