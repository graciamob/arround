const dbConnection = {
    client: "mssql",
    connection: {
        host:"deptinf.cmaisonneuve.qc.ca",
        user: "5D1gr01e03",
        password: "BaSoJ8rM3ryKpF511SZliy",
        database: "5D1gr01e03",
        options: {
            port: parseInt(process.env.DB_PORT, 10),
            encrypt: false,
        },
    },
};


module.exports = dbConnection;
