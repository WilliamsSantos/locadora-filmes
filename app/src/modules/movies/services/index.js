'use strict';

const listAll = require('./listAll');
const adjust  = require('./adjust');
const create  = require('./create');
const findOneById  = require('./findOneById');

const useMovieService = () => ({
    listAll,
    adjust,
    create,
    findOneById
});

module.exports = useMovieService;
