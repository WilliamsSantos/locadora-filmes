'use strict';

const express = require('express');
const router = express.Router();

const setupPingRoutes = require('modules/ping/pingPongRoutes');
const setupMovieRoutes = require('modules/movies/movieRoutes');
const setupBookingRoutes = require('modules/books/bookingRoutes');
const setupAuthRoutes = require('modules/authentication/authRoutes');

const configureRoutes = () => {
    setupPingRoutes(router);
    setupMovieRoutes(router);
    setupBookingRoutes(router);
    setupAuthRoutes(router);

    return router;
}

module.exports = configureRoutes;
