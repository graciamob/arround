const express = require("express");
const db = require("../../modules/db");

const router = express.Router();

/*
 * Pour tester:
 * curl -H "Authorization: Bearer TOKEN" http://localhost:3000/user
 */
router.get("/", async (request, response) => {
    try {
        const user = await db("user")
            .where("userId", request.user.userId)
            .first();
        if (!user) {
            return response.status(404)
                .json({ message: "Utilisateur inconnu." });
        }
        const userDetails = {
            userId: user.userId,
            email: user.email,
        };
        return response.status(200)
            .json(userDetails);
    } catch (e) {
        console.log(e.message);
        return response.status(400)
            .json({ message: e.message });
    }
});

module.exports = router;
