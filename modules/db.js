const knexModule = require("knex");

const dbConnection = knexModule({
    client: "mssql",
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        options: {
            port: parseInt(process.env.DB_PORT, 10),
            encrypt: false,
        },
    },
});


module.exports = dbConnection;
