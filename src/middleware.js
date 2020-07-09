const { isUuid } = require("uuidv4");

const serverLog = (request, response, next) => {
  const { method, url } = request;
  const logLabel = `[${method}] ${url} ⏱`;

  console.time(logLabel);

  next();

  console.timeEnd(logLabel);
};

const validateProjetId = (request, response, next) => {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({ error: "Invalid repository ID." });
  }

  return next();
};

module.exports = { serverLog, validateProjetId };
