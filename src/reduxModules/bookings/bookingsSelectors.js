import { createSelector } from 'reselect';
import isEmpty from '@utils/isEmpty';

const bookingState = (state) => {
  if (!isEmpty(state.bookings) && !isEmpty(state.bookings.list)) {
    return state.bookings.list;
  }

  return [];
};

const roomsState = (state) => {
  if (!isEmpty(state.rooms) && !isEmpty(state.rooms.list)) {
    return state.rooms.list;
  }

  return [];
};

export const selectorBookingsList = createSelector(bookingState, roomsState, (bookings, rooms) => {
  const bookingsList = [];
  if (!isEmpty(bookings)) {
    bookings.forEach((booking) => {
      const roomDetails = rooms.find((room) => room.id === booking.room_id);
      const bookingDetails = { ...booking, roomDetails };
      bookingsList.push(bookingDetails);
    });
  }
  return bookingsList;
});
