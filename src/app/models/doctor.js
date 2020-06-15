const conexao = require('../../config/connection')
const dataAtual = new Date()
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)

class Medico {
    verifica = (medico, id) => {
        const info = {
            usr_name: medico.usr_name,
            usr_email: medico.usr_email,
            usr_crm: medico.usr_crm
        }

        let usr_id = ""
        if (id) {
            usr_id = "usr_id != " + conexao.escape(id) + " and"
        }

        return new Promise((resolve, reject) => {
            const sql = ` SELECT * FROM usuarios WHERE ${usr_id} usr_name = ${conexao.escape(info[0])}
            and usr_email = ${conexao.escape(info[1])} and usr_crm = ${conexao.escape(info[2])}`
            conexao.query(
                sql,
                medico,
                (erro, resultados, fields) => {
                    if (erro) {
                        return reject(erro)
                    }

                    if (resultados.length > 0) {
                        return reject("Já existe um médico cadastrado com esse nome e documento!")
                    }

                    return resolve(resultados)
                }
            )
        })
    }

    listar = () => {
        return new Promise((resolve, reject) => {
            const sql = ` SELECT * FROM usuarios WHERE usr_ugr_id = 2`
            conexao.query(
                sql,
                (erro, resultados, fields) => {
                    if (erro) {
                        return reject(erro)
                    }

                    let medicos = resultados.map((medico, index) => {
                        let array = {
                            id: medico.usr_id,
                            col1: medico.usr_name,
                            col2: medico.usr_espec,
                            col3: medico.usr_crm,
                            col4: medico.usr_email,
                            col5: medico.usr_tel
                        }
                        return (array)
                    })

                    return resolve(medicos)
                }
            )
        })
    }

    visualizar = id => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM usuarios WHERE ?`
            conexao.query(
                sql,
                { usr_id: id },
                (erro, resultados, fields) => {
                    if (erro) {
                        return reject(erro)
                    }

                    let medico = resultados.map((dado) => {
                        let usr_birth = dado.usr_birth.toLocaleDateString("pt-BR", { year: "numeric", month: "2-digit", day: "2-digit" })

                        return {
                            usr_id: dado.usr_id,
                            usr_name: dado.usr_name,
                            usr_rg: dado.usr_rg,
                            usr_cpf: dado.usr_cpf,
                            usr_tel: dado.usr_tel,
                            usr_gender: dado.usr_gender,
                            usr_birth: usr_birth,
                            usr_cep: dado.usr_cep,
                            usr_street: dado.usr_street,
                            usr_neighborhood: dado.usr_neighborhood,
                            usr_number: dado.usr_number,
                            usr_complement: dado.usr_complement,
                            usr_city: dado.usr_city,
                            usr_state: dado.usr_state,
                            usr_crm: dado.usr_crm,
                            usr_uf_crm: dado.usr_uf_crm,
                            usr_espec: dado.usr_espec
                        }
                    })

                    return resolve(medico)
                }
            )
        })
    }

    adicionar = dados => {
        return new Promise((resolve, reject) => {
            const medico = {
                usr_name: dados.usr_name,
                usr_ugr_id: 2,
                usr_email: dados.usr_email,
                usr_password: bcrypt.hashSync(dados.usr_password, salt),
                usr_rg: dados.usr_rg,
                usr_cpf: dados.usr_cpf,
                usr_tel: dados.usr_tel,
                usr_gender: dados.usr_gender,
                usr_birth: dados.usr_birth,
                usr_cep: dados.usr_cep,
                usr_street: dados.usr_street,
                usr_neighborhood: dados.usr_neighborhood,
                usr_number: dados.usr_number,
                usr_complement: dados.usr_complement,
                usr_city: dados.usr_city,
                usr_state: dados.usr_state,
                usr_crm: dados.usr_crm,
                usr_uf_crm: (dados.usr_uf_crm === '' ? null : dados.usr_uf_crm),
                usr_espec: (dados.usr_espec === '' ? null : dados.usr_espec),
                usr_data_insercao: dataAtual
            }
            const sql = `INSERT INTO usuarios SET ?`
            conexao.query(
                sql,
                medico,
                (erro, resultados, fields) => {
                    if (erro) {
                        return reject(erro)
                    }

                    return resolve("Médico adicionado com sucesso")
                }
            )
        })
    }

    editar = (dados, id) => {
        return new Promise((resolve, reject) => {
            const medico = {
                usr_name: dados.usr_name,
                usr_rg: dados.usr_rg,
                usr_cpf: dados.usr_cpf,
                usr_tel: dados.usr_tel,
                usr_gender: dados.usr_gender,
                usr_birth: dados.usr_birth,
                usr_cep: dados.usr_cep,
                usr_street: dados.usr_street,
                usr_neighborhood: dados.usr_neighborhood,
                usr_number: dados.usr_number,
                usr_complement: dados.usr_complement,
                usr_city: dados.usr_city,
                usr_state: dados.usr_state,
                usr_crm: dados.usr_crm,
                usr_uf_crm: dados.usr_uf_crm,
                usr_espec: dados.usr_espec,
                usr_data_insercao: dataAtual
            }
            const sql = `UPDATE usuarios SET ? WHERE ?`
            conexao.query(
                sql,
                [medico, { usr_id: id }],
                (erro, resultados, fields) => {
                    if (erro) {
                        return reject(erro)
                    }

                    return resolve("Médico alterado com sucesso")
                }
            )
        })
    }

    remove = id => {
        const sql = `DELETE FROM usuarios WHERE ?`
        return new Promise((resolve, reject) => {
            conexao.query(
                sql,
                { usr_id: id },
                (erro, resultados, fields) => {
                    if (erro) {
                        return reject(erro)
                    }

                    return resolve("Médico excluído com sucesso")
                }
            )
        })
    }
}

module.exports = new Medico