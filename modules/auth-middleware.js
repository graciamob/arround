// noinspection ExceptionCaughtLocallyJS

const jwt = require("jsonwebtoken");
const db = require("./db");

module.exports = async function authMiddleware(request, response, next) {
    try {
        const { headers } = request;
        const { authorization } = headers; // retourne => "Bearer dfgdhjfdghjfdgdhjfdghjfdgjdh"
        if (!authorization) {
            throw new Error("Header missing");
        }
        if (!authorization.toLowerCase()
            .startsWith("bearer ")) {
            throw new Error("Bearer malformed.  le mot bearer est absent");
        }
        const secret = "dgjkgevuyetggvdghdfhegchgjdg,dvbmdghkdvghmdvhmshmg";
        const token = authorization.slice(7);

        // placer les claims du jeton dans request.user de façon à pouvoir les utiliser
        // dans les fonctions demandant l'authentification
        try {
            // noinspection JSCheckFunctionSignatures
            request.user = jwt.verify(token, secret);
        } catch (e) {
            throw new Error(`Bearer malformed: ${authorization}`);
        }

        // vérifier que l'utilisateur à qui ce jeton a été émis existe toujours
        const user = await db("user").where("userId", request.user.userId).first();
        if (!user) {
            return response.status(404)
                .json({ message: "Not authorized. L'utilisateur n'existe plus." });
        }

        return next();
    } catch (error) {
        console.log("Une erreur s'est produite", error.message);
        return response.status(401)
            .json({ message: `Not authorized. ${error.message}` });
    }
};
