"use strict";

const { authRouterMiddleware, isAdminMiddleware } = require("middlewares");
const useGeneralConfig = require("general/constants");
const BookingController = require("./bookingController");
const useBookingConfig = require("./constants");
const { API_V1 } = useGeneralConfig();
const { ROUTE } = useBookingConfig();

module.exports = (router) => {
  const DEFAULT_ROUTE = `${API_V1}${ROUTE}`;

  router.post(
    DEFAULT_ROUTE,
    [authRouterMiddleware, isAdminMiddleware],
    BookingController.booking
  );

  router.post(
    `${DEFAULT_ROUTE}/:id/confirm`,
    [authRouterMiddleware, isAdminMiddleware],
    BookingController.confirmBooking
  );

  router.post(
    `${DEFAULT_ROUTE}/:id/return`,
    [authRouterMiddleware, isAdminMiddleware],
    BookingController.returnMovie
  );
};
