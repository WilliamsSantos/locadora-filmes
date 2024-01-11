"use strict";

const ApiResponse = require("modules/server/responseHandlers");

module.exports = (req, res, next) => {
  const user = req?.user;
  if (!user) {
    return ApiResponse.sendErrorResponse(
      res,
      { message: "Usuario não informado." },
      404
    );
  }

  if (!user.is_admin) {
    return ApiResponse.sendErrorResponse(
      res,
      {
        message:
          "Acesso negado. Usuário não tem permissão para executar a ação.",
      },
      403
    );
  }
  next();
};
