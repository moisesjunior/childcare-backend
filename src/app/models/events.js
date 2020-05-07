const conexao = require('../../config/connection')
const dataAtual = new Date()

class Evento {
    verificaAgenda = (evento, id) => {
        let age_id = ""
        if(id, evento.age_doctor){
            age_id = "age_id != " + conexao.escape(id) + " and"    
        }
        
        const agenda = [
            evento.age_date,
            evento.age_start,
            evento.age_end,
            evento.age_doctor
        ]
        return new Promise((resolve, reject) => {
            const sql = `SELECT age_date, age_start, age_end 
                        FROM agenda
                        WHERE 
                        ` + age_id + ` age_date = ` + conexao.escape(agenda[0]) + ` and (
                        (age_start <= ` + conexao.escape(agenda[1]) + ` and age_end >= ` + conexao.escape(agenda[1]) + `)
                        or
                        (age_start <= ` + conexao.escape(agenda[2]) + ` and age_end >= ` + conexao.escape(agenda[2]) + `)
                        or
                        (age_start <= ` + conexao.escape(agenda[2]) + ` and age_end >= ` + conexao.escape(agenda[1]) + `))`
            conexao.query(
                sql,
                agenda,
                (erro, resultados,fields) => {
                    if(erro){
                        return reject(erro)
                    }
                    if(resultados.length > 0){
                        return reject("Já existe um evento nessa mesma data!")
                    }
                    return resolve(resultados)
                }
            )
        })
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

                    let eventos = resultados.map((evento) => {
                        let age_date = evento.age_date.toLocaleDateString("pt-BR", {year: "numeric", month: "2-digit", day: "2-digit"})
                        let age_start = evento.age_start.toLocaleString("pt-BR", {hour:"2-digit", minute: "2-digit", second: "2-digit"})
                        let age_end = evento.age_end.toLocaleString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
                        let age_date_start = age_date + "T" + age_start
                        let age_date_end = age_date + "T" + age_end
                        return {
                            id: evento.age_id,
                            title: evento.age_description,
                            start: age_date_start,
                            end: age_date_end
                        }
                    })

                    return resolve(eventos)
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
            age_doctor: evento.age_doctor,
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
            age_doctor: evento.age_doctor,
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

                    let eventos = resultados.map((evento) => {
                        let age_date = evento.age_date.toLocaleDateString("pt-BR", { year: "numeric", month: "2-digit", day: "2-digit" })
                        return{
                            age_id: evento.age_id,
                            age_status: evento.age_status,
                            age_type: evento.age_type,
                            age_date: age_date,
                            age_start: evento.age_start,
                            age_end: evento.age_end,
                            age_patient: evento.age_patient,
                            age_doctor: evento.age_doctor,
                            age_description: evento.age_description
                        }
                    })

                    return resolve(eventos);
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