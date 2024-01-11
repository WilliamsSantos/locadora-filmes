const useUtils = require("general/utils");
const useCustomerRepository = require("modules/customer/customerRepository");
const apiSignUp = require("modules/authentication/services/signUp");

jest.mock("general/utils");
jest.mock("modules/customer/customerRepository");

describe("Testes de cadastro de cliente", () => {
  it("deve cadastrar um cliente com sucesso", async () => {
    // Mock do repositório e das utils
    const mockCustomer = { id: "customer123", nome: "Cliente Teste" };
    useCustomerRepository.mockImplementation(() => ({
      store: jest.fn().mockResolvedValue(mockCustomer),
    }));
    useUtils.mockImplementation(() => ({
      generateHashFrom: jest.fn().mockResolvedValue("hashedPassword"),
      getIP: jest.fn().mockReturnValue("127.0.0.1"),
    }));

    const req = { 
      body: { 
        nome: "Cliente Teste", 
        email: "teste@example.com", 
        password: "senha123" 
      } 
    };
    const response = await apiSignUp(req);

    expect(response).toEqual(mockCustomer);
  });

  it("deve lançar um erro se falhar ao salvar o cliente", async () => {
    // Mock do repositório para simular falha no salvamento
    useCustomerRepository.mockImplementation(() => ({
      store: jest.fn().mockResolvedValue(null),
    }));
    useUtils.mockImplementation(() => ({
      generateHashFrom: jest.fn().mockResolvedValue("hashedPassword"),
      getIP: jest.fn().mockReturnValue("127.0.0.1"),
    }));

    const req = { 
      body: { 
        nome: "Cliente Teste", 
        email: "teste@example.com", 
        password: "senha123" 
      } 
    };

    await expect(apiSignUp(req)).rejects.toThrow(`Falha ao salvar o usuário.`);
  });
});
