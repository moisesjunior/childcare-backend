const conexao = require('../infra/connection')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)
const passport = require('passport')
const jwt = require('jsonwebtoken')

class Usuario {
    adiciona(usuario, res){
        const usr_dataCriacao = new Date()
        const sql = `INSERT INTO usuarios SET ?`
        conexao.query(
            sql, 
            {
                usr_email: usuario.usr_email,
                usr_password: bcrypt.hashSync(usuario.usr_password, salt),
                usr_name: usuario.usr_name,
                usr_data_insercao: usr_dataCriacao
            }
            , (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        })
    }
}
module.exports = new Usuario