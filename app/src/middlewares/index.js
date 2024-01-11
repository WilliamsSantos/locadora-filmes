"use strict";

const authRouterMiddleware = require("./authRouterMiddleware");
const isAdminMiddleware = require("./isAdminMiddleware");

module.exports = {
  authRouterMiddleware,
  isAdminMiddleware,
};
