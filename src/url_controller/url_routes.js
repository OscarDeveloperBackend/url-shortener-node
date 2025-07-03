const url_json = require("../json/urls.json");
const fs = require("fs");
const path = require("path");
const https = require("node:https");
const http = require("node:http");
function generarCodigo(tamaño) {
  const caracteres =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let resultado = "";

  for (let i = 0; i < tamaño; i++) {
    const indice = Math.floor(Math.random() * caracteres.length);
    resultado += caracteres[indice];
  }

  return resultado;
}

function urlExists(url) {
  return new Promise((resolve) => {
    const lib = url.startsWith("https") ? https : http;

    const req = lib.request(url, { method: "HEAD" }, (res) => {
      resolve(res.statusCode >= 200 && res.statusCode < 400);
    });

    req.on("error", () => resolve(false));
    req.end();
  });
}

const getData = (req, res) => {
  try {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(url_json));
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: error.message }));
  }
};

const redirectUrl = (req, res) => {
  try {
    const url = req.url;
    const url_r = url.split("/")[2];
    const m_url = url_json.find((u) => u.url_recortada === url_r);
    if (m_url) {
      const url_redirect = m_url.url_base;
      res.writeHead(301, { Location: url_redirect });
      res.end();
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ message: `Url recoratda: ${url}  es incorecta` })
      );
    }
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: error.message }));
  }
};

const postUrl = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    try {
      const { url_base } = JSON.parse(body);

      const exists = await urlExists(url_base);

      if (!exists) {
        return res
          .writeHead(404, { "Content-Type": "application/json" })
          .end(JSON.stringify({ error: "La URL proporcionada no existe." }));
      }

      const m_url = url_json.find((u) => u.url_base === url_base);

      if (m_url) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            url_recortada: `http://localhost:3000/redict/${m_url.url_recortada}`,
          })
        );
      } else {
        let url_recortada;
        while (true) {
          url_recortada = generarCodigo(4);
          const rest = url_json.find((u) => u.url_recortada === url_recortada);
          if (!rest) {
            break;
          }
        }
        const newUrl = {
          url_base: url_base,
          url_recortada: url_recortada,
        };
        url_json.push(newUrl);

        fs.writeFile(
          path.join(__dirname, "../json/urls.json"),
          JSON.stringify(url_json, null, 2),
          (err) => {
            if (err) {
              res.writeHead(500, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify({ message: "Ubo un error al guardar los datos" })
              );
            } else {
              res.writeHead(201, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify({
                  url_recortada: `http://localhost:3000/redict/${url_recortada}`,
                })
              );
            }
          }
        );
      }
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: error.message }));
    }
  });
};

const urlNoExist = (res, code = 404, message = "La URL no existe") => {
  res.writeHead(code, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message }));
};

module.exports = {
  getData,
  urlNoExist,
  redirectUrl,
  postUrl,
};
