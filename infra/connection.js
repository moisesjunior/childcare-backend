// Responsável pela criação da conexão com o banco de dados

const mysql = require('mysql');

const conexao = mysql.createConnection({
    host: 'childcare-rds.catixrmlf909.sa-east-1.rds.amazonaws.com',
    port: 3306,
    user: 'masterUsername',
    password: 'momonem1234',
    database: 'childcare'
});

module.exports = conexao