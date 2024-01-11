"use strict";

const jwt = require("jsonwebtoken");
const useUtils = require("modules/general/utils");
const ApiResponse = require("modules/server/responseHandlers");
const useAuthConfig = require("modules/authentication/constants");
const useCustomerRepository = require("modules/customer/customerRepository");

function extractToken(authHeader) {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.split(" ")[1];
}

function sendAuthError(res, message, statusCode = 401) {
  ApiResponse.sendErrorResponse(res, { message }, statusCode);
}

module.exports = async (req, res, next) => {
  const token = extractToken(req.headers["authorization"]);
  if (!token) {
    return sendAuthError(res, "Token ausente ou mal formatado.");
  }

  try {
    const userStored = jwt.verify(token, useAuthConfig().JWT_SECRET_TOKEN);
    const user = await useCustomerRepository().findOneBy({
      searchFields: {
        _id: userStored.id,
      },
    });

    if (useUtils().isEmpty(user)) {
      return sendAuthError(res, "Acesso negado. Usuário não registrado.", 403);
    }

    req.user = user;
    next();
  } catch (err) {
    sendAuthError(res, "Acesso negado. Token inválido.", 403);
  }
};
