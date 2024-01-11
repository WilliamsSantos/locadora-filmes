"use strict";

exports.sendOkResponse = (res, data, status = 200) => {
  res.status(status).json({
    status,
    data,
  });
};

exports.sendCreatedResponse = (res, data) => {
  exports.sendOkResponse(res, data, 201);
};

exports.sendUpdatedResponse = (res, data) => {
  exports.sendOkResponse(res, data, 200);
};

exports.sendErrorResponse = (res, error, status = 500) => {
  res.status(status).json({
    status,
    error: error.message,
  });
};
