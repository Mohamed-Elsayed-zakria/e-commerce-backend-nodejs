const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

const app = express();

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("E-commerce-v1");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
