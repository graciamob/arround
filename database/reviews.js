const knexModule = require("knex");
const dbConnection = require("../modules/db");

const knex = knexModule(dbConnection);

// fonctions GET
async function getReviewsUtilisateur(idUtilisateur) {
    return knex("Reviews")
    .where("idUtilisateur", idUtilisateur);
}

async function getReviewsParId(idReviews) {
    return knex("Reviews")
    .where("idReviews", idReviews);
}

async function getReviewsParLieu(idLieu) {
    return knex("Reviews")
    .where("idLieu", idLieu);
}

async function getReviewsUtilisateurParLieu(idUtilisateur, idLieu) {
    return knex("Reviews")
    .where("idUtilisateur", idUtilisateur)
    .andWhere("idLieu", idLieu);
}

// fonctions d'ajout
async function insertReview(review) {
    return knex("Reviews")
    .insert(review)
    .returning("*");
}

// fonctions de modification
function updateReview(review, idReviews) {
    return knex("Reviews")
    .where("idReviews", idReviews)
    .update(review)
    .returning("*");
}

// fonctions de suppression
async function deleteReview(idReviews) {
    return knex("Reviews")
    .where("idReviews", idReviews)
    .del();
}

module.exports = {
    getReviewsUtilisateur,
    getReviewsParId,
    getReviewsParLieu,
    getReviewsUtilisateurParLieu,
    insertReview,
    updateReview,
    deleteReview,
};
