const { isUuid } = require("uuidv4");

const serverLog = (request, response, next) => {
  const { method, url } = request;
  const logLabel = `[${method}] ${url}`;

  console.time(logLabel);

  next();

  console.timeEnd(logLabel);
};

const validateProjetId = (request, response, next) => {};

module.exports = { serverLog, validateProjetId };
