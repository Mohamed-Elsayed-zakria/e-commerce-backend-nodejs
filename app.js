const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const morgan = require("morgan");

const category = require("./routers/categoryRoute");
const app = express();

// middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`Running in ${process.env.NODE_ENV} mode`);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/categories/", category);

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("E-commerce-v1");
});

mongoose
  .connect(process.env.DATABASE)
  .then((connect) => {
    console.log(
      `DB connected successfully \nhost -> ${connect.connection.host}`
    );
  })
  .catch((error) => {
    console.error(`Database Error: ${error.message}`);
    process.exit(1);
  });

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
