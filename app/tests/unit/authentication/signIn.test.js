const jwt = require("jsonwebtoken");
const useUtils = require("modules/general/utils");
const useCustomerRepository = require("modules/customer/customerRepository");
const useAuthConfig = require("modules/authentication/constants");
const apiSignIn = require("modules/authentication/services/signIn");

jest.mock("jsonwebtoken");
jest.mock("general/utils");
jest.mock("modules/customer/customerRepository");
jest.mock("modules/authentication/constants");

describe("Testes da função de autenticação", () => {
  it("deve gerar um token para um usuário válido", async () => {
    const mockUser = { _id: "user123", password: "hashedPassword" };

    useCustomerRepository.mockImplementation(() => ({
      findOneBy: jest.fn().mockResolvedValue(mockUser),
    }));

    useUtils.mockImplementation(() => ({
      isEmpty: jest.fn().mockReturnValue(false),
      isValidHash: jest.fn().mockResolvedValue(true),
    }));

    useAuthConfig.mockImplementation(() => ({
      JWT_SECRET_TOKEN: "teste",
    }));

    jwt.sign.mockImplementation(() => "mockToken");

    const req = {
      body: { email: "validemail@example.com", password: "validPassword" },
    };

    const response = await apiSignIn(req);

    expect(response.token).toBeDefined();
  });

  it("deve lançar um erro se o usuário não estiver cadastrado", async () => {
    useCustomerRepository.mockImplementation(() => ({
      findOneBy: jest.fn().mockResolvedValue(null),
    }));
    useUtils.mockImplementation(() => ({
      isEmpty: jest.fn().mockReturnValue(true),
    }));

    const req = {
      body: { email: "invalidemail@example.com", password: "password" },
    };

    await expect(apiSignIn(req)).rejects.toThrow("Cliente não cadastrado");
  });

  it("deve lançar um erro se a senha estiver incorreta", async () => {
    const mockUser = { _id: "user123", password: "hashedPassword" };
    useCustomerRepository.mockImplementation(() => ({
      findOneBy: jest.fn().mockResolvedValue(mockUser),
    }));
    useUtils.mockImplementation(() => ({
      isEmpty: jest.fn().mockReturnValue(false),
      isValidHash: jest.fn().mockResolvedValue(false),
    }));

    const req = {
      body: { email: "validemail@example.com", password: "invalidPassword" },
    };

    await expect(apiSignIn(req)).rejects.toThrow("Falha na autenticação.");
  });
});
