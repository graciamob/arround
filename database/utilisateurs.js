const knexModule = require("knex");
const dbConnection = require("../modules/db");

const knex = knexModule(dbConnection);

// fonctions get
function getUtilisateursAll(){
    return knex("Utilisateurs");
}

function getUtilisateur(idUtilisateur){
    return knex("Utilisateurs")
    .where("idUtilisateur", idUtilisateur);
}

function getUtilisateurParEmail(email){
    return knex("Utilisateurs")
    .where("email", email);
}

// fonctions d'ajout
function insertUtilisateur(utilisateur){
    return knex("Utilisateurs")
    .insert(utilisateur)
    .returning("*");
}

// fonctions de modification
function updateUtilisateur(utilisateur, idUtilisateur){
    return knex("Utilisateurs")
    .where("idUtilisateur", idUtilisateur)
    .update(utilisateur)
    .returning("*");
}

// fonctions de suppression
async function deleteUtilisateur(idUtilisateur){
    return knex("Utilisateurs")
    .where("idUtilisateur", idUtilisateur)
    .del();
}
/*
const admin = require("firebase-admin");

const bucket = admin.storage().bucket();

async function deleteAccount(idUtilisateur) {
    try {
        // Récupérer les informations de l'utilisateur
        const utilisateur = await knex("Utilisateurs")
                                  .where("idUtilisateur", idUtilisateur)
                                  .first();

        if (utilisateur) {
            // Supprimer la photo de profil de Firebase
            if (utilisateur.photoProfil) {
                const file = bucket.file(utilisateur.photoProfil);
                await file.delete();
            }

            
            await knex("Reviews")
                  .where("idUtilisateur", idUtilisateur)
                  .update({ idUtilisateur: null, nom: "Utilisateur supprimé" });

            // Supprimer l'utilisateur de la base de données
            await knex("Utilisateurs")
                  .where("idUtilisateur", idUtilisateur)
                  .del();
        }
    } catch (error) {
        // Gestion des erreurs
    }
}*/


module.exports = {
    getUtilisateursAll,
    getUtilisateur,
    getUtilisateurParEmail,
    insertUtilisateur,
    updateUtilisateur,
    deleteUtilisateur,
  //  deleteAccount

};
