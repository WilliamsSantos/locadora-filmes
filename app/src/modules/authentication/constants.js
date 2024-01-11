"use strict";

const ROUTE = "";
const JWT_SECRET_TOKEN = process.env.JWT_SECRET ?? 'secret';
const EXPIRATION_TOKEN_HOUR = "5h";

module.exports = () => ({
  ROUTE,
  JWT_SECRET_TOKEN,
  EXPIRATION_TOKEN_HOUR
});
