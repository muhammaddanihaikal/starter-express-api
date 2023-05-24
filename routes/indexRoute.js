const express = require("express");
const indexRoute = express.Router();

indexRoute.get("/", (req, res) => {
  res.json({
    nama: "Muhammad Dani Haikal",
    tim: "BE-8",
    mentor: "Luthfi Fitra Musyaffa",
  });
});

module.exports = indexRoute;
