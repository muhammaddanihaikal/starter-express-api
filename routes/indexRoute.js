const express = require("express");
const indexRoute = express.Router();

indexRoute.get("/", (req, res) => {
  res.send(`
    <div>
        <h2>Nama   : Muhammad Dani Haikal</h2>
        <h2>Tim    : BE-8</h2>
        <h2>Mentor : Luthfi Fitra Musyaffa</h2>
    </div>
    `);
});

module.exports = indexRoute;
