"use strict";

const jwt = require("jsonwebtoken");
const ApiResponse = require("modules/server/responseHandlers");
const useAuthConfig = require("modules/authentication/constants");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || authHeader.split(" ")[0] !== "Bearer") {
    return ApiResponse.sendErrorResponse(
      res,
      { message: "Token ausente ou mal formatado." },
      401
    );
  }

  const token = authHeader.split(" ")[1];

  if (token == null) {
    return ApiResponse.sendErrorResponse(
      res,
      { message: "Token ausente." },
      401
    );
  }

  jwt.verify(token, useAuthConfig().JWT_SECRET_TOKEN, (err, user) => {
    if (err) {
      return ApiResponse.sendErrorResponse(
        res,
        { message: "Acesso negado. Token inválido." },
        403
      );
    }
    req.user = user;
    next();
  });
};
