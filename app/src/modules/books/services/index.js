'use strict';

const bookMovie = require('./bookMovie');
const confirmBook  = require('./confirmBook');
const returnMovieByScheduleId  = require('./returnMovieByScheduleId');

const useService = () => ({
    bookMovie,
    confirmBook,
    returnMovieByScheduleId,
});

module.exports = useService;
