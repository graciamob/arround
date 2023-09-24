const express = require("express");
const request = require("../database/categories");

const router = express.Router();

router.get("/", async(req, res) => {
    try {
        const resultat = await request.getCategoriesAll();
        return res.status(200).json(resultat);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get("/:idCategorie", async(req, res) => {
    const { idCategorie } = req.params;
    if (!+(idCategorie)) {
        return res.status(400).json({ message: "Paramètre invalide ou manquant." });
    }
    try {
        const resultat = await request.getCategorieParId(idCategorie);
        if (!resultat.length) {
            return res.status(404).json({ message: "Cette catégorie n'existe pas." });
        }

        return res.status(200).json(resultat);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
