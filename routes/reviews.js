const express = require("express");
const request = require("../database/reviews");

const router = express.Router();

router.get("/:idReviews", async(req, res) => {
    const { idReviews } = req.params;
    if (!+(idReviews)) {
        return res.status(400).json({ message: "Paramètre invalide ou manquant." });
    }

    try {
        const resultat = await request.getReviewsParId(idReviews);
        if (!resultat.length) {
            return res.status(404).json({ message: "Le review n'a pas été trouvé." });
        }

        return res.status(200).json(resultat);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get("/lieu/:idLieu", async(req, res) => {
    const { idLieu } = req.params;
    if (idLieu == "") {
        return res.status(400).json({ message: "Paramètre invalide ou manquant." });
    }
    try {
        const resultat = await request.getReviewsParLieu(idLieu);
        if (!resultat.length) {
            return res.status(404).json({ message: "Le lieu est introuvable." });
        }

        return res.status(200).json(resultat);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get("/utilisateur/:idUtilisateur", async(req, res) => {
    const { idUtilisateur } = req.params;
    if (!+(idUtilisateur)) {
        return res.status(400).json({ message: "Paramètre invalide ou manquant." });
    }

    try {
        const resultat = await request.getReviewsUtilisateur(idUtilisateur);
        if (!resultat.length) {
            return res.status(404).json({ message: "L'utilisateur n'a pas publié de reviews." });
        }

        return res.status(200).json(resultat);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post("/", async(req, res) => {
    if (!req.body.date || !req.body.idUtilisateur || !req.body.idLieu || !req.body.commentaire
        || !req.body.note || !req.body.username || !req.body.nomLieu) {
        return res.status(400).json({ message: "Paramètre(s) sont manquants" });
    }

    try {
        const review = {
            date: req.body.date,
            idUtilisateur: req.body.idUtilisateur,
            idLieu: req.body.idLieu,
            commentaire: req.body.commentaire,
            note: req.body.note,
            photo: req.body.photo,
            username: req.body.username,
            nomLieu: req.body.nomLieu
        };

        const resultat = await request.insertReview(review);
        return res.status(200).json(resultat[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.put("/username/:oldUsername/:newUsername", async(req, res) => {
    const { oldUsername, newUsername } = req.params;

    try {
        const userReview = await request.getReviewsParUsername(oldUsername);
        if (!userReview.length) {
            return res.status(404).json({ message: "L'utilisateur n'a pas publié de reviews." });
        }
        
        const resultat = await request.updateUsernameReview(oldUsername, newUsername);
        return res.status(200).json(resultat[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.delete("/:idReviews", async(req, res) => {
    const { idReviews } = req.params;
    if (!+(idReviews)) {
        return res.status(400).json({ message: "Paramètre invalide ou manquant." });
    }

    try {
        const review = await request.getReviewsParId(idReviews);
        if (!review.length) {
            return res.status(404).json({ message: "Le review n'a pas été trouvé." });
        }

        await request.deleteReview(idReviews);
        return res.status(200).json({ message: "Le review a été supprimé." });
    } catch(error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
