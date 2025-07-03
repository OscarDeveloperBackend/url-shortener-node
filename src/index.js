const http = require("node:http");
const PORT = process.env.PORT ?? 3000;

const fn = require("./url_controller/url");

const server = http.createServer(fn);

server.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
});
