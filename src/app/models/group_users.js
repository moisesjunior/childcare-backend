const conexao = require('../../config/connection')

class GrupoUsuario {
    listaGrupo = id => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM grupo_usuarios INNER JOIN usuarios ON usr_ugr_id = ugr_id WHERE ?"
            conexao.query(
                sql,
                {
                    ugr_id: id
                },
                (erro, resultados, fields) => {
                    if(erro){
                        return reject("Ocorreu um erro ao tentar encontrar os usuários!")
                    }
                    if(resultados.length == 0){
                        return reject("Não foi encontrado nenhum usuário!")
                    }

                    let medicos = {
                        value: "",
                        label: "",
                    }

                    medicos = resultados.map((users, index) => {
                        
                        let array = {
                            value: users.usr_id,
                            label: users.usr_name
                        }
                        return array
                    })
                    return resolve(medicos)
                }
            )
        })
    }

}

module.exports = new GrupoUsuario