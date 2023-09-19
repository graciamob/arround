const express = require("express");
const request = require("../database/categories");

const router = express.Router();

router.get("/", async(req, res) => {
    let resultat;
    try {
        resultat = await request.getCategoriesAll();
    } catch(error) {
        res.status(500).json({ message: error.message });
    }

    return res.status(200).json(resultat);
});

module.exports = router;
