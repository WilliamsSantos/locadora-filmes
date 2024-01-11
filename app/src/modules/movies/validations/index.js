"use strict";

const { body, param } = require("express-validator");
const validate = require("middlewares/validationMiddleware");

const validateMovieCreationBody = () =>
  validate([
    body("name")
      .notEmpty()
      .withMessage("Nome é Obrigatório")
      .isLength({ min: 2 })
      .withMessage("Nome deve ter no mínimo 2 letras"),
    body("synopsis").notEmpty().withMessage("Sinopse é obrigatório"),
    body("rating")
      .isFloat({ min: 0, max: 10 })
      .withMessage("Deve estar entre 0 e 10"),
    body("release_date")
      .isDate({ format: "YYYY-MM-DD" })
      .withMessage("Data no formato inválido: (esperado YYYY-MM-DD)"),
    body("genre").notEmpty().withMessage("Gênero é obrigatório"),
  ]);

const validateMovieUpdateParams = () =>
  validate([
    param("id").isMongoId().notEmpty(),
    body("name")
      .optional()
      .notEmpty()
      .withMessage("Nome é Obrigatório")
      .isLength({ min: 2 })
      .withMessage("Nome deve ter no mínimo 2 letras"),
    body("synopsis").optional().notEmpty().withMessage("Sinopse é obrigatório"),
    body("rating")
      .optional()
      .isFloat({ min: 0, max: 10 })
      .withMessage("Deve estar entre 0 e 10"),
    body("release_date")
      .optional()
      .isDate({ format: "YYYY-MM-DD" })
      .withMessage("Data no formato inválido: (esperado YYYY-MM-DD)"),
    body("genre").optional().notEmpty().withMessage("Gênero é obrigatório"),
  ]);

module.exports = {
  validateMovieUpdateParams,
  validateMovieCreationBody,
};
