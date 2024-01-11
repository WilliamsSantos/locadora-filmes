"use strict";

const ApiResponse = require("modules/server/responseHandlers");
const useBookService = require("./services");

const booking = async (req, res) => {
  try {
    const bookedMovie = await useBookService().bookMovie(req);
    ApiResponse.sendOkResponse(res, bookedMovie);
  } catch (error) {
    ApiResponse.sendErrorResponse(res, { message: error.message });
  }
};

const confirmBooking = async (req, res) => {
  try {
    const confirmed = await useBookService().confirmBook(req);
    ApiResponse.sendOkResponse(res, confirmed);
  } catch (error) {
    ApiResponse.sendErrorResponse(res, { message: error.message });
  }
};

const returnMovie = async (req, res) => {
  try {
    const returned = await useBookService().returnMovieByScheduleId(req);
    ApiResponse.sendOkResponse(res, returned);
  } catch (error) {
    ApiResponse.sendErrorResponse(res, { message: error.message });
  }
};

module.exports = {
  booking,
  confirmBooking,
  returnMovie,
};
