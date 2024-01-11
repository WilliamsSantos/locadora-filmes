"use strict";

const { body } = require("express-validator");
const validate = require("middlewares/validationMiddleware");

const validateCustomerLoginBody = () =>
  validate([
    body("email")
      .notEmpty()
      .withMessage("email é obrigatório")
      .isEmail()
      .withMessage("Email inválido"),
    body("password").notEmpty().withMessage("Password é obrigatório"),
  ]);

const validateCostumerRegisterParams = () =>
  validate([
    body("name")
      .notEmpty()
      .withMessage("Nome é Obrigatório")
      .isLength({ min: 2 })
      .withMessage("Nome deve ter no mínimo 2 letras"),
    body("email")
      .notEmpty()
      .withMessage("Email é obrigatório")
      .isEmail()
      .withMessage("Email inválido"),
    body("password").notEmpty().withMessage("Password é obrigatório"),
    body("phone")
      .notEmpty()
      .withMessage("Telefone é obrigatório")
      .isNumeric({ min: 11 })
      .withMessage(
        "Telefone deve conter apenas número e seguir formato com DD:(exemplo: 21987588562) respeitando 11 números"
      ),
  ]);

module.exports = {
  validateCustomerLoginBody,
  validateCostumerRegisterParams,
};
