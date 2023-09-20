const knexModule = require("knex");
const dbConnection = require("../modules/db");

const knex = knexModule(dbConnection);

// fonctions get
function getUtilisateursAll(){
    return knex("Utilisateurs");
}

function connexion(username, motDePasse){
    return knex("Utilisateurs")
    .where("username", username)
    .andWhere("motDePasse", motDePasse);
}

function getUtilisateur(idUtilisateur){
    return knex("Utilisateurs")
    .where("idUtilisateur", idUtilisateur);
}

// fonctions d'ajout
function insertUtilisateur(utilisateur){
    return knex("Utilisateurs")
    .insert(utilisateur);
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
    connexion,
    insertUtilisateur,
    updateUtilisateur,
    deleteUtilisateur,
};
