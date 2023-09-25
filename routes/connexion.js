const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const request = require("../database/utilisateurs");

const router = express.Router();

router.post("/", async(req, res) => {
    const { email, motDePasse } = req.body;
    if (!email || !motDePasse) {
        return res.status(400).json({ message: "Paramètre(s) sont manquants." });
    }

    try {
        const user = await request.getUtilisateurParEmail(email);
        if (!user.length || !bcrypt.compareSync(motDePasse, user[0].motDePasse)) {
            return res.status(404).json({ message: "Courriel ou mot de passe incorrect." });
        }

        const expiresIn = 1800;
        const accessToken = jwt.sign(
            { identifiant: user.idUtilisateur },
            process.env.TOKEN_KEY,
            { expiresIn },
        );
        req.session.token = accessToken;
        return res.status(200).json({ token: accessToken });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
