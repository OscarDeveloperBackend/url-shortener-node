const { getData, urlNoExist, redirectUrl, postUrl } = require("./url_routes");

const controllerUrl = (req, res) => {
  // Obtener todos los datos del archivo .json
  if (req.url === "/" && req.method === "GET") {
    return getData(req, res);
  }
  // Redireccionar a la URL original
  if (req.url.startsWith("/redict/") && method === "GET") {
    return redirectUrl(req, res);
  }
  // Generar una nueva URL acortada
  if (req.url === "/" && req.method === "POST") {
    return postUrl(req, res);
  }
  // Ruta no encontrada
  return urlNoExist(res);
};

module.exports = controllerUrl;
