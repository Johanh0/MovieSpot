// Required
const path = require("path");
const express = require("express");
const chalk = require("chalk");
const app = express();

// PORT
const PORT = process.env.PORT || 3000;

// Path static client directory
app.use(express.static(path.join(__dirname, "../client/public")));

// Main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/public", "html/index.html"));
});

// Routers
const apiRouter = require("./routes/api");

app.use("/api", apiRouter);

// 404 Page
app.get("*", (req, res) => {
  res.send("<h1>404 Page</h1>");
});

app.listen(PORT, () => {
  console.log(chalk.inverse.green(` Server is running in ${PORT} `));
});
