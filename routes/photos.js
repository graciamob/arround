const express = require("express");
const request = require("../database/photos");

const router = express.Router();

router.get("/:idPhoto", async(req, res) => {
    const { idPhoto } = req.params;
    if (!+(idPhoto)) {
        return res.status(400).json({ message: "Paramètre invalide ou manquant." });
    }
    try {
        const resultat = await request.getPhotoParId(idPhoto);
        if (!resultat.length) {
            return res.status(404).json({ message: "La photo n'a pas été trouvée." });
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
        const resultat = await request.getUtilisateur(idUtilisateur);
        if (!resultat.length) {
            return res.status(404).json({ message: "Cet utilisateur n'a pas de photos." });
        }

        return res.status(200).json(resultat);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.get("/utilisateur/:idUtilisateur/lieu/:idLieu", async(req, res) => {
    const { idUtilisateur, idLieu } = req.params;
    if (!+(idUtilisateur) || !+(idLieu)) {
        return res.status(400).json({ message: "Paramètre(s) invalide ou manquant." });
    }
    try {
        const resultat = await request.getPhotosParLieu(idUtilisateur, idLieu);
        if (!resultat.length) {
            return res.status(404).json({ message: "Ce lieu n'a pas de photos." });
        }

        return res.status(200).json(resultat);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post("/", async(req, res) => {
    if (!req.body.idUtilisateur || !req.body.date || !req.body.idLieu || !req.body.photoURL) {
        return res.status(400).json({ message: "Paramètre(s) sont manquants" });
}

try {
    const photo = {
        idUtilisateur: req.body.idUtilisateur,
        date: req.body.date,
        idLieu: req.body.idLieu,
        photoURL: req.body.photoURL
    };

    const resultat = await request.insertPhoto(photo);
    return res.status(200).json(resultat);
} catch (error) {
    return res.status(500).json({ message: error.message });
}
});

router.delete("/:idPhoto", async(req, res) => {
    const { idPhoto } = req.params;
    if (!+(idPhoto)) {
        return res.status(400).json({ message: "Paramètre invalide ou manquant." });
    }

    try {
        const review = await request.getPhotoParId(idPhoto);
        if (!review.length) {
            return res.status(404).json({ message: "La photo n'a pas été trouvée." });
        }

        const resultat = await request.deletePhoto(idPhoto);
        return res.status(200).json(resultat);
    } catch(error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;