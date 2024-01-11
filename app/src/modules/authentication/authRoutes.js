"use strict";

const useGeneralConfig = require("general/constants");
const AuthValidator = require("./validations");
const AuthController = require("./authController");
const useAuthConfig = require("./constants");
const { API_V1 } = useGeneralConfig();
const { ROUTE } = useAuthConfig();

module.exports = (router) => {
  const DEFAULT_ROUTE = `${API_V1}${ROUTE}`;

  router.post(
    `${DEFAULT_ROUTE}/register`,
    [AuthValidator.validateCostumerRegisterParams()],
    AuthController.register
  );

  router.post(
    `${DEFAULT_ROUTE}/login`,
    [AuthValidator.validateCustomerLoginBody()],
    AuthController.login
  );
};
