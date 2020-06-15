// Responsável pela criação da conexão com o banco de dados
require("dotenv").config()
const mysql = require('mysql');

const conexao = mysql.createConnection({
    host: process.env.HOST_DATABASE,
    port: process.env.HOST_PORT,
    user: process.env.HOST_USER,
    password: process.env.HOST_PASSWORD,
    database: process.env.HOST_SCHEMA,
    multipleStatements: true
});

module.exports = conexao