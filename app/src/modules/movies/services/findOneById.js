"use strict";

const useMovieRepository = require("../movieRepository");

module.exports = async ({ params: { id } }) =>
  await useMovieRepository().findOneBy({ value: id });
