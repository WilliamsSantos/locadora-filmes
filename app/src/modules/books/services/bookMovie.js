"use strict";

const useUtils = require("general/utils");
const useMovieRepository = require("modules/movies/movieRepository");
const useCustomerRepository = require("modules/customer/customerRepository");
const useMovieConfig = require("modules/movies/constants");
const useBookingRepository = require("../bookingRepository");
const useBookingConfig = require("../constants");

async function checkIfCustomerExists(customer_id) {
  const clientExists = await useCustomerRepository().findOneBy({
    searchFields: {
      _id: customer_id,
    },
    isSimpleObjectFormat: false,
  });

  if (useUtils().isEmpty(clientExists)) {
    throw new Error("Cliente não encontrado nos registros.");
  }
}

module.exports = async ({ user, body: { movie_id, customer_id } }) => {
  const { findOneBy: findOneMovieBy, update: UpdateMovie } =
    useMovieRepository();

  const movie = await findOneMovieBy({ value: movie_id });

  if (!movie || !useMovieConfig().isAvailableMovie(movie.status)) {
    throw new Error("Filme não encontrado ou Indisponível para Locação.");
  }

  await checkIfCustomerExists(customer_id);

  const reservationBook = {
    movie_id,
    expiration_at: useUtils().addHoursToCurrentDate(3),
    status: useBookingConfig().ALLOWED_BOOKING_STATUS.waiting,
    customer_id,
    booking_by: user.id,
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
