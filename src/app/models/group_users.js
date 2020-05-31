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
                    return resolve(resultados)
                }
            )
        })
    }

}

module.exports = new GrupoUsuario