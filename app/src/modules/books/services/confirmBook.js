"use strict";

const useUtils = require("modules/general/utils");
const useCustomerRepository = require("modules/customer/customerRepository");
const useBookingRepository = require("../bookingRepository");
const useBookingConfig = require("../constants");
const { ALLOWED_BOOKING_STATUS } = useBookingConfig();
const { expired, leased } = ALLOWED_BOOKING_STATUS;

async function checkBookingState(booking) {
  if (useUtils().isEmpty(booking)) throw new Error("Reserva não encontrada.");

  const actions = {
    [leased]: () => {
      throw new Error("Filme já reservado.");
    },
    [expired]: async () => {
      await updateBookingStatus(booking._id, expired);
      throw new Error("Reserva expirada.");
    },
  };

  const action = actions[booking.status];
  if (action) await action();

  if (booking.expiration_at < new Date()) {
    await updateBookingStatus(booking._id, expired);
    throw new Error("Reserva expirada.");
  }
}

async function updateBookingStatus(bookingId, status) {
  await useBookingRepository().update({
    id: bookingId,
    updateData: { status: status },
  });
}

async function checkCustomer(customer, booking) {
  const clientExists = await useCustomerRepository().findOneBy({
    searchFields: customer,
    isSimpleObjectFormat: false,
  });

  if (useUtils().isEmpty(clientExists)) {
    throw new Error("Cliente não encontrado nos registros.");
  }

  if (!booking.customer_id.equals(clientExists._id)) {
    throw new Error("Dados do cliente não correspondem a essa reserva.");
  }
}

module.exports = async ({ user, params: { id }, body: { customer } }) => {
  const booking = await useBookingRepository().findOneBy({
    value: id,
    toObjectFormat: false,
  });

  await checkBookingState(booking);
  await checkCustomer(customer, booking);

  const updatedBooking = await useBookingRepository().update({
    id,
    updateData: { status: leased, confirmed_by: user._id },
  });

  if (useUtils().isEmpty(updatedBooking)) {
    throw new Error(`Falha ao confirmar a reserva: ${id}`);
  }

  return { schedule_id: id, status: updatedBooking.status };
};
