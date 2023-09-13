const express = require("express");
const db = require("../../modules/db");

const router = express.Router();

/*
 * Pour tester:
 * curl -H http://localhost:3000/users
 */
router.get("/", async (request, response) => {
    try {
        const user = await db("user");
        if (!user) {
            return response.status(404)
                .json({ message: "Utilisateur inconnu." });
        }
        const users = user.map((u) => ({
            userId: u.userId,
            email: u.email,
        }));
        return response.status(200)
            .json(users);
    } catch (e) {
        console.log(e.message);
        return response.status(400)
            .json({ message: e.message });
    }
});

module.exports = router;
