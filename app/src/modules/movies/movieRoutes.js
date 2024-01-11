"use strict";

const { authRouterMiddleware, isAdminMiddleware } = require("middlewares");
const useGeneralConfig = require("general/constants");
const MovieValidators = require("./validations");
const MovieController = require("./movieController");
const useMovieConfig = require("./constants");
const { API_V1 } = useGeneralConfig();
const { ROUTE } = useMovieConfig();

module.exports = (router) => {
  const DEFAULT_ROUTE = `${API_V1}${ROUTE}`;

  router.get(DEFAULT_ROUTE, MovieController.listAll);
  router.get(`${DEFAULT_ROUTE}/:id`, MovieController.listOneById);

  router.post(
    DEFAULT_ROUTE,
    [
      authRouterMiddleware,
      isAdminMiddleware,
      MovieValidators.validateMovieCreationBody(),
    ],
    MovieController.create
  );

  router.put(
    `${DEFAULT_ROUTE}/:id`,
    [
      authRouterMiddleware,
      isAdminMiddleware,
      MovieValidators.validateMovieUpdateParams(),
    ],
    MovieController.edit
  );
};
