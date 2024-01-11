"use strict";

const ROUTE = "/movies";
const TABLE_NAME = "movies";
const ALLOWED_MOVIE_STATUS = {
  available: "available",
  reserved: "reserved",
};

const isAvailableMovie = (status) => ALLOWED_MOVIE_STATUS.available === status;

const useMovieConfig = () => ({
  ROUTE,
  TABLE_NAME,
  ALLOWED_MOVIE_STATUS,
  isAvailableMovie,
});

module.exports = useMovieConfig;
