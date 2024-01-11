"use strict";

const useUtils = require("general/utils");
const useMovieRepository = require("../movieRepository");
const findMovieById = require("./findOneById");

module.exports = async ({ params: { id }, body: dataToUpdate }) => {
  const movieFound = await findMovieById({ params: { id } });

  if (useUtils().isEmpty(movieFound)) {
    throw new Error("Filme não encontrado");
  }

  const updateData = { ...movieFound, ...dataToUpdate };

  const updatedMovie = await useMovieRepository().update({ id, updateData });

  if (!updatedMovie) {
    throw new Error("Falha ao atualizar o filme");
  }

  return updatedMovie;
};
