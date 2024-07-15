const globalError = require("./middleware/errorMiddleware");
const ApiError = require("./utils/apiError");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const morgan = require("morgan");
const connectDB = require("./config/database");

// express
const express = require("express");
const app = express();

// routes
const category = require("./routers/categoryRoute");

const port = process.env.PORT || 8000;

// middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`Running in ${process.env.NODE_ENV} mode`);
} else {
  console.log(`Running in ${process.env.NODE_ENV} mode`)
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("E-commerce-v1");
});

app.use("/api/v1/categories/", category);

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find ${req.originalUrl} on this server`, 404));
})

// global error handler
app.use(globalError);

// connect to database
connectDB();

const server = app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

// handle rejection outside express
process.on("unhandledRejection", (error) => {
  console.error(`unhandledRejection Error: ${error.name} | ${error.message}`);
  server.close(() => {
    console.log("Shutting down...");
    process.exit(1);
  })
})