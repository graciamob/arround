const knexModule = require("knex");
const dbConnection = require("../modules/db");

const knex = knexModule(dbConnection);

async function getFavorisUtilisateur(idUtilisateur) {
    return knex("Favoris")
    .where("idUtilisateur", idUtilisateur);
}

async function getFavoriParId(idFavoris) {
    return knex("Favoris")
    .where("idFavoris", idFavoris);
}

async function getFavoriPlaceUtilisateur(idUtilisateur, idLieu) {
    return knex("Favoris")
    .where("idUtilisateur", idUtilisateur)
    .andWhere("idLieu", idLieu);
}

async function insertFavori(favori) {
    return knex("Favoris")
    .insert(favori)
    .returning("*");
}

async function deleteFavori(idFavoris) {
    return knex("Favoris")
    .where("idFavoris", idFavoris)
    .del();
}

module.exports = {
    getFavorisUtilisateur,
    getFavoriParId,
    getFavoriPlaceUtilisateur,
    insertFavori,
    deleteFavori
};
