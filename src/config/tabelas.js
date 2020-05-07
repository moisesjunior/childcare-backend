class Tabelas {
    init(conexao){
        this.conexao = conexao

        this.criarUsuarios()
        this.criarAgenda()
        this.criarGrupoUsuarios()
    }

    criarUsuarios(){
        const sql = `CREATE TABLE IF NOT EXISTS usuarios (usr_id int NOT NULL AUTO_INCREMENT,
            usr_ugr_id INT NOT NULL DEFAULT 1,
            usr_email varchar(50) NOT NULL,
            usr_password varchar(255) NOT NULL,
            usr_name varchar(255) NOT NULL,
            usr_data_insercao DATETIME NOT NULL,
            PRIMARY KEY(usr_id),
            INDEX fk_usr_ugr_id_idx (usr_ugr_id ASC) VISIBLE,
            CONSTRAINT fk_usr_ugr_id
            FOREIGN KEY (usr_ugr_id)
            REFERENCES childcare.grupo_usuarios (ugr_id)
            ON DELETE NO ACTION
            ON UPDATE NO ACTION)`
        this.conexao.query(sql, (erro) => {
            if(erro){
                console.log('Tabela não foi criada  ')
            } else {
                console.log('Tabela criada com sucesso')    
            }
        })
    }

    criarAgenda(){
        const sql = `CREATE TABLE IF NOT EXISTS agenda (
                    age_id INT NOT NULL AUTO_INCREMENT,
                    age_status INT NOT NULL COMMENT 'Status do agendamento',
                    age_type INT NOT NULL COMMENT 'Tipo do agendamento',
                    age_date DATE NOT NULL COMMENT 'Data do agendamento',
                    age_start TIME NOT NULL COMMENT 'Horário de início do agendamento',
                    age_end TIME NOT NULL COMMENT 'Horário de término do agendamento',
                    age_patient INT NOT NULL COMMENT 'Id do paciente',
                    age_doctor INT NOT NULL COMMENT 'Id do doutor',
                    age_description LONGTEXT NULL COMMENT 'Comentários gerais sobre o agendamento',
                    age_dh_insert DATETIME NOT NULL COMMENT 'Data de inserção do registro',
                    age_dh_changed DATETIME NULL COMMENT 'Data de alteração do registro',
                    PRIMARY KEY (age_id),
                    INDEX fk_age_patient_idx (age_patient ASC) VISIBLE,
                    CONSTRAINT fk_age_patient
                        FOREIGN KEY (age_patient)
                        REFERENCES childcare.usuarios(usr_id)
                        ON DELETE NO ACTION
                        ON UPDATE NO ACTION,
					INDEX fk_age_doctor_idx (age_patient ASC) VISIBLE,
                    CONSTRAINT fk_age_doctor
                        FOREIGN KEY (age_doctor)
                        REFERENCES childcare.usuarios(usr_id)
                        ON DELETE NO ACTION
                        ON UPDATE NO ACTION)
                    COMMENT = 'Agenda do ChildCare'`
        this.conexao.query(sql, (erro) => {
            if (erro) {
                console.log('Tabela não foi criada  ')
            } else {
                console.log('Tabela criada com sucesso')
            }
        })
    }

    criarGrupoUsuarios(){
        const sql = `CREATE TABLE IF NOT EXISTS grupo_usuarios (
                    ugr_id INT NOT NULL AUTO_INCREMENT COMMENT 'Id do grupo',
                    ugr_descricao VARCHAR(45) NOT NULL COMMENT 'Descriçao do grupo',
                    ugr_dh_insercao DATETIME NOT NULL COMMENT 'Data de inserção do registro',
                    ugr_dh_alteracao DATETIME NULL COMMENT 'Data de alteração do registro',
                    PRIMARY KEY (ugr_id))
                    COMMENT = 'Tabela de grupo de usuários';`
        this.conexao.query(sql, (erro) => {
            if(erro){
                console.log('Tabela não foi criada')
            } else {
                console.log('Tabela criada com sucesso')
            }
        })
    }
}

module.exports = new Tabelas