// import Reducer
import bookings from './bookings';

// export Constants
export const FETCH_BOOKINGS = '[bookings] FETCH_BOOKINGS';
export const DELETE_BOOKING = '[bookings] DELETE_BOOKING';
export const FETCH_DETAIL_BOOKING = '[bookings] FETCH_DETAIL_BOOKING';
export const FETCH_ROOM_DETAIL_BOOKINGS = '[bookings] FETCH_ROOM_DETAIL_BOOKINGS';
export const SUBMIT_BOOKING = '[bookings] SUBMIT_BOOKING';

// export Actions
export { actionFetchBookings, actionFetchMoreBookings, actionDeleteBooking, actionFetchBooking, actionFetchBookingsByRoomId, actionSubmitBooking } from './bookingsActions';

// export Selectors
export { selectorBookingsList, selectorRoomDetails, selectorRoomBookings } from './bookingsSelectors';

// export Reducer
export default bookings;
