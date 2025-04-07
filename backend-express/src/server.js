const express = require("express");
const app = express();
require("./config/db");
const cors = require("cors");
const morgan = require("morgan");
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/auth", require("./routes/auth"));

app.use((err, req, res, next) => {
  console.log("err: ", err);
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error"
  });
});

app.listen(port, () => {
  console.log(`Server running on port: http://localhost:${port}.`);
});
