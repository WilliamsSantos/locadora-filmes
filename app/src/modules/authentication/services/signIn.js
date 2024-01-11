"use strict";

const jwt = require("jsonwebtoken");
const useUtils = require("general/utils");
const useCustomerRepository = require("modules/customer/customerRepository");
const useAuthConfig = require("../constants");

const assembleUserData = ({ _id, name, email, is_admin }) => ({
  _id,
  name,
  email,
  is_admin,
});

module.exports = async (req) => {
  const { email, password } = req.body ?? {};

  const userLogged = await useCustomerRepository().findOneBy({
    searchFields: { email },
    isSimpleObjectFormat: false,
  });

  if (useUtils().isEmpty(userLogged)) {
    throw new Error("Cliente não cadastrado");
  }

  const isValidHash = await useUtils().isValidHash(
    password,
    userLogged.password
  );

  if (!isValidHash) {
    throw new Error("Falha na autenticação.");
  }

  const token = jwt.sign(
    assembleUserData(userLogged),
    useAuthConfig().JWT_SECRET_TOKEN,
    {
      expiresIn: useAuthConfig().EXPIRATION_TOKEN_HOUR,
    }
  );

  return { token };
};
