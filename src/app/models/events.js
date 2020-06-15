const conexao = require('../../config/connection')
const dataAtual = new Date()
const anoAtual = dataAtual.getFullYear()
const mesAtual = dataAtual.getMonth() + 1
const diaAtual = dataAtual.getDate()

function dataAtualFormatada(date) {
        dia = date.getDate().toString(),
        diaF = (dia.length == 1) ? '0' + dia : dia,
        mes = (date.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0' + mes : mes,
        anoF = date.getFullYear();
    return anoF + "-" + mesF + "-" + diaF;
}

class Evento {
    verificaAgenda = (evento, id) => {
        let age_id = ""
        if(id){
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
                        (age_start < ` + conexao.escape(agenda[1]) + ` and age_end > ` + conexao.escape(agenda[1]) + `)
                        or
                        (age_start < ` + conexao.escape(agenda[2]) + ` and age_end > ` + conexao.escape(agenda[2]) + `)
                        or
                        (age_start < ` + conexao.escape(agenda[2]) + ` and age_end > ` + conexao.escape(agenda[1]) + `))
                        and age_doctor = ` + conexao.escape(agenda[3])
            conexao.query(
                sql,
                agenda,
                (erro, resultados,fields) => {
                    if(erro){
                        return reject(erro)
                    }
                    if(resultados.length > 0){
                        return reject("Já existe um evento nessa mesma data e horário com o médico!")
                    }
                    return resolve(resultados)
                }
            )
        })
    }

    listar = () => {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM agenda LEFT JOIN paciente ON age_patient = pat_id"
            conexao.query(
                sql,
                (erro, resultados, fields) => {
                    if(erro){
                        return reject(erro);
                    }

                    let eventos = resultados.map((evento) => {
                        let age_date = dataAtualFormatada(evento.age_date)
                        let age_start = evento.age_start.toLocaleString("pt-BR", {hour:"2-digit", minute: "2-digit", second: "2-digit"})
                        let age_end = evento.age_end.toLocaleString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
                        let age_date_start = age_date + "T" + age_start
                        let age_date_end = age_date + "T" + age_end

                        let age_tipo = ""
                        switch (evento.age_type_con) {
                            case 1:
                                age_tipo = "Consulta"
                                break;
                            case 2:
                                age_tipo = "Retorno"
                                break;
                            case 3:
                                age_tipo = "Acompanhamento"
                                break;
                            default:
                                break;
                        }
                        
                        return {
                            id: evento.age_id,
                            title: `Tipo: ${age_tipo} \nPaciente: ${evento.pat_name}`,
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
            age_type_con: evento.age_type_con,
            age_type_ate: evento.age_type_ate,
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
            age_type_con: evento.age_type_con,
            age_type_ate: evento.age_type_ate,
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
                            age_type_con: evento.age_type_con,
                            age_type_ate: evento.age_type_ate,
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

    visualizaEventoPaciente = id => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM agenda 
                        LEFT JOIN paciente ON pat_id = age_patient 
                        LEFT JOIN prontuario ON pat_id = pro_pat_id 
                        WHERE ?`
            conexao.query(
                sql,
                {
                    age_id: id
                },
                (erro, resultados, fields) => {
                    if (erro) {
                        return reject(erro);
                    }
                    if (resultados.length === 0) {
                        return reject("Não temos nenhum registro com esse ID");
                    }

                    let eventos = resultados.map((evento) => {
                        let age_date = evento.age_date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })

                        let ano = evento.pat_birth.getFullYear()
                        let dia = evento.pat_birth.getDate()
                        let mes = evento.pat_birth.getMonth()
                        let age = anoAtual - ano
                        let sexo = evento.pat_gender

                        if (dia >= diaAtual && mes >= mesAtual) {
                            age -= 1
                            age = age + " anos"
                        } else {
                            age = age + " anos"
                        }

                        if (sexo == 'M') {
                            sexo = "Masculino"
                        } else {
                            sexo = "Feminino"
                        }

                        let consulta = evento.age_type_con
                        switch (consulta){
                            case 1:
                                consulta = "Consulta"
                                break
                            case 2:
                                consulta = "Retorno"
                                break
                            case 3:
                                consulta = "Atendimento"
                                break
                            default:
                                consulta = ""
                                break
                        }

                        return {
                            age_id: evento.age_id,
                            age_date: age_date,
                            age_start: evento.age_start,
                            age_patient: evento.age_patient,
                            pat_id: evento.pat_id,
                            pat_sexo: sexo,
                            pat_age: age,
                            pat_name: evento.pat_name,
                            pat_responsavel: evento.pat_resp_name1,
                            age_consulta: consulta,
                            pro_id: evento.pro_id
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

    carregaGraficos = () => {
        return new Promise((resolve, reject) => {
            const sql1 = `SELECT count(*) as total FROM agenda WHERE month(age_date) = ${mesAtual}`

            const sql2 = `SELECT count(*) as total FROM agenda WHERE month(age_date) = ${mesAtual} and age_type_con = 1`
            const sql3 = `SELECT count(*) as total FROM agenda WHERE month(age_date) = ${mesAtual} and age_type_con = 2`
            const sql4 = `SELECT count(*) as total FROM agenda WHERE month(age_date) = ${mesAtual} and age_type_con = 3`

            const sql5 = `SELECT count(*) as total FROM agenda WHERE month(age_date) = ${mesAtual} and age_type_ate = 1`
            const sql6 = `SELECT count(*) as total FROM agenda WHERE month(age_date) = ${mesAtual} and age_type_ate = 2`

            const sql7 = "SELECT * FROM agenda LEFT JOIN paciente ON pat_id = age_patient WHERE age_date > (NOW() - INTERVAL 7 DAY)"

            conexao.query(`${sql1}; ${sql2}; ${sql3}; ${sql4};${sql5};${sql6};${sql7}`, function (error, results, fields) {
                if (error) return reject(error);

                let total = results[0].map((total, index) => {
                    return total.total
                })

                let consulta = results[1].map((total, index) => {
                    return total.total
                })

                let retorno = results[2].map((total, index) => {
                    return total.total
                })

                let acompanhamento = results[3].map((total, index) => {
                    return total.total
                })
                
                let array1 = {
                    0: [
                        {
                            label: "Consulta",
                            value: (consulta / total) * 100
                        },
                        {
                            label: "Retorno",
                            value: (retorno / total) * 100
                        },
                        {
                            label: "Acompanhamento",
                            value: (acompanhamento / total) * 100
                        }
                    ]
                }

                let convenio = results[4].map((total, index) => {
                    return total.total
                })

                let particular = results[5].map((total, index) => {
                    return total.total
                })

                let array2 = {
                    1: [
                        {
                            label: "Convênio",
                            value: (convenio / total) * 100
                        },
                        {
                            label: "Particular",
                            value: (particular / total) * 100
                        }
                    ]
                }

                let agendas = results[6].map((total, index) => {
                    let age_date = total.age_date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })
                    return {
                        age_paciente: total.pat_name,
                        age_data: age_date,
                        age_horario: `${total.age_start} - ${total.age_end}`
                    }
                })

                const array3 = {
                    2: [
                        agendas
                    ]
                }
                
                const resultados = { ...array1, ...array2, ...array3 }

                return resolve(resultados)
            });
        })
    }
    
}

module.exports = new Evento