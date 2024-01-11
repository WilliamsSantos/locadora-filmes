'use strict';

require('dotenv').config();
require('module-alias/register');
const connectToDatabase = require('database/mongoClient');
const useDatabaseConfig = require('database/configurations');
const startServer = require('./server');

const { DATABASE_URI } = useDatabaseConfig();

connectToDatabase(DATABASE_URI)
    .then(() => {
        console.log('Database connection successful');
        startServer();
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });
