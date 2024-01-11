"use strict";

const mongoose = require("mongoose");
const useCustomerConfig = require("./constants");
const { TABLE_CUSTOMER_NAME } = useCustomerConfig();
const { Schema } = mongoose;

const customerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirm_password: {
      type: String,
      required: false,
    },
    ip: {
      type: String,
    },
    is_active: {
      type: Boolean,
      required: true,
      default: true,
    },
    is_admin: {
      type: Boolean,
      required: true,
      default: false
    },
  },
  { timestamps: true, freezeTableName: true }
);

const Customer = mongoose.model(TABLE_CUSTOMER_NAME, customerSchema);

module.exports = Customer;
