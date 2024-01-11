'use strict';

const express = require('express');
const useServerConfig = require('./configurations');
const configureRoutes = require('./configureRoutes');

require('jobs/bookQueue');

const { PORT } = useServerConfig();

const startServer = () => {
    const app = express();

    app.use(express.json());

    app.use('/api', configureRoutes());

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

    return app;
};

module.exports = startServer;