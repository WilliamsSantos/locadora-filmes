"use strict";

const mongoose = require("mongoose");
const useCustomerConfig = require("modules/customer/constants");
const useMovieConfig = require("modules/movies/constants");
const useBookingConfig = require("./constants");

const { TABLE_NAME: BOOKING_TABLE_NAME, ALLOWED_BOOKING_STATUS } =
  useBookingConfig();

const { Schema } = mongoose;

const bookingSchema = new Schema(
  {
    movie_id: {
      type: Schema.Types.ObjectId,
      ref: useMovieConfig().TABLE_NAME,
      required: true,
    },
    customer_id: {
      type: Schema.Types.ObjectId,
      ref: useCustomerConfig().TABLE_CUSTOMER_NAME,
      required: true,
    },
    reserved_at: {
      type: Date,
      default: Date.now,
    },
    expiration_at: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.keys(ALLOWED_BOOKING_STATUS),
      default: ALLOWED_BOOKING_STATUS.waiting
    },
    booking_by: {
      type: Schema.Types.ObjectId,
      ref: useCustomerConfig().TABLE_CUSTOMER_NAME,
      required: true,
    },
    confirmed_by: {
      type: Schema.Types.ObjectId,
      ref: useCustomerConfig().TABLE_CUSTOMER_NAME,
    },
    receive_by: {
      type: Schema.Types.ObjectId,
      ref: useCustomerConfig().TABLE_CUSTOMER_NAME,
    },
  },
  { timestamps: true, freezeTableName: true }
);

const Booking = mongoose.model(BOOKING_TABLE_NAME, bookingSchema);

module.exports = Booking;
