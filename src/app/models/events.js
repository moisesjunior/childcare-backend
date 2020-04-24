const conexao = require('../../config/connection')
const dataAtual = new Date()

class Evento {
    verificaAgenda = (evento) => {
    }

    listar = () => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM agenda"
            conexao.query(
                sql,
                (erro, resultados, fields) => {
                    if(erro){
                        return reject(erro);
                    }
                    return resolve(resultados)
                }
            )
        })
    }

    adiciona = evento => {
        const agendamento = {
            age_status: evento.age_status,
            age_type: evento.age_type,
            age_date: evento.age_date,
            age_start: evento.age_start,
            age_end: evento.age_end,
            age_patient: evento.age_patient,
            age_description: evento.age_description,
            age_dh_insert: dataAtual
        }
        const sql = "INSERT INTO agenda SET ? "
        return new Promise((resolve, reject) => {
            conexao.query(
                sql,
                agendamento,
                (erro, resultados, fields) => {
                    if (erro) {
                        return reject(erro);
                    }

                    return resolve("Agendamento realizado com sucesso");
                }
            )
        })
    }

    editar = (id, evento) => {
        const agendamento = {
            age_status: evento.age_status,
            age_type: evento.age_type,
            age_date: evento.age_date,
            age_start: evento.age_start,
            age_end: evento.age_end,
            age_patient: evento.age_patient,
            age_description: evento.age_description,
            age_dh_changed: dataAtual
        }
        return new Promise((resolve, reject) => {
            const sql = "UPDATE agenda SET ? WHERE ?"
            conexao.query(
                sql,
                [agendamento, {age_id: id}],
                (error, resultados, fields) => {
                    if(error){
                        return reject(error)
                    }
                    return resolve("O registro foi atualizado com sucesso!")
                }
            )
        })
    }

    visualizar = id => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM agenda WHERE ?"
            conexao.query(
                sql,
                {
                    age_id: id
                },
                (erro, resultados, fields) => {
                    if (erro) {
                        return reject(erro);
                    }
                    if(resultados.length === 0){
                        return reject("Não temos nenhum registro com esse ID");
                    }
                    return resolve(resultados);
                }
            )
        })
    }

    excluir = id => {
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM agenda WHERE ?"
            conexao.query(
                sql,
                {
                    age_id: id
                },
                (error, resultados, fields) => {
                    if(error){
                        return reject(error)
                    }
                    return resolve("Agendamento excluído com sucesso!")
                }
            )
        })
    }
    
}

module.exports = new Evento