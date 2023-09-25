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

module.exports = {
    getUtilisateursAll,
    getUtilisateur,
    getUtilisateurParEmail,
    insertUtilisateur,
    updateUtilisateur,
    deleteUtilisateur,
};
