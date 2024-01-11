"use strict";

const BookingModel = require("./bookingModel");

const findOneBy = async ({
  searchField = "_id",
  value = null,
  toObjectFormat = true,
}) => {
  const found = await BookingModel.findOne(
    {
      [searchField]: value,
    },
    {
      ...(toObjectFormat && { _id: 0, createdAt: 0, updatedAt: 0, __v: 0 }),
    }
  );

  return found?.toObject() ?? {};
};

const store = async (data) => await BookingModel.create(data);

const update = async ({ id, updateData }) =>
  await BookingModel.findByIdAndUpdate(id, updateData, { new: true });

const useBookingRepository = () => ({
  store,
  findOneBy,
  update,
});

module.exports = useBookingRepository;
