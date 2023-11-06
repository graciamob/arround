const express = require("express");
require("dotenv").config();

const app = express();
const cors = require("cors");
const auth = require("./modules/auth-middleware");

const PORT = process.env.PORT || 3000;
const utilisateursRouter = require("./routes/utilisateurs");
const categoriesRouter = require("./routes/categories");
const photosRouter = require("./routes/photos");
const reviewsRouter = require("./routes/reviews");
const connexionRouter = require("./routes/connexion");
const inscriptionRouter = require("./routes/inscription");
const favorisRouter = require("./routes/favoris");

app.use(express.static("public"));
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/connexion", connexionRouter);
app.use("/inscription", inscriptionRouter);
app.use("/utilisateurs", auth, utilisateursRouter);
app.use("/categories", auth, categoriesRouter);
app.use("/photos", auth, photosRouter);
app.use("/reviews", auth, reviewsRouter);
app.use("/favoris", auth, favorisRouter);

app.listen(PORT, () => {
    console.log(`L'API peut maintenant recevoir des requêtes: http://localhost:${PORT}`);
});

