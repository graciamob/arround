const knexModule = require("knex");

const dbConnection = knexModule({
    client: "mssql",
    connection: {
        host:"DESKTOP-TECS5VH",
        user: "yolande",
        password: "projet3",
        database: " projet3",
        options: {
            port: parseInt(process.env.DB_PORT, 10),
            encrypt: false,
        },
    },
});


module.exports = dbConnection;
