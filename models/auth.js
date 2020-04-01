const conexao = require('../infra/connection')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)
const passport = require('passport')
const jwt = require('jsonwebtoken')

class Auth {
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

module.exports = new Auth