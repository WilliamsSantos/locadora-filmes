"use strict";

const ApiResponse = require("modules/server/responseHandlers");
const useAuthService = require("./services");

const register = async (req, res) => {
  try {
    const registered = await useAuthService().signUp(req);
    ApiResponse.sendCreatedResponse(res, registered);
  } catch (error) {
    ApiResponse.sendErrorResponse(res, { message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const token = await useAuthService().signIn(req);
    ApiResponse.sendOkResponse(res, token);
  } catch (error) {
    ApiResponse.sendErrorResponse(res, { message: error.message });
  }
};

module.exports = {
  register,
  login,
};
