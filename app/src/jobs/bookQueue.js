"use strict";

const Queue = require("bull");
const checkExpiredBooks = require("./verifyExpiredLocationMovies");

const bookQueue = new Queue("book-processing", {
  redis: { host: process.env.REDIS_HOST, port: process.env.REDIS_PORT },
});

bookQueue.add(
  { myData: "book-processing" },
  { repeat: { cron: "*/1 * * * *" } }
);

bookQueue.process(async () => {
  await checkExpiredBooks();
});

module.exports = bookQueue;
