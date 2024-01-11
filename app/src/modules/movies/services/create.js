"use strict";

const useMovieRepository = require("../movieRepository");

module.exports = async ({ body }) => {
  const created = await useMovieRepository().store(body);

  if (!created) throw new Error("Falha ao criar filme");

  return created;
};
