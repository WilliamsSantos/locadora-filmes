const useMovieRepository = require("modules/movies/movieRepository");
const createMovie = require("modules/movies/services/create");

jest.mock("modules/movies/movieRepository");

describe("Testes de criação de filme", () => {
  it("deve criar um filme com sucesso", async () => {
    const mockMovie = { id: "movie123", title: "Novo Filme" };
    useMovieRepository.mockImplementation(() => ({
      store: jest.fn().mockResolvedValue(mockMovie),
    }));

    const body = { title: "Novo Filme", genre: "Ação" };
    const response = await createMovie({ body });

    expect(response).toEqual(mockMovie);
  });

  it("deve lançar um erro se a criação do filme falhar", async () => {
    useMovieRepository.mockImplementation(() => ({
      store: jest.fn().mockResolvedValue(null),
    }));

    const body = { title: "Novo Filme", genre: "Ação" };

    await expect(createMovie({ body })).rejects.toThrow("Falha ao criar filme");
  });
});
