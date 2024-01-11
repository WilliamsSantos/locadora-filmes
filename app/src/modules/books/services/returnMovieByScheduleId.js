"use strict";

const useUtils = require("general/utils");
const useMovieRepository = require("modules/movies/movieRepository");
const useMovieConfig = require("modules/movies/constants");
const useBookingRepository = require("../bookingRepository");
const useBookingConfig = require("../constants");

const { ALLOWED_BOOKING_STATUS } = useBookingConfig();
const { leased, returned } = ALLOWED_BOOKING_STATUS;

module.exports = async ({ user, params: { id } }) => {
  const booking = await useBookingRepository().findOneBy({
    value: id,
  });

  if (!booking) throw new Error("Reserva não encontrada.");

  if (booking.status !== leased) {
    throw new Error("Reserva não disponivel para devolução ou já devolvida.");
  }

  const updatedBooking = await useBookingRepository().update({
    id,
    updateData: {
      status: returned,
      receive_by: user._id,
    },
  });

  if (useUtils().isEmpty(updatedBooking)) {
    throw new Error(`Falha ao devolver filme reservado: ${id}`);
  }

  const updatedMovieStatus = await useMovieRepository().update({
    id: booking.movie_id,
    updateData: {
      status: useMovieConfig().ALLOWED_MOVIE_STATUS.available,
    },
  });

  if (useUtils().isEmpty(updatedMovieStatus)) {
    throw new Error(
      `Falha ao atualizar status do filme: ${id}, para disponível`
    );
  }

  return {
    schedule_id: id,
    status: returned,
  };
};
