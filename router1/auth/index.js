const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../../modules/db");

const router = express.Router();

const secret = "dgjkgevuyetggvdghdfhegchgjdg,dvbmdghkdvghmdvhmshmg";

/*
 * Pour tester:
   curl -X POST -H "Content-Type: application/json" -d ""{"email": "bluis@email.com", "password": "allo"}"" http://localhost:3000/auth/token
 */
router.post("/token/", async (request, response) => {
    // 1. la requête va comporter deux paramtères importants: identifiant (email) + mot de passe
    try {
        const {
            email,
            password,
        } = request.body;

        if (!email || !password) {
            return response.status(400)
                .json({ message: "email et password doivent être dans le body." });
        }
        // 2. Est-ce que l'utilisateur existe?
        const user = await db("user")
            .where("email", email)
            .first();
        if (!user) {
            return response.status(401)
                .json({ message: "Login invalide." });
        }

        // 3. Est-ce que c'est le bon mot de passe?
        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            return response.status(401)
                .json({ message: "Login invalide." });
        }

        // définir les informations à encoder dans le jeton
        const claims = {
            userId: user.userId,
            email: user.email,
        };

        // 4. Si oui aux deux dernières questions, je vais créer le token et l'envoyer à l'utilisateur.
        const token = jwt.sign(claims, secret);

        return response.status(200)
            .json({ token });
    } catch (e) {
        return response.status(400).json({ message: e.message });
    }
});

module.exports = router;
