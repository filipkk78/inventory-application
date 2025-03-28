const express = require("express");
const app = express();
const path = require("node:path");
const gamesRouter = require("./routes/gamesRouter.js");
const genresRouter = require("./routes/genresRouter.js");
const newRouter = require("./routes/newRouter.js");
const updateRouter = require("./routes/updateRouter.js");
const deleteRouter = require("./routes/deleteRouter.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use("/games", gamesRouter);
app.use("/genres", genresRouter);
app.use("/new", newRouter);
app.use("/update", updateRouter);
app.use("/delete", deleteRouter);
app.use("/", (req, res) => res.redirect("/games"));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Inventory app running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});
