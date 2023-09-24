const express = require("express");
const bcrypt = require("bcrypt");
const request = require("../database/utilisateurs");

const router = express.Router();

router.get("/", async(req, res) => {
    try {
        const resultat = await request.getUtilisateursAll();
        return res.status(200).json(resultat);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get("/:idUtilisateur", async(req, res) => {
    const { idUtilisateur } = req.params;
    if (!+(idUtilisateur)) {
        return res.status(400).json({ message: "Paramètre invalide ou manquant." });
    }
    try {
        const resultat = await request.getUtilisateur(idUtilisateur);
        if (!resultat.length) {
            return res.status(404).json({ message: "L'utilisateur n'a pas été trouvé." });
        }

        return res.status(200).json(resultat);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.put("/:idUtilisateur", async(req, res) => {
    const { idUtilisateur } = req.params;
    if (!+(idUtilisateur)) {
        return res.status(400).json({ message: "Paramètre invalide ou manquant." });
    }

    try {
        const user = await request.getUtilisateur(idUtilisateur);
        if (!user.length) {
            return res.status(404).json({ message: "L'utilisateur n'a pas été trouvé." });
        }

        const utilisateur = {
            username: req.body.username,
            email: req.body.email,
            nom: req.body.nom,
            motDePasse: bcrypt.hashSync(req.body.motDePasse, 10),
            photoProfil: req.body.photoProfil
        };
        
        const resultat = await request.updateUtilisateur(utilisateur, idUtilisateur);
        return res.status(200).json(resultat);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.delete("/:idUtilisateur", async(req, res) => {
    const { idUtilisateur } = req.params;
    if (!+(idUtilisateur)) {
        return res.status(400).json({ message: "Paramètre invalide ou manquant." });
    }

    try {
        const user = await request.getUtilisateur(idUtilisateur);
        if (!user.length) {
            return res.status(404).json({ message: "L'utilisateur n'a pas été trouvé." });
        }

        const resultat = await request.deleteUtilisateur(idUtilisateur);
        return res.status(200).json(resultat);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
