'use strict';

const useMovieRepository = require('../movieRepository');

module.exports = async ({ query }) =>
    await useMovieRepository().findMovies(query);
