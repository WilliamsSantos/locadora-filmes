"use strict";

const mongoose = require("mongoose");

const connectToDatabase = async (uri) => {
  try {
    const connection = await mongoose.connect(uri);
    return connection;
  } catch (error) {
    throw error;
  }
};

module.exports = connectToDatabase;
