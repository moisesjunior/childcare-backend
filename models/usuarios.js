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
                res.status(201).json(resultados)
            }
        })
    }
    buscaEmail(email){
        return new Promise(function(resolve, reject){
            const sql = "SELECT usr_email, usr_password FROM usuarios WHERE ?"
            conexao.query(
                sql,
                {
                    usr_email: email
                },
                (erro, resultados, fields) => {
                    if(erro){
                        return reject(erro)
                    }
                    return resolve(resultados[0]);
                }
            )
        })
    }
    login() {
        return function(req, res, next) {

            passport.authenticate('local', (erro, usuario, info) => {
                if(info){
                    return res.status(400).send(info)
                }

                if(erro){
                    return next(erro);
                }

                req.login(usuario, {session: false}, (erro) => {
                    if(erro){
                        return next(erro);
                    }
                    const token = jwt.sign(JSON.stringify(usuario), 'childcare-token');
                    return res.send({usuario, token});
                })
            })(req, res, next); // responsável por executar a estratégia de autenticação
        };
    }
}
module.exports = new Usuario