require("dotenv").config();
const http = require("http");
const app = require("./app");
const config = require("../config/default");
const logger = require("./utils/logger");

const port = config.app.port || 3000;

const server = http.createServer(app);

server.listen(port, () => {
  logger.info("Serveur démarré sur le port " + port);
});
