"use strict";

const { validationResult } = require("express-validator");
const ApiResponse = require("modules/server/responseHandlers");

const validate = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)));

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return ApiResponse.sendErrorResponse(
      res,
      {
        message: errors.array(),
      },
      400
    );
  }

  next();
};

module.exports = validate;
