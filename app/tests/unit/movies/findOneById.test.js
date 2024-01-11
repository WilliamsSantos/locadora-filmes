const useMovieRepository = require("modules/movies/movieRepository");
const findMovieById = require("modules/movies/services/findOneById");

jest.mock("modules/movies/movieRepository");

describe("Testes de busca de filme por ID", () => {
  it("deve retornar um filme quando um ID válido é fornecido", async () => {
    const mockMovie = { id: "movie123", title: "Filme Exemplo" };
    useMovieRepository.mockImplementation(() => ({
      findOneBy: jest.fn().mockResolvedValue(mockMovie),
    }));

    const params = { id: "movie123" };
    const response = await findMovieById({ params });

    expect(response).toEqual(mockMovie);
  });

  it("deve retornar null para um ID de filme inexistente", async () => {
    useMovieRepository.mockImplementation(() => ({
      findOneBy: jest.fn().mockResolvedValue(null),
    }));

    const params = { id: "nonExistingMovie" };
    const response = await findMovieById({ params });

    expect(response).toBeNull();
  });
});
