// class Tabelas {
//     init(conexao){
//         this.conexao = conexao

//         this.criarGrupoUsuarios()
//         this.criarUsuarios()
//         this.criarPacientes()
//         this.criarAgenda()
//     }

//     criarUsuarios(){
//         const sql = `CREATE TABLE IF NOT EXISTS usuarios (usr_id int NOT NULL AUTO_INCREMENT,
//             usr_ugr_id INT NOT NULL DEFAULT 1,
//             usr_email varchar(50) NOT NULL,
//             usr_password varchar(255) NOT NULL,
//             usr_name varchar(255) NOT NULL,
//             usr_data_insercao DATETIME NOT NULL,
//             PRIMARY KEY(usr_id),
//             INDEX fk_usr_ugr_id_idx (usr_ugr_id ASC),
//             CONSTRAINT fk_usr_ugr_id
//             FOREIGN KEY (usr_ugr_id)
//             REFERENCES childcare.grupo_usuarios (ugr_id)
//             ON DELETE NO ACTION
//             ON UPDATE NO ACTION)`
//         this.conexao.query(sql, (erro) => {
//             if(erro){
//                 console.log('Tabela não foi criada  ')
//             } else {
//                 console.log('Tabela criada com sucesso')    
//             }
//         })
//     }

//     criarAgenda(){
//         const sql = `CREATE TABLE IF NOT EXISTS agenda (
//                     age_id INT NOT NULL AUTO_INCREMENT,
//                     age_status INT NOT NULL COMMENT 'Status do agendamento',
//                     age_type_con INT NOT NULL COMMENT 'Tipo da consulta',
//                     age_type_ate INT NOT NULL COMMENT 'Tipo do atendimento',
//                     age_date DATE NOT NULL COMMENT 'Data do agendamento',
//                     age_start TIME NOT NULL COMMENT 'Horário de início do agendamento',
//                     age_end TIME NOT NULL COMMENT 'Horário de término do agendamento',
//                     age_patient INT NOT NULL COMMENT 'Id do paciente',
//                     age_doctor INT NOT NULL COMMENT 'Id do doutor',
//                     age_description LONGTEXT NULL COMMENT 'Comentários gerais sobre o agendamento',
//                     age_dh_insert DATETIME NOT NULL COMMENT 'Data de inserção do registro',
//                     age_dh_changed DATETIME NULL COMMENT 'Data de alteração do registro',
//                     PRIMARY KEY (age_id),
//                     INDEX fk_age_patient_idx (age_patient ASC),
//                     CONSTRAINT fk_age_patient
//                         FOREIGN KEY (age_patient)
//                         REFERENCES childcare.paciente(pat_id)
//                         ON DELETE NO ACTION
//                         ON UPDATE NO ACTION,
// 					INDEX fk_age_doctor_idx (age_patient ASC),
//                     CONSTRAINT fk_age_doctor
//                         FOREIGN KEY (age_doctor)
//                         REFERENCES childcare.usuarios(usr_id)
//                         ON DELETE NO ACTION
//                         ON UPDATE NO ACTION)
//                     COMMENT = 'Agenda do ChildCare'`
//         this.conexao.query(sql, (erro) => {
//             if (erro) {
//                 console.log('Tabela não foi criada  ')
//             } else {
//                 console.log('Tabela criada com sucesso')
//             }
//         })
//     }

//     criarGrupoUsuarios(){
//         const sql = `CREATE TABLE IF NOT EXISTS grupo_usuarios (
//                     ugr_id INT NOT NULL AUTO_INCREMENT COMMENT 'Id do grupo',
//                     ugr_descricao VARCHAR(45) NOT NULL COMMENT 'Descriçao do grupo',
//                     ugr_dh_insercao DATETIME NOT NULL COMMENT 'Data de inserção do registro',
//                     ugr_dh_alteracao DATETIME NULL COMMENT 'Data de alteração do registro',
//                     PRIMARY KEY (ugr_id))
//                     COMMENT = 'Tabela de grupo de usuários';`
//         this.conexao.query(sql, (erro) => {
//             if(erro){
//                 console.log('Tabela não foi criada')
//             } else {
//                 console.log('Tabela criada com sucesso')
//             }
//         })
//     }

//     criarPacientes(){
//         const sql = `CREATE TABLE IF NOT EXISTS childcare.paciente (
//                     pat_id INT NOT NULL AUTO_INCREMENT,
//                     pat_name VARCHAR(255) NOT NULL,
//                     pat_birth DATE NULL,
//                     pat_gender VARCHAR(5) NULL,
//                     pat_rg VARCHAR(45) NULL,
//                     pat_cpf VARCHAR(45) NULL,
//                     pat_birth_certificate VARCHAR(45) NULL,
//                     pat_cep VARCHAR(45) NULL,
//                     pat_street VARCHAR(100) NULL,
//                     pat_neighborhood VARCHAR(100) NULL,
//                     pat_number INT NULL,
//                     pat_complement VARCHAR(100) NULL,
//                     pat_city VARCHAR(100) NULL,
//                     pat_state VARCHAR(5) NULL,
//                     pat_country VARCHAR(5) NULL,
//                     pat_resp_name1 VARCHAR(255) NULL,
//                     pat_resp_gender1 VARCHAR(5) NULL,
//                     pat_resp_birth1 DATE NULL,
//                     pat_resp_rg1 VARCHAR(55) NULL,
//                     pat_resp_cpf1 VARCHAR(55) NULL,
//                     pat_resp_tel1 VARCHAR(20) NULL,
//                     pat_resp_email1 VARCHAR(55) NULL,
//                     pat_resp_name2 VARCHAR(255) NULL,
//                     pat_resp_gender2 VARCHAR(5) NULL,
//                     pat_resp_birth2 DATE NULL,
//                     pat_resp_rg2 VARCHAR(55) NULL,
//                     pat_resp_cpf2 VARCHAR(55) NULL,
//                     pat_resp_tel2 VARCHAR(20) NULL,
//                     pat_resp_email2 VARCHAR(55) NULL,
//                     pat_blood_type varchar(5) NULL,
//                     pat_height float(17,2) NULL,
//                     pat_weight int NULL,
//                     pat_imc float(17,2) NULL,
//                     pat_skin_color int NULL,
//                     pat_doc_usr_id int NULL,
//                     pat_medicines LONGTEXT NULL,
//                     pat_diseases LONGTEXT NULL,
//                     pat_dh_insert datetime NOT NULL,
//                     pat_dh_change datetime NOT NULL,
//                     PRIMARY KEY (pat_id),
//                     CONSTRAINT FK_pat_doc_usr_id FOREIGN KEY (pat_doc_usr_id)
//                     REFERENCES usuarios(usr_id))
//                     COMMENT = 'Tabela para registro de pacientes ';`
//         this.conexao.query(sql, (erro) => {
//             if (erro) {
//                 console.log('Tabela não foi criada')
//             } else {
//                 console.log('Tabela criada com sucesso')
//             }
//         })
//     }
// }

// module.exports = new Tabelas