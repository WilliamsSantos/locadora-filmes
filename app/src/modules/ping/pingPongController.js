'use strict';

const pingPongClap = async (_req, res) => {
    try {
        res.json('Pong..');
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    pingPongClap
};