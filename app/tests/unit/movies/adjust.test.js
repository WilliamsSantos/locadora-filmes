const useUtils = require("general/utils");
const useMovieRepository = require("modules/movies/movieRepository");
const findMovieById = require("modules/movies/services/findOneById");
const updateMovie = require("modules/movies/services/adjust");

jest.mock("general/utils");
jest.mock("modules/movies/movieRepository");
jest.mock("modules/movies/services/findOneById");

describe("Testes de atualização de filme", () => {
  it("deve atualizar um filme com sucesso", async () => {
    const mockMovie = { id: "movie123", title: "Original Title" };
    findMovieById.mockResolvedValue(mockMovie);
    useMovieRepository.mockImplementation(() => ({
      update: jest
        .fn()
        .mockResolvedValue({ ...mockMovie, title: "Updated Title" }),
    }));
    useUtils.mockImplementation(() => ({
      isEmpty: jest.fn().mockReturnValue(false),
    }));

    const params = { id: "movie123" };
    const dataToUpdate = { title: "Updated Title" };
    const response = await updateMovie({ params, body: dataToUpdate });

    expect(response.title).toBe("Updated Title");
  });

  it("deve lançar um erro se o filme não for encontrado", async () => {
    findMovieById.mockResolvedValue(null);
    useUtils.mockImplementation(() => ({
      isEmpty: jest.fn().mockReturnValue(true),
    }));

    const params = { id: "nonExistingMovie" };
    const dataToUpdate = { title: "Updated Title" };

    await expect(updateMovie({ params, body: dataToUpdate })).rejects.toThrow(
      "Filme não encontrado"
    );
  });

  it("deve lançar um erro se a atualização falhar", async () => {
    const mockMovie = { id: "movie123", title: "Original Title" };
    findMovieById.mockResolvedValue(mockMovie);
    useMovieRepository.mockImplementation(() => ({
      update: jest.fn().mockResolvedValue(null),
    }));
    useUtils.mockImplementation(() => ({
      isEmpty: jest.fn().mockReturnValue(false),
    }));

    const params = { id: "movie123" };
    const dataToUpdate = { title: "Updated Title" };

    await expect(updateMovie({ params, body: dataToUpdate })).rejects.toThrow(
      "Falha ao atualizar o filme"
    );
  });
});
