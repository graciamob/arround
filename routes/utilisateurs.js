const express = require("express");
const request = require("../database/utilisateurs");

const router = express.Router();

router.get("/", async(req, res) => {

    let resultat;
    try {
        resultat = await request.getUtilisateursAll();
    } catch(error) {
        res.status(500).json({ message: error.message });
    }

    return res.status(200).json(resultat);
});

router.get("/:idUtilisateur", async(req, res) => {

    let resultat;
    try {
        resultat = await request.getUtilisateur(req.params.idUtilisateur);
    } catch(error) {
        res.status(500).json({ message: error.message });
    }

    return res.status(200).json(resultat);
});

router.post("/inscription", async(req, res) => {

    if (req.body.username === null)

    return res.status(200).json(resultat);
});

module.exports = router;
