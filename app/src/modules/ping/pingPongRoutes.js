'use strict';

const useGeneralConfig = require('general/constants');
const PingPongController = require('./pingPongController');
const usePingPongConfig = require("./configurations");

const { API_V1 } = useGeneralConfig();
const { ROUTE } = usePingPongConfig();

module.exports = (router) => {
    const DEFAULT_ROUTE = `${API_V1}${ROUTE}`;
    router.get(DEFAULT_ROUTE, PingPongController.pingPongClap);
};
