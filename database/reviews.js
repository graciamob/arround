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

async function getReviewsParUserId(idUtilisateur) {
    return knex("Reviews")
    .where("idUtilisateur", idUtilisateur);
}

async function getNbReviewsParNote(idLieu) {
    return knex.raw(`
        SELECT n.note, COALESCE(COUNT(r.note), 0) as nombre_de_notes
        FROM (
            SELECT 5 as note
            UNION SELECT 4
            UNION SELECT 3
            UNION SELECT 2
            UNION SELECT 1
        ) n
        LEFT JOIN Reviews r ON n.note = r.note AND r.idLieu = ?
        GROUP BY n.note
        ORDER BY n.note DESC;
      `, [idLieu]);
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

function updateUsernameReview(idUtilisateur, newUsername) {
    return knex("Reviews")
    .where("idUtilisateur", idUtilisateur)
    .update({ username: newUsername })
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
    getReviewsParUserId,
    getNbReviewsParNote,
    insertReview,
    updateReview,
    updateUsernameReview,
    deleteReview,
};
