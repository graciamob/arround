const express = require("express");
const request = require("../database/reviews");

const router = express.Router();

router.get("/:idLieu", async(req, res) => {

    let resultat;
    try {
        resultat = await request.getReviewsParLieu(req.params.idLieu);
    } catch(error) {
        res.status(500).json({ message: error.message });
    }

    return res.status(200).json(resultat);
});

router.get("/:idUtilisateur", async(req, res) => {

    let resultat;
    try {
        resultat = await request.getReviewsUtilisateur(req.params.idUtilisateur);
    } catch(error) {
        res.status(500).json({ message: error.message });
    }

    return res.status(200).json(resultat);
});

router.get("/:idReview", async(req, res) => {

    let resultat;
    try {
        resultat = await request.getReviewsParId(req.params.idReview);
    } catch(error) {
        res.status(500).json({ message: error.message });
    }

    return res.status(200).json(resultat);
});

module.exports = router;
