"use strict";

const MovieModel = require("./movieModel");
const useMovieConfig = require("./constants");
const { ALLOWED_MOVIE_STATUS } = useMovieConfig();
const { returned, available } = ALLOWED_MOVIE_STATUS;

const findOneBy = async ({
  searchField = "_id",
  value = null,
  isSimpleObjectFormat = true,
}) => {
  const found = await MovieModel.findOne(
    {
      [searchField]: value,
      status: useMovieConfig().ALLOWED_MOVIE_STATUS.available,
    },
    {
      ...(isSimpleObjectFormat && {
        _id: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      }),
    }
  );

  return found?.toObject() ?? {};
};

const findMovies = async (search = {}) =>
  await MovieModel.find({
    ...search,
    status: {
      $in: [returned, available]
    },
  });

const store = async (data) => await MovieModel.create(data);

const update = async ({ id, updateData }) =>
  await MovieModel.findByIdAndUpdate(id, updateData, { new: true });

const useMovieRepository = () => ({
  findMovies,
  update,
  store,
  findOneBy,
});

module.exports = useMovieRepository;
