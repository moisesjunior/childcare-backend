require("dotenv").config()

const conexao = require('../../config/connection')
const dataAtual = new Date()

class Consulta {
    listar = () => {
        return new Promise((resolve, reject) => {
            const sql = ` SELECT * FROM consulta 
                        LEFT JOIN agenda ON con_age_id = age_id
                        LEFT JOIN usuario ON age_doctor = usr_id`
            conexao.query(
                sql,
                (erro, resultados, fields) => {
                    if (erro) {
                        return reject(erro)
                    }

                    let consultas = resultados.map((consulta, index) => {
                        let tipo_con = consulta.age_type_con
                        switch (tipo_con) {
                            case 1:
                                tipo_con = "Consulta"
                                break
                            case 2:
                                tipo_con = "Retorno"
                                break
                            case 3:
                                tipo_con = "Atendimento"
                                break
                            default:
                                tipo_con = ""
                                break
                        }

                        let tipo_age = consulta.age_type_ate
                        switch (tipo_age) {
                            case 1:
                                tipo_age = "Convênio"
                                break
                            case 2:
                                tipo_age = "Particular"
                                break
                            default:
                                tipo_age = ""
                                break
                        }

                        let array = {
                            id: consulta.usr_id,
                            col1: consulta.age_date,
                            col2: `${consulta.age_start} - ${consulta.age_end}`,
                            col3: consulta.usr_name,
                            col4: consulta.tipo_con,
                            col5: consulta.tipo_age
                        }
                        return (array)
                    })

                    return resolve(consultas)
                }
            )
        })
    }

    visualizar = id => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM consulta WHERE ?`
            conexao.query(
                sql,
                { con_id: id },
                (erro, resultados, fields) => {
                    if (erro) {
                        return reject(erro)
                    }

                    let consulta = resultados.map((dado) => {
                        return {
                            con_queixa: dado.con_queixa,
                            con_alergias: dado.con_alergias,
                            con_medicamentos: dado.con_medicamentos,
                            con_problemas_respiratorios: dado.con_problemas_respiratorios,
                            con_problemas_gastricos: dado.con_problemas_gastricos,
                            con_problemas_musculares: dado.con_problemas_musculares,
                            con_altura: dado.con_altura,
                            con_peso: dado.con_peso,
                            con_imc: dado.con_imc,
                            con_freq_cardio: dado.con_freq_cardio,
                            con_arterial: dado.con_arterial,
                            con_freq_resp: dado.con_freq_resp,
                            con_temp_corp: dado.con_temp_corp,
                            con_observacoes: dado.con_observacoes,
                            con_diagnostico: dado.con_diagnostico,
                            con_evolucao: dado.con_evolucao
                        }
                    })

                    return resolve(consulta)
                }
            )
        })
    }

    adicionar = dados => {
        return new Promise((resolve, reject) => {
            const consulta = {
                con_pro_id: 1,
                con_age_id: dados.age_id,
                con_queixa: dados.con_queixa,
                con_alergias: dados.con_alergias,
                con_medicamentos: dados.con_medicamentos,
                con_problemas_respiratorios: dados.con_problemas_respiratorios,
                con_problemas_gastricos: dados.con_problemas_gastricos,
                con_problemas_musculares: dados.con_problemas_musculares,
                con_altura: dados.con_altura,
                con_peso: dados.con_peso,
                con_imc: dados.con_imc,
                con_freq_cardio: dados.con_freq_cardio,
                con_arterial: dados.con_arterial,
                con_freq_resp: dados.con_freq_resp,
                con_temp_corp: dados.con_temp_corp,
                con_observacoes: dados.con_observacoes,
                con_diagnostico: dados.con_diagnostico,
                con_evolucao: dados.con_evolucao,
                con_dh_insercao: dataAtual
            }
            const sql = `INSERT INTO consulta SET ?`
            conexao.query(
                sql,
                consulta,
                (erro, resultados, fields) => {
                    if (erro) {
                        return reject(erro)
                    }
                    return resolve(resultados.insertId)
                }
            )
        })
    }

    adicionarArquivo = (arquivo, id) => {
        return new Promise((resolve, reject) => {
            let path = arquivo.path
            if(!path){
                path = `${process.env.API_URL}/files/${arquivo.key}`
            }

            const consulta = {
                ane_con_id: id,
                ane_file: arquivo.key,
                ane_path: path,
                ane_size: arquivo.size,
                ane_dh_insercao: dataAtual
            }
            const sql = `INSERT INTO exames_consulta SET ?`
            conexao.query(
                sql,
                consulta,
                (erro, resultados, fields) => {
                    if (erro) {
                        return reject(erro)
                    }

                    return resolve("Ação concluída com sucesso")
                }
            )
        })
    }

    visualizaExames = (id) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * from exames_consulta WHERE ?`
            conexao.query(
                sql,
                {ane_con_id: id},
                (erro, resultados, fields) => {
                    if (erro) {
                        return reject(erro)
                    }

                    return resolve(resultados)
                }
            )
        })
    }
}

module.exports = new Consulta