const conexao = require('../../config/connection')
const dataAtual = new Date()

class Prontuario {
    adicionar = pat_id => {
        return new Promise((resolve, reject) => {
            const prontuario = {
                pro_pat_id: pat_id,
                pro_dh_insert: dataAtual
            }
            const sql = `INSERT INTO prontuario SET ?`
            conexao.query(
                sql,
                prontuario,
                (erro, resultados, fields) => {
                    if (erro) {
                        return reject(erro)
                    }

                    return resolve("Ação concluída com sucesso!")
                }
            )
        })
    }

    listar = () => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM prontuario 
                        INNER JOIN paciente ON pro_pat_id = pat_id
                        INNER JOIN usuarios ON pat_doc_usr_id = usr_id `
            conexao.query(
                sql,
                (erro, resultados, fields) => {
                    if (erro) {
                        return reject(erro)
                    }

                    let prontuarios = resultados.map((prontuario, index) => {
                        let array = {
                            id: prontuario.pro_id,
                            pat_id: prontuario.pro_pat_id,
                            col1: prontuario.pat_name,
                            col2: prontuario.usr_name
                        }

                        return array
                    })
                    
                    return resolve(prontuarios)
                }
            )
        })
    }

    listarPorDoc = id => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM prontuario 
                        INNER JOIN paciente ON pro_pat_id = pat_id
                        INNER JOIN usuarios ON pat_doc_usr_id = usr_id 
                        WHERE ?`
            conexao.query(
                sql,
                {pat_doc_usr_id: id},
                (erro, resultados, fields) => {
                    if(erro){
                        return reject(erro)
                    }

                    let prontuarios = resultados.map((prontuario, index) => {
                        let array = {
                            id: prontuario.pro_id,
                            pat_id: prontuario.pro_pat_id,
                            col1: prontuario.pat_name,
                            col2: prontuario.usr_name
                        }

                        return array
                    })
                    
                    return resolve(prontuarios)
                }
            )
        })
    }

    listarPorPaciente = id => {
        return new Promise((resolve, reject) =>{
            const sql = ` SELECT * FROM prontuario
                        LEFT JOIN consulta ON con_pro_id = pro_id 
                        LEFT JOIN agenda ON con_age_id = age_id 
                        LEFT JOIN usuarios ON age_doctor = usr_id 
                        WHERE ?`
            conexao.query(
                sql,
                {pro_pat_id: id},
                (erro, resultados, fields) => {
                    if(erro){
                        return reject(erro)
                    }
                    let prontuarios = resultados.map((prontuario, index) => {
                        let horario = `${prontuario.age_start} - ${prontuario.age_end}`
                        let age_date = prontuario.age_date.toLocaleDateString("pt-BR", { year: "numeric", month: "2-digit", day: "2-digit" })

                        let consulta = prontuario.age_type_con
                        switch(consulta){
                            case 1:
                                consulta = "Consulta"
                                break
                            case 2:
                                consulta = "Retorno"
                                break
                            case 3:
                                consulta = "Acompanhamento"
                                break
                            default:
                                consulta = ""
                                break
                        }

                        let atendimento = prontuario.age_type_ate
                        switch(atendimento){
                            case 1:
                                atendimento = "Convênio"
                                break
                            case 2:
                                atendimento = "Particular"
                                break
                            default:
                                atendimento = ""
                                break
                        }
                        let array = {
                            id: `${prontuario.pro_id}|${prontuario.con_id}|${prontuario.age_id}`,
                            col1: age_date,
                            col2: horario,
                            col3: prontuario.usr_name,
                            col4: consulta,
                            col5: atendimento
                        }

                        return (array)
                    })
                    
                    return resolve(prontuarios)
                }
            )
                        
        })
    }

}

module.exports = new Prontuario