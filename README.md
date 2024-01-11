DOCUMENTAÇÃO COM OS ENDPOINTS DISPONIVEL

> https://documenter.getpostman.com/view/7576191/2s9YsM8qU4

<center><h2> 
Aplicação de aluguel de Filmes:
</h2></center>

> api para locação de filmes (mídia física) devemos assumir que nossa locadora só
> tem um exemplar de cada filme, é possível realizar a reserva online e retirar o filme na locadora.

## Inicializando o projeto

Para iniciar o projeto, na raiz rode:

```
docker-compose up -d
```

Você pode testar a aplicação com:

```
http://localhost:3000/api/v1/ping-pong
```

> A resposta deve ser um Pong..

## Stacks

- Mongo
- Express
- NodeJS LTS (18)
- Jest
- Docker
- MongoExpress
- Redis

## Database

Ao subir os containers, você poderá acompanhar as alterações no banco de dados através da ferramenta <b>mongo-express</b> na url:

```
http://localhost:8081/db/test
```

## Tests

Para rodar os testes execute:

```
docker-compose -exec npm run test
```

## Autenticação

A API possui uma autenticação simples JWT.

### Para cadastrar um cliente:

```curl
POST: http://localhost:3000/api/v1/register
```

```json
{
  "name": "Cliente",
  "email": "usuario@customer.com",
  "password": "123456",
  "phone": "82987087323"
}
```

### Para cadastrar um Admin:

```json
{
  "name": "JonDoe admin",
  "email": "usuario@admin.com",
  "password": "123456",
  "phone": "82987087333",
  "is_admin": true
}
```

- Usuários admin podem <b>reservar filmes</b>, <b>confirmar reserva</b> e <b>Confirmar devoluções</b>
- Usuários comuns, ou não autenticados podem listar filmes, e listar um filme pelo id

### Para fazer o login:

```curl
POST: http://localhost:3000/api/v1/login
```

```json
{
  "email": "usuario@admin.com",
  "password": "123456"
}
```

### Response:

```json
{
  "status": 200,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTlmNGFmYzFmNWU4NTBiNWRmNTZmMzAiLCJuYW1lIjoiSm9uRG9lIGFkbWluIiwiZW1haWwiOiJ1c3VhcmlvQGFkbWluLmNvbSIsImlzX2FkbWluIjp0cnVlLCJpYXQiOjE3MDQ5MzgyNTUsImV4cCI6MTcwNDk1NjI1NX0.WiHphP86AJHaUkURGw6DmQOLkpSkwjgb8EYGPfj-3hc"
  }
}
```

> Utilize o token gerado para poder realizar as operações de locação e etc.

Exemplo:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTlmNGFmYzFmNWU4NTBiNWRmNTZmMzAiLCJuYW1lIjoiSm9uRG9lIGFkbWluIiwiZW1haWwiOiJ1c3VhcmlvQGFkbWluLmNvbSIsImlzX2FkbWluIjp0cnVlLCJpYXQiOjE3MDQ5MzgyNTUsImV4cCI6MTcwNDk1NjI1NX0.WiHphP86AJHaUkURGw6DmQOLkpSkwjgb8EYGPfj-3hc
```

# Endpoints da aplicação:

## Endpoints de filmes

```
GET: http://localhost:3000/api/v1/movies
```

```json
{
    "status": 200,
    "data": [
        {
            "_id": "659f497771a0c9a8d9b70e82",
            "name": "nome do filme 00",
            "synopsis": "sinopse exemplo 1",
            "rating": 0.1,
            "release_date": "2024-12-10T00:00:00.000Z",
            "genre": "22",
            "is_active": true,
            "status": "available",
            "createdAt": "2024-01-11T01:50:47.821Z",
            "updatedAt": "2024-01-11T02:08:07.742Z",
            "__v": 0
        },
    ...
    ]
}
```

Criar um Filme:

```
POST: http://localhost:3000/api/v1/movies
```

payload

```json
{
  "name": "Filme de exemplo 3",
  "synopsis": "sinopse exemplo 3",
  "rating": 0.1,
  "release_date": "2024-12-10",
  "genre": "terror"
}
```

response:

```json
{
  "name": "nome do filme",
  "synopsis": "sinopse exemplo",
  "rating": 9,
  "releaseDate": "2024-12-10T00:00:00.000Z",
  "genre": "horror",
  "available": true,
  "_id": "659e0cff71042857cf9fcc44",
  "createdAt": "2024-01-10T03:20:31.282Z",
  "updatedAt": "2024-01-10T03:20:31.282Z",
  "__v": 0
}
```

Edita um Filme:

```
PUT: http://localhost:3000/api/v1/movies
```

payload

> As propriedades nesse caso são opcionais, só sera atualizado a propriedade passada

```json
{
  "name": "nome do filme",
  "synopsis": "sinopse exemplo",
  "rating": 9.0,
  "releaseDate": "2024-12-10",
  "genre": "horror"
}
```

response:

```json
{
  "status": 200,
  "data": {
    "_id": "659f497771a0c9a8d9b70e82",
    "name": "nome do filme 00",
    "synopsis": "sinopse exemplo 1",
    "rating": 0.1,
    "release_date": "2024-12-10T00:00:00.000Z",
    "genre": "22",
    "is_active": true,
    "status": "available",
    "createdAt": "2024-01-11T01:50:47.821Z",
    "updatedAt": "2024-01-11T01:53:14.231Z",
    "__v": 0
  }
}
```

Retorna 1 filme pelo id:

```
GET: http://localhost:3000/api/v1/movies/:id
```

response

```json
{
  "status": 200,
  "data": {
    "name": "Filme de exemplo 3",
    "synopsis": "sinopse exemplo 3",
    "rating": 0.1,
    "release_date": "2024-12-10T00:00:00.000Z",
    "genre": "terror",
    "is_active": true,
    "status": "available"
  }
}
```

# Endpoints da reservas:

#### Reserva um filme:

> obs: apenas usuários admin podem reservar um filme para um cliente.

```
POST: http://localhost:3000/api/v1/book
```

payload

```json
{
  "movie_id": "659f497771a0c9a8d9b70e82",
  "customer_id": "659f4a4e71a0c9a8d9b70e90"
}
```

> Observe que é passado um <b>customer_id</b> para justificar a reserva de um filme.

- A reserva só poderá ser feita para clientes previamente cadastrados.

resposta:

```json
{
  "status": 200,
  "data": {
    "reservation_id": "659f4c931f5e850b5df56f43",
    "status": "waiting"
  }
}
```

- O filme permanecerá com o status "waiting" (esperando retirada), por até 3h e o filme será removido da lista de filmes, até ficar disponivel novamente.

- Caso o tempo expire o status será alterado para 'expired' (reserva expirada) e o filme voltara a ficar como available

#### Para Confirmando a reserva do Filme(cliente retirou na locadora):

> obs: apenas usuários admin podem confirmar a retirada.

```
POST: http://localhost:3000/api/v1/book/:id/confirm
```

> é necessário passar os dados do cliente para confirmar que a reserva foi feita pelo cliente informado.

payload:

```json
{
  "customer": {
    "name": "JonDoe",
    "email": "usuario@comum.com",
    "phone": "82987787320"
  }
}
```

response:

```json
{
  "status": 200,
  "data": {
    "schedule_id": "659f219645cc77722e9e551b",
    "status": "leased"
  }
}
```

> o schedule_id é o id da reserva que deve ser usado para devolução (o schedule_id, é o mesmo que booking_id)

<i>obs: caso o filme já tenha sido reservado a seguinte mensagem será exibida</i>

```json
{
  "status": 500,
  "error": "Filme já reservado."
}
```

<i>obs: caso a reserva já tenha expirado a seguinte mensagem aparecerá</i>

```json
{
  "status": 500,
  "error": "Reserva expirada."
}
```

#### Para confirmar o retorno do cliente

> confirmando o retorno do cliente, o status de reserva será alterado de <b>leased</b> para <b>returned</b>. E o Filme voltará para a lista de dispinívels para locação.

```
POST: http://localhost:3000/api/v1/book/:id/return
```

reponse:

```json
{
  "schedule_id": "659f219645cc77722e9e551b",
  "status": "returned"
}
```
