"use strict";

const { body, check } = require("express-validator");
const validate = require("middlewares/validationMiddleware");

const validateBookingConfirmRequest = () =>
  validate([
    check("customer.name")
      .notEmpty()
      .withMessage("O nome é obrigatório.")
      .isLength({ min: 2 })
      .withMessage("O nome deve ter pelo menos 2 caracteres."),
    check("customer.email")
      .notEmpty()
      .withMessage("O email é obrigatório.")
      .isEmail()
      .withMessage("O email deve ser um endereço de email válido."),
    check("customer.phone")
      .notEmpty()
      .withMessage("O telefone é obrigatório.")
      .isMobilePhone()
      .withMessage("O telefone deve ser um número de telefone válido."),
  ]);

const validateBookingRequest = () =>
  validate([
    body("movie_id")
      .notEmpty()
      .withMessage("ID de um filme é Obrigatório")
      .isMongoId(),
    body("customer_id")
      .notEmpty()
      .withMessage("ID de um cliente é Obrigatório")
      .isMongoId()
      .withMessage("Para completar"),
  ]);

module.exports = {
  validateBookingConfirmRequest,
  validateBookingRequest,
};
