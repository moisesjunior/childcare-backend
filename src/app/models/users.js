const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)
const conexao = require('../../config/connection')

class Usuario {
    adiciona = (usuario) => {
        const usr_dataCriacao = new Date()
        const sql = `INSERT INTO usuarios SET ?`
        return new Promise((resolve, reject) => {
            conexao.query(
                sql,
                {
                    usr_email: usuario.usr_email,
                    usr_password: bcrypt.hashSync(usuario.usr_password, salt),
                    usr_name: usuario.usr_name,
                    usr_data_insercao: usr_dataCriacao
                },
                function (err) {
                    if (err) {
                        return reject("Não foi possível adicionar o usuário!");
                    }

                    return resolve("Usuário adicionado com sucesso");
                } 
            )
        })
    }

    teste = (usuario) => {
        console.log(usuario)
        return new Promise((resolve, reject) => {
            return resolve(usuario)
        })
    }
}

module.exports = new Usuario