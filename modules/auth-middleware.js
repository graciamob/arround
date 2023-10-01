/* eslint-disable consistent-return */
const jwt = require("jsonwebtoken");

// express authentification middleware
const authentification = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: "Token invalide",
                });
            }
            req.decoded = decoded;
            next();
        });
    } else {
        return res.status(401).json({
            message: "Token manquant",
        });
    }
};

module.exports = authentification;
