require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

// Environment variables
const PORT = process.env.PORT || 9480;

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/Recipes";

// CORS Configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost/5173",
  optionsSuccessStatus: 200,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

// Middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "client", "build")));

// MongoDB Connection
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB: ", err));

// Routes
const authRouter = require("./routes/authRouter.js");
const mealsRouter = require("./routes/mealsRouter.js");
const commentsRouter = require("./routes/commentsRouter.js");
const recipeRouter = require("./routes/recipeRouter.js"); // Added for recipe API integration
app.use("/auth", authRouter);
app.use("/api/meals", mealsRouter);
app.use("/api/recipe", recipeRouter);
app.use("/api/comment", commentsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  const statusCode = err.status || 500;
  res.status(statusCode).send({ errMsg: err.message });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
