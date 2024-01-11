"use strict";

const ROUTE = "/book";
const TABLE_NAME = "movie_user_booking";

const ALLOWED_BOOKING_STATUS = {
  leased: "leased",
  waiting: "waiting",
  expired: "expired",
  returned: "returned",
  confirmed: "confirmed",
};

const isActiveBooking = (status) => ALLOWED_BOOKING_STATUS.waiting === status;

const useBookingConfig = () => ({
  ROUTE,
  TABLE_NAME,
  ALLOWED_BOOKING_STATUS,
  isActiveBooking,
});

module.exports = useBookingConfig;