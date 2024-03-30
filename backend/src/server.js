const express = require("express");
const cors = require("cors");
var morgan = require("morgan");
const dotenv = require("dotenv");
const userRouters = require("./routers/user.router.js");
const dbconnect = require("./config/database.config.js");
dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT;

//database connection
dbconnect();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5175"],
  })
);

// log http
app.use(morgan("dev"));

//API end points
app.use("/api/user", userRouters);

//Internal Error Handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message =
    err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

app.listen(PORT, () => {
  console.log(`Serving on ${PORT}`);
});
