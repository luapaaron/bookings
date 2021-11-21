import { SUCCESS, PENDING, ERROR, LOAD_MORE } from '@constants/actionStatus';

import api from '@utils/api';
import isEmpty from '@utils/isEmpty';
import dateFormat from '@utils/dateFormat';

import { FETCH_BOOKINGS, DELETE_BOOKING, FETCH_DETAIL_BOOKING, FETCH_ROOM_DETAIL_BOOKINGS, SUBMIT_BOOKING } from './index';

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

export const actionFetchBooking = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_DETAIL_BOOKING + PENDING });

    const { data } = await api({
      url: `/bookings/${id}`,
    });

    dispatch({ type: FETCH_DETAIL_BOOKING + SUCCESS, payload: { data } });
  } catch (e) {
    dispatch({ type: FETCH_DETAIL_BOOKING + ERROR, payload: 'Something went wrong' });
  }
};

export const actionFetchBookingsByRoomId = (id) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ROOM_DETAIL_BOOKINGS + PENDING });

    const { data } = await api({
      url: '/bookings',
      params: {
        room_id: id,
      },
    });

    dispatch({ type: FETCH_ROOM_DETAIL_BOOKINGS + SUCCESS, payload: { data } });
  } catch (e) {
    dispatch({ type: FETCH_ROOM_DETAIL_BOOKINGS + ERROR, payload: 'Something went wrong' });
  }
};

export const actionSubmitBooking = (roomId, roomName, date, time, interval) => async (dispatch) => {
  try {
    dispatch({ type: SUBMIT_BOOKING + PENDING });

    const combineDateAndTime = (date, time) => {
      const year = date.getFullYear();
      const month = date.getMonth() + 1; // Jan is 0, dec is 11
      const day = date.getDate();
      const dateString = `${year}-${month}-${day}`;
      return new Date(`${dateString} ${time}`);
    };

    const { data } = await api({
      url: '/bookings',
      method: 'POST',
      headers: {
        'Accept': 'application/json', 'Content-Type': 'application/json',
      },
      data: {
        room_id: roomId,
        room_name: roomName,
        host_name: 'Aaron Paul Labing-isa',
        guests_name: [],
        date_time: dateFormat(combineDateAndTime(date, time), 'X', false),
        interval,
      },
    });

    dispatch({ type: SUBMIT_BOOKING + SUCCESS, payload: { } });
  } catch (e) {
    dispatch({ type: SUBMIT_BOOKING + ERROR, payload: 'Something went wrong' });
  }
};
