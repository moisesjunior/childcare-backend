// Responsável pela criação da conexão com o banco de dados

const mysql = require('mysql');

const conexao = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'MJun10r04#',
    database: 'childcare'
});

module.exports = conexao