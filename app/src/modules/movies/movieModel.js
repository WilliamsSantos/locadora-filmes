"use strict";

const mongoose = require("mongoose");
const useMovieConfig = require("./constants");
const { TABLE_NAME, ALLOWED_MOVIE_STATUS } = useMovieConfig();

const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    synopsis: {
      type: String,
      required: true,
      unique: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    release_date: {
      type: Date,
      default: Date.now,
    },
    genre: {
      type: String,
      required: true,
    },
    is_active: {
      type: Boolean,
      required: true,
      default: true,
    },
    status: {
      type: String,
      required: true,
      enum: Object.keys(ALLOWED_MOVIE_STATUS),
      default: ALLOWED_MOVIE_STATUS.available,
    },
  },
  { timestamps: true, freezeTableName: true }
);

const Movie = mongoose.model(TABLE_NAME, movieSchema);

module.exports = Movie;
