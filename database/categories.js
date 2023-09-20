const knexModule = require("knex");
const dbConnection = require("../modules/db");

const knex = knexModule(dbConnection);

// fonctions get
function getCategoriesAll() {
    return knex("Categories");
}

function getCategorieParId(idCategorie) {
    return knex("Categories")
    .where("idCategorie", idCategorie);
}

function getCategorieParNom(nomCategorie) {
    return knex("Categories")
    .where("nomCategorie", nomCategorie);
}

function getCategoriesUtilisateur(idUtilisateur) {
    return knex("UtilisateurCategorie")
    .where("idUtilisateur", idUtilisateur);
}

module.exports = {
    getCategoriesAll,
    getCategorieParId,
    getCategorieParNom,
    getCategoriesUtilisateur,
};
