const knexModule = require("knex");
const dbConnection = require("../modules/db");

const knex = knexModule(dbConnection);

// fonctions GET
async function getPhotosUtilisateur(idUtilisateur) {
    return knex("Photos")
    .where("idUtilisateur", idUtilisateur);
}

async function getPhotosAvantDate(idUtilisateur, date){
    return knex("Photos")
    .where("idUtilisateur", idUtilisateur)
    .andWhere("date", "<", date);
}

async function getPhotosApresDate(idUtilisateur, date){
    return knex("Photos")
    .where("idUtilisateur", idUtilisateur)
    .andWhere("date", ">", date);
}

async function getPhotosParLieu(idUtilisateur, idLieu){
    return knex("Photos")
    .where("idUtilisateur", idUtilisateur)
    .andWhere("idLieu", idLieu);
}

async function getPhotoParId(idPhoto){
    return knex("Photos")
    .where("idPhoto", idPhoto);
}

// fonctions d'ajout
async function insertPhoto(photo){
    return knex("Photos")
    .insert(photo)
    .returning("*");
}

// fonctions de suppression
async function deletePhoto(idPhoto){
    return knex("Photos")
    .where("idPhoto", idPhoto)
    .del();
}

module.exports = {
    getPhotosUtilisateur,
    getPhotosAvantDate, 
    getPhotosApresDate,
    getPhotosParLieu,
    getPhotoParId,
    insertPhoto,
    deletePhoto,
};
