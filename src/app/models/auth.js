const conexao = require('../../config/connection')

class Auth {
    buscaEmail = email => {
        return new Promise(function (resolve, reject) {
            const sql = "SELECT usr_id, usr_ugr_id, usr_email, usr_password FROM usuarios WHERE ?"
            conexao.query(
                sql,
                {
                    usr_email: email
                },
                (erro, resultados, fields) => {
                    if (erro) {
                        return reject(erro)
                    }
                    return resolve(resultados[0]);
                }
            )
        })
    }
}

module.exports = new Auth