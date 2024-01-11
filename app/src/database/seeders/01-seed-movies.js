'use strict';

DATABASE='test';

db = db.getSiblingDB(DATABASE);

// SEED MOVIES
db.movies.insertMany([
  {
    name: "Inception",
    synopsis:
      "Um ladrão que invade os sonhos das pessoas é dado a tarefa de plantar uma ideia na mente de um CEO.",
    rating: "8.8",
  },
  {
    name: "The Matrix",
    synopsis:
      "Um programador de computador aprende a verdade chocante sobre a realidade e seu papel na luta contra seus controladores.",
    rating: "8.7",
  },
  {
    name: "Interstellar",
    synopsis:
      "Uma equipe de exploradores viaja através de um buraco de minhoca no espaço em uma tentativa de garantir a sobrevivência da humanidade.",
    rating: "8.6",
  },
  {
    name: "The Dark Knight",
    synopsis:
      "Batman, com a ajuda do Comissário Gordon e Harvey Dent, tenta desmantelar as organizações criminosas restantes que afligem as ruas de Gotham.",
    rating: "9.0",
  },
  {
    name: "Fight Club",
    synopsis:
      "Um funcionário de escritório insone e um saboneteiro formam um clube de luta subterrâneo que se transforma em algo muito mais.",
    rating: "8.8",
  },
  {
    name: "Pulp Fiction",
    synopsis:
      "As vidas de dois assassinos de aluguel da máfia, um boxeador, um gângster e sua esposa e um par de ladrões de jantar se entrelaçam em quatro histórias de violência e redenção.",
    rating: "8.9",
  },
  {
    name: "Forrest Gump",
    synopsis:
      "A história de um homem com um QI abaixo da média que conseguiu realizar feitos extraordinários em sua vida.",
    rating: "8.8",
  },
  {
    name: "The Shawshank Redemption",
    synopsis:
      "Dois homens presos formam uma ligação ao longo dos anos, encontrando consolo e redenção eventual através de atos de decência comum.",
    rating: "9.3",
  },
  {
    name: "Gladiator",
    synopsis:
      "Um ex-general romano se propõe a se vingar do corrupto imperador que assassinou sua família e o enviou para a escravidão.",
    rating: "8.5",
  },
  {
    name: "The Godfather",
    synopsis:
      "O envelhecido patriarca de uma dinastia do crime organizado transfere o controle de seu império clandestino para seu filho relutante.",
    rating: "9.2",
  },
]);
