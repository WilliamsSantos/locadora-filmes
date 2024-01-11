'use strict';

const DATABASE = process.env.DATABASE ?? '';

const DATABASE_URI = `mongodb://${process.env.MONGO_ROOT_USERNAME}:${process.env.MONGO_ROOT_PASSWORD}@${process.env.MONGO_SERVICE_NAME}:${process.env.MONGO_PORT}`;

const useDatabaseConfig = () => ({
    DATABASE,
    DATABASE_URI
});

module.exports = useDatabaseConfig;
