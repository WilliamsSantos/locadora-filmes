"use strict";

const bcrypt = require("bcrypt")

const isEmpty = (value) =>
  value == null ||
  ((typeof value === "string" || Array.isArray(value)) && value.length === 0) ||
  (typeof value === "object" && Object.keys(value).length === 0);

const generateHashFrom = async (value, DEFAULT_SALT_LENGHT = 12) =>
  await bcrypt.hash(value, DEFAULT_SALT_LENGHT);

const isValidHash = async (password, hash) =>
  await bcrypt.compare(password, hash);

const getIP = (req) => {
  const headerIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  return headerIp.substr(0, 7) === "::ffff:" ? headerIp.substr(7) : headerIp;
};

const addHoursToCurrentDate = hours => new Date(Date.now() + hours * 60 * 60 * 1000);

module.exports = () => ({
  isEmpty,
  isValidHash,
  generateHashFrom,
  getIP,
  addHoursToCurrentDate
});
