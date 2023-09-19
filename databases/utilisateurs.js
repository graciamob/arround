const knexModule = require("knex");
const dbConnection=require("../modules/db");

const knex=knexModule(dbConnection);

function getUtilisateursAll(){
    return knex("Utilisateurs");
}
function connexion(id_utilisateur,motDePasse){
    return knex("Utilisateurs")
    .where("id_utilisateur",id_utilisateur)
    .andWhere("motDePasse",motDePasse);
}
function getUtilisateur(id_utilisateur){
    return knex("Utilisateurs")
    .where("id_utilisateur",id_utilisateur);

}

function insertUtilisateur(id_utilisateur){
    return knex("Utilisateurs").insert(id_utilisateur);
}
module.exports={
    getUtilisateursAll,
    getUtilisateur,
    connexion,
    insertUtilisateur
};