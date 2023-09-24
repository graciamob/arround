const express = require("express");
const bcrypt = require("bcryptjs");
const request = require("../database/utilisateurs");

const router = express.Router();

router.post("/", async(req, res) => {
    if (!req.body.username || !req.body.email || !req.body.nom || !req.body.motDePasse) {
            return res.status(400).json({ message: "Paramètre(s) sont manquants" });
    }

    try {
        const utilisateur = {
            username: req.body.username,
            email: req.body.email,
            nom: req.body.nom,
            motDePasse: bcrypt.hashSync(req.body.motDePasse, 10),
            photoProfil: req.body.photoProfil
        };

        const resultat = await request.insertUtilisateur(utilisateur);
        return res.status(200).json(resultat);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    
});

module.exports = router;
