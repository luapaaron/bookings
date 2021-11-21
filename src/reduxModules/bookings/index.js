// import Reducer
import bookings from './bookings';

// export Constants
export const FETCH_BOOKINGS = '[bookings] FETCH_BOOKINGS';
export const DELETE_BOOKING = '[bookings] DELETE_BOOKING';

// export Actions
export { actionFetchBookings, actionFetchMoreBookings, actionDeleteBooking } from './bookingsActions';

// export Selectors
export { selectorBookingsList } from './bookingsSelectors';

// export Reducer
export default bookings;
