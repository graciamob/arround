const express = require("express");
const request = require("../database/favoris");

const router = express.Router();

router.get("/utilisateur/:idUtilisateur", async (req, res) => {
    const { idUtilisateur } = req.params;
    if (!+(idUtilisateur)) {
        return res.status(400).json({ message: "Paramètre invalide ou manquant." });
    }
    try {
        const resultat = await request.getFavorisUtilisateur(idUtilisateur);
        if (!resultat.length) {
            return res.status(404).json({ message: "Cet utilisateur n'a pas de favoris." });
        }

        return res.status(200).json(resultat);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get("/utilisateur/:idUtilisateur/lieu/:idLieu", async (req, res) => {
    const { idUtilisateur, idLieu } = req.params;
    if (!+(idUtilisateur) || idLieu == "") {
        return res.status(400).json({ message: "Paramètres invalides ou manquant." });
    }
    try {
        const resultat = await request.getFavoriPlaceUtilisateur(idUtilisateur, idLieu);
        if (!resultat.length) {
            return res.status(404).json({ favori: false });
        }

        return res.status(200).json({ favori: true, idFavoris: resultat[0].idFavoris });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post("/", async (req, res) => {
    if (!req.body.idUtilisateur || !req.body.idLieu || !req.body.nomLieu || req.body.photoReference) {
        return res.status(400).json({ message: "Paramètre(s) sont manquants" });
    }

    try {
        const favori = {
            idUtilisateur: req.body.idUtilisateur,
            idLieu: req.body.idLieu,
            nomLieu: req.body.nomLieu,
            photoReference: req.body.photoReference
        };

        const resultat = await request.insertFavori(favori);
        return res.status(200).json(resultat[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.delete("/:idFavoris", async (req, res) => {
    const { idFavoris } = req.params;
    if (!+(idFavoris)) {
        return res.status(400).json({ message: "Paramètre invalide ou manquant." });
    }

    try {
        const review = await request.getFavoriParId(idFavoris);
        if (!review.length) {
            return res.status(404).json({ message: "Le favori n'a pas été trouvé." });
        }

        await request.deleteFavori(idFavoris);
        return res.status(200).json({ message: "Le favori a été supprimé." });
    } catch(error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
