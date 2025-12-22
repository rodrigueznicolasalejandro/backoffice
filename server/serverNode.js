const path = require("path");
const fs = require("fs");

const express = require("express");
const cors = require("cors");

const { URL } = require("url");

const app = express();
const PORT = 3500;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const baseApiPath = "/backoffice-bff";
const MS_BUNDLES_BASE_URL = "https://ms-bundles.d.adq.redlink-aws/ms-bundles";
const MS_SERVICES_CATALOG_URL =
  "https://ms-services-catalog.d.adq.redlink-aws/ms-services-catalog";

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.type("application/json");
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(500)
    .json({ success: false, message: "Error interno del servidor." });
});

function proxyExternalGet(externalUrl) {
  return (req, res, next) => {
    const https = require("https");
    const urlObj = new URL(externalUrl);
    for (const [key, value] of Object.entries(req.query)) {
      urlObj.searchParams.append(key, value);
    }
    https
      .get(urlObj.toString(), (apiRes) => {
        let data = "";
        apiRes.on("data", (chunk) => {
          data += chunk;
        });
        apiRes.on("end", () => {
          res.status(apiRes.statusCode).send(data);
        });
      })
      .on("error", (err) => {
        next(err);
      });
  };
}

app.get(
  `${baseApiPath}/api/v1/catalog-services`,
  proxyExternalGet(`${MS_SERVICES_CATALOG_URL}/api/v1/catalog-services`)
);

app.get(
  `${baseApiPath}/api/v1/merchant-categories`,
  proxyExternalGet(`${MS_BUNDLES_BASE_URL}/api/v1/mcc`)
);

app.get(
  `${baseApiPath}/api/v1/business-sizes`,
  proxyExternalGet(`${MS_BUNDLES_BASE_URL}/api/v1/business-sizes`)
);

// Mock endpoints
app.get(`${baseApiPath}/api/v1/products`, (req, res) => {
  const mockPath = path.join(__dirname, "mock", "products_v1.json");
  fs.readFile(mockPath, "utf8", (err, response) => {
    if (err) {
      res
        .status(500)
        .json({ success: false, message: "No se pudo leer el mock." });
    } else {
      res.send(response);
    }
  });
});

app.get(`${baseApiPath}/api/v0/products`, (req, res) => {
  const mockPath = path.join(__dirname, "mock", "products.json");
  fs.readFile(mockPath, "utf8", (err, response) => {
    if (err) {
      res
        .status(500)
        .json({ success: false, message: "No se pudo leer el mock." });
    } else {
      res.send(response);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
