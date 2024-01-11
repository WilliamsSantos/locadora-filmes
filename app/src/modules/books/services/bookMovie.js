"use strict";

const useUtils = require("general/utils");
const useMovieRepository = require("modules/movies/movieRepository");
const useMovieConfig = require("modules/movies/constants");
const useBookingRepository = require("../bookingRepository");
const useBookingConfig = require("../constants");

module.exports = async ({ user, body: { movie_id, customer_id } }) => {
  const { findOneBy: findOneMovieBy, update: UpdateMovie } =
    useMovieRepository();

  const movie = await findOneMovieBy({ value: movie_id });

  if (!movie || !useMovieConfig().isAvailableMovie(movie.status)) {
    throw new Error("Filme não encontrado ou Indisponível para Locação.");
  }

  const reservationBook = {
    movie_id,
    expiration_at: useUtils().addHoursToCurrentDate(3),
    status: useBookingConfig().ALLOWED_BOOKING_STATUS.waiting,
    customer_id,
    booking_by: user._id,
  };

  const bookReserved = await useBookingRepository().store(reservationBook);
  if (!bookReserved) {
    throw new Error(`Falha ao criar reserva para o filme: ${movie.name}`);
  }

  const movieUpdatedStatus = await UpdateMovie({
    id: movie_id,
    updateData: { status: useMovieConfig().ALLOWED_MOVIE_STATUS.reserved },
  });

  if (!movieUpdatedStatus) {
    throw new Error(
      `Falha ao alterar o status do filme: ${movie.name} para Reservado.`
    );
  }

  return {
    reservation_id: bookReserved._id,
    status: reservationBook.status,
  };
};
