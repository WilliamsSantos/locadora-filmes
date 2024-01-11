"use strict";

const useUtils = require("general/utils");
const useCustomerRepository = require("modules/customer/customerRepository");

module.exports = async (req) => {
  const { password, ...resCustomer } = req.body ?? {};

  const hashedPassword = await useUtils().generateHashFrom(password);

  const customer = await useCustomerRepository().store({
    ...resCustomer,
    ip: useUtils().getIP(req),
    password: hashedPassword,
  });

  if (!customer) {
    throw new Error(`Falha ao salvar o usuário.`);
  }

  return customer;
};
