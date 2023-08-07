import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./models/config/db.js";
import todoRoute from "./routes/todoRoute.js";

//configure env
dotenv.config();

//database config
connectDB();

// rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/todo", todoRoute);

//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome todo app simple</h1>");
});

// PORT
const PORT = process.env.PORT || 5000;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server running on ${process.env.DEV} mode on port ${PORT}`.bgCyan.black
  );
});
