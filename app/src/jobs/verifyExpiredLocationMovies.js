"use strict";

const BookModel = require("modules/books/bookingModel");
const MovieModel = require("modules/movies/movieModel");

module.exports = async () => {
  const expiredBooks = await BookModel.find({
    status: "waiting",
    expiration_at: { $lt: new Date() },
  });

  for (const book of expiredBooks) {
    book.status = "expired";
    await book.save();

    const movie = await MovieModel.findById(book.movie_id);
    if (movie) {
      movie.status = "available";
      await movie.save();
    }
  }
};
