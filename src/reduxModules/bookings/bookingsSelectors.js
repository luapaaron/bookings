import { createSelector } from 'reselect';
import isEmpty from '@utils/isEmpty';
import dateFormat from '@utils/dateFormat';

const bookingState = (state) => {
  if (!isEmpty(state.bookings) && !isEmpty(state.bookings.list)) {
    return state.bookings.list;
  }

  return [];
};

const bookingDetailsState = (state) => {
  if (!isEmpty(state.bookings) && !isEmpty(state.bookings.detail)) {
    return state.bookings.detail;
  }

  return [];
};

const roomsState = (state) => {
  if (!isEmpty(state.rooms) && !isEmpty(state.rooms.list)) {
    return state.rooms.list;
  }

  return [];
};
const roomBookings = (state) => {
  if (!isEmpty(state.bookings) && !isEmpty(state.bookings.roomBookings)) {
    return state.bookings.roomBookings;
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

export const selectorRoomDetails = createSelector(bookingDetailsState, roomsState, (booking, rooms) => {
  let roomDetails = {};
  if (!isEmpty(booking)) {
    roomDetails = rooms.find((room) => room.id === booking.room_id);
  }
  return roomDetails;
});

export const selectorRoomBookings = createSelector(roomBookings, (bookings) => {
  const bookingsList = [];
  if (!isEmpty(bookings)) {
    bookings.forEach((booking) => {
      const bookingDetails = {
        date: dateFormat(booking.date_time),
        time: `${dateFormat(booking.date_time, 'hh:mm A')} - ${dateFormat(parseInt(booking.date_time, 10) + (booking.interval * 60), 'hh:mm A')}`,
        host: booking.host_name,
        guest: booking.guests_name,
      };
      bookingsList.push(bookingDetails);
    });
  }
  return bookingsList;
});
