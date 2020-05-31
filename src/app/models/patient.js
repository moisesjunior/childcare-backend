const conexao = require('../../config/connection')
const dataAtual = new Date()
const anoAtual = dataAtual.getFullYear()
const mesAtual = dataAtual.getMonth()
const diaAtual = dataAtual.getDate()

// função para crianças menores de 1 ano
// if (12 * (anoAtual - ano) > 12) {
    
// }


class Paciente {
    verifica = (paciente, id) => {
        const info = {
            pat_name: paciente.pat_name,
            pat_birth_certificate: paciente.pat_birth_certificate
        }
        
        let pat_id = ""
        if (id) {
            pat_id = "pat_id != " + conexao.escape(id) + " and"
        }

        return new Promise((resolve, reject) => {
            const sql = ` SELECT * FROM paciente WHERE ` + pat_id + ` pat_name = ` + conexao.escape(info[1]) +
                ` and pat_birth_certificate = ` + conexao.escape(info[1])
            conexao.query(
                sql,
                paciente,
                (erro, resultados, fields) => {
                    if (erro) {
                        return reject(erro)
                    }

                    if(resultados.length > 0){
                        return reject("Já existe um paciente cadastrado com esse nome e certidão!")
                    }

                    return resolve(resultados)
                }
            )
        })
    }

    listar = () => {
        return new Promise((resolve, reject) => {
            const sql = ` SELECT * FROM paciente `
            conexao.query(
                sql,
                (erro, resultados, fields) => {
                    if(erro) {
                        return reject(erro)
                    }
                    
                    let pacientes = resultados.map((paciente, index) => {
                        let ano = paciente.pat_birth.getFullYear()
                        let dia = paciente.pat_birth.getDate()
                        let mes = paciente.pat_birth.getMonth()
                        let age = anoAtual - ano
                        let sexo = paciente.pat_gender

                        let pat_dh_insert = paciente.pat_dh_insert.toLocaleDateString("pt-BR", { year: "numeric", month: "2-digit", day: "2-digit" })

                        if(dia >= diaAtual && mes >= mesAtual){
                            age -=1
                            age = age + " anos"
                        } else {
                            age = age + " anos"
                            
                        }

                        if (sexo == 'M'){
                            sexo = "Masculino"
                        } else {
                            sexo = "Feminino"
                        }

                        let array =  { 
                            id: paciente.pat_id,
                            col1: paciente.pat_name,
                            col2: paciente.pat_resp_name1,
                            col3: age,
                            col4: sexo,
                            col5: pat_dh_insert}
                        return (array)    
                    })
                   
                    return resolve(pacientes)
                }
            )
        }
    )}

    listarPorDoc = id => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM paciente WHERE ?`
            conexao.query(
                sql,
                { pat_doc_usr_id: id  },
                (erro, resultados, fields) => {
                    if(erro){
                        return reject(erro)
                    }

                    if(resultados.length === 0){
                        return reject("Nenhum paciente para esse médico")
                    }

                    return resolve(resultados)
                }
            )
        })
    }

    visualizar = id => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM paciente WHERE ?`
            conexao.query(
                sql,
                { pat_id: id },
                (erro, resultados, fields) => {
                    if(erro){
                        return reject(erro)
                    }

                    return resolve(resultados)
                }
            )
        })
    }

    adicionar = paciente => {
        return new Promise((resolve, reject) => {
            const pacientes = {
                pat_name: paciente.pat_name,
                pat_birth: paciente.pat_birth,
                pat_gender: paciente.pat_gender,
                pat_rg: paciente.pat_rg,
                pat_cpf: paciente.pat_cpf,
                pat_birth_certificate: paciente.pat_birth_certificate,
                pat_cep: paciente.pat_cep,
                pat_street: paciente.pat_street,
                pat_neighborhood: paciente.pat_neighborhood,
                pat_number: paciente.pat_number,
                pat_complement: paciente.pat_complement,
                pat_city: paciente.pat_city,
                pat_state: paciente.pat_state,
                pat_country: paciente.pat_country,
                pat_resp_name1: paciente.pat_resp_name1,
                pat_resp_gender1: paciente.pat_resp_gender1,
                pat_resp_birth1: paciente.pat_resp_birth1,
                pat_resp_rg1: paciente.pat_resp_rg1,
                pat_resp_cpf1: paciente.pat_resp_cpf1,
                pat_resp_tel1: paciente.pat_resp_tel1,
                pat_resp_email1: paciente.pat_resp_email1,
                pat_resp_name2: paciente.pat_resp_name2,
                pat_resp_gender2: paciente.pat_resp_gender2,
                pat_resp_birth2: paciente.pat_resp_birth2,
                pat_resp_rg2: paciente.pat_resp_rg2,
                pat_resp_cpf2: paciente.pat_resp_cpf2,
                pat_resp_tel2: paciente.pat_resp_tel2,
                pat_resp_email2: paciente.pat_resp_email2,
                pat_blood_type: paciente.pat_blood_type,
                pat_height: paciente.pat_height,
                pat_weight: paciente.pat_weight,
                pat_imc: paciente.pat_imc,
                pat_skin_color: paciente.pat_skin_color,
                pat_doc_usr_id: paciente.pat_doc_usr_id,
                pat_medicines: paciente.pat_medicines,
                pat_diseases: paciente.pat_diseases,
                pat_dh_insert: dataAtual
            }
            const sql = `INSERT INTO paciente SET ?`
            conexao.query(
                sql,
                pacientes,
                (erro, resultados, fields) => {
                    if(erro){
                        return reject("Ocorreu um erro ao adicionar o paciente")
                    }

                    return resolve("Paciente adicionado com sucesso")
                }
            )
        })
    }

    editar = (paciente, id) => {
        return new Promise((resolve, reject) => {
            const pacientes = {
                pat_name: paciente.pat_name,
                pat_birth: paciente.pat_birth,
                pat_gender: paciente.pat_gender,
                pat_rg: paciente.pat_rg,
                pat_cpf: paciente.pat_cpf,
                pat_birth_certificate: paciente.pat_birth_certificate,
                pat_cep: paciente.pat_cep,
                pat_street: paciente.pat_street,
                pat_neighborhood: paciente.pat_neighborhood,
                pat_number: paciente.pat_number,
                pat_complement: paciente.pat_complement,
                pat_city: paciente.pat_city,
                pat_state: paciente.pat_state,
                pat_country: paciente.pat_country,
                pat_resp_name1: paciente.pat_resp_name1,
                pat_resp_gender1: paciente.pat_resp_gender1,
                pat_resp_birth1: paciente.pat_resp_birth1,
                pat_resp_rg1: paciente.pat_resp_rg1,
                pat_resp_cpf1: paciente.pat_resp_cpf1,
                pat_resp_tel1: paciente.pat_resp_tel1,
                pat_resp_email1: paciente.pat_resp_email1,
                pat_resp_name2: paciente.pat_resp_name2,
                pat_resp_gender2: paciente.pat_resp_gender2,
                pat_resp_birth2: paciente.pat_resp_birth2,
                pat_resp_rg2: paciente.pat_resp_rg2,
                pat_resp_cpf2: paciente.pat_resp_cpf2,
                pat_resp_tel2: paciente.pat_resp_tel2,
                pat_resp_email2: paciente.pat_resp_email2,
                pat_blood_type: paciente.pat_blood_type,
                pat_height: paciente.pat_height,
                pat_weight: paciente.pat_weight,
                pat_imc: paciente.pat_imc,
                pat_skin_color: paciente.pat_skin_color,
                pat_doc_usr_id: paciente.pat_doc_usr_id,
                pat_medicines: paciente.pat_medicines,
                pat_diseases: paciente.pat_diseases,
                pat_dh_change: dataAtual
            }
            const sql = `UPDATE paciente SET ? WHERE ?`
            conexao.query(
                sql,
                [pacientes, {pat_id: id}],
                (erro, resultados, fields) => {
                    if (erro) {
                        return reject("Ocorreu um erro ao alterar o paciente")
                    }

                    return resolve("Paciente alterado com sucesso")
                }
            )
        })
    }

    remove = id => {
        const sql = `DELETE FROM paciente WHERE ?`
        return new Promise((resolve, reject) => {
            conexao.query(
                sql,
                { pat_id: id },
                (erro, resultados, fields) => {
                    if (erro) {
                        return reject("Ocorreu um erro ao excluir o paciente")
                    }

                    return resolve("Paciente excluído com sucesso")
                }
            )
        })
    }
}

module.exports = new Paciente