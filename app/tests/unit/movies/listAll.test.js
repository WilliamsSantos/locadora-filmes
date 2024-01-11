const useMovieRepository = require("modules/movies/movieRepository");
const findMovies = require("modules/movies/services/listAll");

jest.mock("modules/movies/movieRepository");

describe("Testes de busca de filmes", () => {
  it("deve retornar filmes que correspondem à consulta específica", async () => {
    const mockMovies = [
      { id: "movie1", title: "Filme A", genre: "Ação" },
      { id: "movie2", title: "Filme B", genre: "Aventura" },
    ];

    useMovieRepository.mockImplementation(() => ({
      findMovies: jest.fn().mockResolvedValue(mockMovies),
    }));

    const query = { genre: "Aventura" };
    const response = await findMovies({ query });

    expect(response).toEqual(mockMovies);
    expect(response).toHaveLength(2);
  });

  it("deve retornar uma lista de filmes para uma consulta vazia", async () => {
    const mockMovies = [
      { id: "movie1", title: "Filme A" },
      { id: "movie2", title: "Filme B" },
    ];
    useMovieRepository.mockImplementation(() => ({
      findMovies: jest.fn().mockResolvedValue(mockMovies),
    }));

    const query = {};
    const response = await findMovies({ query });

    expect(response).toEqual(mockMovies);
  });

  it("deve lidar corretamente com uma consulta que não retorna filmes", async () => {
    useMovieRepository.mockImplementation(() => ({
      findMovies: jest.fn().mockResolvedValue([]),
    }));

    const query = { genre: "Inexistente" };
    const response = await findMovies({ query });

    expect(response).toEqual([]);
  });
});
