"use strict";

const ApiResponse = require("modules/server/responseHandlers");
const useMovieService = require("./services");

const listAll = async (req, res) => {
  try {
    const movies = await useMovieService().listAll(req);
    ApiResponse.sendOkResponse(res, movies);
  } catch (error) {
    ApiResponse.sendErrorResponse(res, { message: error.message });
  }
};

const listOneById = async (req, res) => {
  try {
    const movie = await useMovieService().findOneById(req);
    ApiResponse.sendOkResponse(res, movie);
  } catch (error) {
    ApiResponse.sendErrorResponse(res, { message: error.message });
  }
};

const create = async (req, res) => {
  try {
    const movieCreated = await useMovieService().create(req);
    ApiResponse.sendCreatedResponse(res, movieCreated);
  } catch (error) {
    ApiResponse.sendErrorResponse(res, { message: error.message });
  }
};

const edit = async (req, res) => {
  try {
    const movieEdited = await useMovieService().adjust(req);
    ApiResponse.sendUpdatedResponse(res, movieEdited);
  } catch (error) {
    ApiResponse.sendErrorResponse(res, { message: error.message });
  }
};

module.exports = {
  listAll,
  edit,
  create,
  listOneById,
};
