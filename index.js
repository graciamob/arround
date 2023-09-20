const express = require("express");
require("dotenv").config();

const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const utilisateursRouter = require("./routes/utilisateurs");
const categoriesRouter = require("./routes/categories");
const photosRouter = require("./routes/photos");
const reviewsRouter = require("./routes/reviews");

app.use(express.static("public"));
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/utilisateurs", utilisateursRouter);
app.use("/categories", categoriesRouter);
app.use("/photos", photosRouter);
app.use("/reviews", reviewsRouter);

app.listen(PORT, () => {
    console.log(`L'API peut maintenant recevoir des requêtes: http://localhost:${PORT}`);
});

