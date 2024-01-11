"use strict";

const CustomerModel = require("./customerModel");

const isSimpleObjectResponse = (isSimpleObjectFormat) => ({
  ...(isSimpleObjectFormat && {
    _id: 0,
    createdAt: 0,
    updatedAt: 0,
    __v: 0,
  }),
});

const findOneBy = async ({
  searchFields = {
    _id: null,
    name: null,
  },
  isSimpleObjectFormat = true,
}) => {
  const found = await CustomerModel.findOne(
    {
      ...searchFields,
      is_active: true,
    },
    {
      ...isSimpleObjectResponse(isSimpleObjectFormat),
    }
  );

  return found?.toObject() ?? {};
};

const store = async (data) => await CustomerModel.create(data);

module.exports = () => ({
  store,
  findOneBy,
});
