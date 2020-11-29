CREATE DATABASE Trabalho;
USE Trabalho;

-- DROPS

DROP TABLE Testagem;
DROP TABLE Posto_de_saúde;
DROP TABLE Comorbidade_Paciente;
DROP TABLE Sintoma_Paciente;
DROP TABLE Sintoma;
DROP TABLE Comorbidade;
DROP TABLE Paciente;
DROP TABLE Hospital;
DROP TABLE Estado;
DROP TABLE Efetividade;
DROP TABLE Execução;
DROP TABLE Ações;
DROP TABLE Governador;


CREATE TABLE  Efetividade
	(ID int PRIMARY KEY,
	 Grau varchar(45) NOT NULL,
	 Descrição varchar(100) NOT NULL
     );

CREATE TABLE  Governador
	(RG		int PRIMARY KEY,
	 Nome varchar(45) NOT NULL,
	 Data_nascimento date NOT NULL,
     Data_de_admissão date NOT NULL
     );
     
CREATE TABLE  Ações
	(Código	int PRIMARY KEY,
	 Eficácia int NOT NULL,
	 Descrição varchar(45) NOT NULL
     );
     
CREATE TABLE  Execução
	(Duração_dias int NOT NULL,
	 Código int NOT NULL,
	 RG int NOT NULL,
     PRIMARY KEY(Código, RG, Duração_dias),
     FOREIGN KEY(Código) references Ações(Código),
     FOREIGN KEY(RG) references Governador(RG)
     );

CREATE TABLE  Estado
	(UF	varchar(2) PRIMARY KEY,
	 População int NOT NULL,
	 Quant_postos_saude	int NOT NULL,
	 Quant_hospitais int NOT NULL,
     ID int NOT NULL,
     RG int NOT NULL,
     FOREIGN KEY(ID) references Efetividade(ID),
     FOREIGN KEY(RG) references Governador(RG)
     );
     
CREATE TABLE  Posto_de_saúde
	(Nome varchar(100) PRIMARY KEY,
	 CEP int NOT NULL,
	 Capacidade_diária int NOT NULL,
	 UF varchar(2) NOT NULL,
     FOREIGN KEY(UF) references Estado(UF)
     );
     
CREATE TABLE  Hospital
	(Nome varchar(100) PRIMARY KEY,
	 Numero_de_leitos int NOT NULL,
	 Taxa_de_ocupação float NOT NULL,
	 UF varchar(2) NOT NULL,
     FOREIGN KEY(UF) references Estado(UF)
     );
     
CREATE TABLE  Paciente
	(ID int NOT NULL auto_increment,
	 Sexo char(1) NOT NULL,
	 Data_de_nascimento date NOT NULL,
	 Nome varchar(45) NOT NULL,
     PRIMARY KEY(ID),
     FOREIGN KEY(Nome) references Hospital(Nome)
     );

CREATE TABLE  Testagem
	(Data_testagem datetime NOT NULL,
	 Tipo varchar(45) NOT NULL,
	 Contaminação tinyint NOT NULL,
	 ID int NOT NULL,
     Nome varchar(100) NOT NULL,
     PRIMARY KEY(Data_testagem, ID),
     FOREIGN KEY(ID) references Paciente(ID),
     FOREIGN KEY(Nome) references Posto_de_saúde(Nome)
     );
     
CREATE TABLE  Comorbidade
	(Tipo varchar(45) PRIMARY KEY,
	 Descrição varchar(100) NOT NULL,
	 Gravidade	varchar(45) NOT NULL
     );

CREATE TABLE  Comorbidade_Paciente
	(ID	int NOT NULL,
	 Tipo varchar(45) NOT NULL,
     PRIMARY KEY(ID, Tipo),
     FOREIGN KEY(ID) references Paciente(ID),
     FOREIGN KEY(Tipo) references Comorbidade(Tipo)
     );
     
CREATE TABLE  Sintoma
	(Tipo varchar(45) PRIMARY KEY,
	 Descrição varchar(100) NOT NULL,
	 Gravidade	varchar(45) NOT NULL
     );
     
CREATE TABLE  Sintoma_Paciente
	(ID	int NOT NULL,
	 Tipo varchar(45) NOT NULL,
     Duração_dias int NOT NULL,
     PRIMARY KEY(ID, Tipo),
     FOREIGN KEY(ID) references Paciente(ID),
     FOREIGN KEY(Tipo) references Sintoma(Tipo)
     );

-- INSERT GOVERNADORES

INSERT INTO Governador(RG, Nome, Data_nascimento, Data_de_admissão) VALUES (124586, 'Gladson de Lima Cameli', '1978-03-26', '2019-01-01');
INSERT INTO Governador(RG, Nome, Data_nascimento, Data_de_admissão) VALUES (158649, 'José Renan Vasconcelos Calheiros Filho', '1979-10-08', '2015-01-01');
INSERT INTO Governador(RG, Nome, Data_nascimento, Data_de_admissão) VALUES (245875, 'Antônio Waldez Góes da Silva', '1961-10-29', '2015-01-01');
INSERT INTO Governador(RG, Nome, Data_nascimento, Data_de_admissão) VALUES (203567, 'Wilson Miranda Lima', '1976-06-26', '2019-01-01');
INSERT INTO Governador(RG, Nome, Data_nascimento, Data_de_admissão) VALUES (958204, 'Rui Costa dos Santos', '1963-01-18', '2015-01-01');
INSERT INTO Governador(RG, Nome, Data_nascimento, Data_de_admissão) VALUES (165842, 'Camilo Sobreira de Santana', '1968-06-03', '2015-01-01');
INSERT INTO Governador(RG, Nome, Data_nascimento, Data_de_admissão) VALUES (182820, 'Ibaneis Rocha Barros Júnior', '1971-07-10', '2019-01-01');
INSERT INTO Governador(RG, Nome, Data_nascimento, Data_de_admissão) VALUES (159260, 'José Renato Casagrande', '1960-12-03', '2019-01-01');
INSERT INTO Governador(RG, Nome, Data_nascimento, Data_de_admissão) VALUES (851250, 'Ronaldo Ramos Caiado', '1949-09-25', '2019-01-01');
INSERT INTO Governador(RG, Nome, Data_nascimento, Data_de_admissão) VALUES (785550, 'Flávio Dino de Castro e Costa', '1968-04-30', '2015-01-01');
INSERT INTO Governador(RG, Nome, Data_nascimento, Data_de_admissão) VALUES (620258, 'Romeu Zema Neto', '1964-10-28', '2019-01-01');
INSERT INTO Governador(RG, Nome, Data_nascimento, Data_de_admissão) VALUES (205488, 'Wilson José Witzel', '1968-02-19', '2019-01-01');
INSERT INTO Governador(RG, Nome, Data_nascimento, Data_de_admissão) VALUES (205388, 'João Agripino da Costa Doria Junior', '1957-12-16', '2019-01-01');


-- INSERT AÇÕES

INSERT INTO Ações(Código, Eficácia, Descrição) VALUES (1, 7, 'Fechamento do comércio não essencial');
INSERT INTO Ações(Código, Eficácia, Descrição) VALUES (2, 8, 'Fechamento de escolas e universidades');
INSERT INTO Ações(Código, Eficácia, Descrição) VALUES (3, 9, 'Quarentena obrigatória');
INSERT INTO Ações(Código, Eficácia, Descrição) VALUES (4, 6, 'Toque de recolher a noite');
INSERT INTO Ações(Código, Eficácia, Descrição) VALUES (5, 10, 'Proibição de eventos');


-- INSERT EFETIVIDADE

INSERT INTO Efetividade(ID, Grau, Descrição) VALUES (0, 'Muito baixa', 'Acima de 5 mil casos por 100 mil habitantes');
INSERT INTO Efetividade(ID, Grau, Descrição) VALUES (1, 'Baixa', 'Entre 5 mil e 4 mil casos por 100 mil habitantes');
INSERT INTO Efetividade(ID, Grau, Descrição) VALUES (2, 'Média', 'Entre 4 mil e 3.1 mil casos por 100 mil habitantes');
INSERT INTO Efetividade(ID, Grau, Descrição) VALUES (3, 'Alta', 'Entre 3.1 mil e 2.5 mil casos por 100 mil habitantes');
INSERT INTO Efetividade(ID, Grau, Descrição) VALUES (4, 'Muito alta', 'Abaixo de 2.5 mil casos por 100 mil habitantes');


-- INSERT ESTADO

INSERT INTO Estado(UF, População, Quant_postos_saude, Quant_hospitais, ID, RG) VALUES ('AC', 894470, 32, 21, 2, 124586);
INSERT INTO Estado(UF, População, Quant_postos_saude, Quant_hospitais, ID, RG) VALUES ('AL', 3351543, 256, 72, 3, 158649);
INSERT INTO Estado(UF, População, Quant_postos_saude, Quant_hospitais, ID, RG) VALUES ('AM', 4207714, 161, 103, 1, 203567);
INSERT INTO Estado(UF, População, Quant_postos_saude, Quant_hospitais, ID, RG) VALUES ('AP', 861773, 37, 11, 0, 245875);
INSERT INTO Estado(UF, População, Quant_postos_saude, Quant_hospitais, ID, RG) VALUES ('BA', 14930634, 1171, 532, 3, 958204);
INSERT INTO Estado(UF, População, Quant_postos_saude, Quant_hospitais, ID, RG) VALUES ('CE', 9187103, 652, 262, 3, 165842);
INSERT INTO Estado(UF, População, Quant_postos_saude, Quant_hospitais, ID, RG) VALUES ('DF', 3055149, 60, 40, 0, 182820);
INSERT INTO Estado(UF, População, Quant_postos_saude, Quant_hospitais, ID, RG) VALUES ('ES', 4064052, 89, 106, 1, 159260);
INSERT INTO Estado(UF, População, Quant_postos_saude, Quant_hospitais, ID, RG) VALUES ('GO', 7113540, 474, 422, 2, 851250);
INSERT INTO Estado(UF, População, Quant_postos_saude, Quant_hospitais, ID, RG) VALUES ('MA', 7114598, 839, 246, 3, 785550);
INSERT INTO Estado(UF, População, Quant_postos_saude, Quant_hospitais, ID, RG) VALUES ('MG', 21292666, 696, 607, 4, 620258);
INSERT INTO Estado(UF, População, Quant_postos_saude, Quant_hospitais, ID, RG) VALUES ('RJ', 17366189, 294, 462, 4, 205488);
INSERT INTO Estado(UF, População, Quant_postos_saude, Quant_hospitais, ID, RG) VALUES ('SP', 46289333, 758, 893, 3, 205388);


-- INSERT POSTO DE SAUDE

INSERT INTO Posto_de_saúde(Nome, CEP, Capacidade_diária, UF) VALUES ('Posto de saúde comunitário em aldeia do Rio Branco', 69907725, 48, 'AC');
INSERT INTO Posto_de_saúde(Nome, CEP, Capacidade_diária, UF) VALUES ('Posto de Saúde Mata verde', 57670000, 150, 'AL'); 
INSERT INTO Posto_de_saúde(Nome, CEP, Capacidade_diária, UF) VALUES ('Unidade Básica de Saúde Dr. Lélio Silva', 68904250, 90, 'AP'); 
INSERT INTO Posto_de_saúde(Nome, CEP, Capacidade_diária, UF) VALUES ('Unidade Básica Saude L-34', 69086640, 100, 'AM');
INSERT INTO Posto_de_saúde(Nome, CEP, Capacidade_diária, UF) VALUES ('Posto de Saúde Antônia Ribeiro Leal', 45480000, 300, 'BA'); 
INSERT INTO Posto_de_saúde(Nome, CEP, Capacidade_diária, UF) VALUES ('Posto de Saúde Quatro Varas', 60333765, 150, 'CE'); 
INSERT INTO Posto_de_saúde(Nome, CEP, Capacidade_diária, UF) VALUES ('Centro de Saúde n°12', 70853450, 500, 'DF'); 
INSERT INTO Posto_de_saúde(Nome, CEP, Capacidade_diária, UF) VALUES ('Unidade De Saúde De Maruipe', 29043037, 400, 'ES'); 
INSERT INTO Posto_de_saúde(Nome, CEP, Capacidade_diária, UF) VALUES ('Centro de Saúde Vila Boa', 74360470, 140, 'GO'); 
INSERT INTO Posto_de_saúde(Nome, CEP, Capacidade_diária, UF) VALUES ('Unidade Básica de Saúde Delice Dias de Oliveira', 65715000, 500, 'MA'); 
INSERT INTO Posto_de_saúde(Nome, CEP, Capacidade_diária, UF) VALUES ('Centro de Saúde Menino Jesus', 30330100, 48, 'MG'); 
INSERT INTO Posto_de_saúde(Nome, CEP, Capacidade_diária, UF) VALUES ('Centro Municipal de Saúde ( CMS / Posto de Saúde ) Heitor Beltrão', 20521160, 48, 'RJ'); 
INSERT INTO Posto_de_saúde(Nome, CEP, Capacidade_diária, UF) VALUES ('UBS Unidade Básica De Saúde Sigmund Freud', 04062001, 400, 'SP');  


-- INSERT COMORBIDADE (FALTA DESCRIÇÃO)

INSERT INTO Comorbidade(Tipo, Descrição, Gravidade) VALUES ('Hipertensão', 'Aumento anormal da pressão que o sangue faz ao circular pelas artérias do corpo', 'Alta');
INSERT INTO Comorbidade(Tipo, Descrição, Gravidade) VALUES ('Diabetes', 'Falta ou má absorção de insulina', 'Alta');
INSERT INTO Comorbidade(Tipo, Descrição, Gravidade) VALUES ('Insuficiência cardíaca', 'Coração incapaz de bombear sangue suficiente', 'Alta');
INSERT INTO Comorbidade(Tipo, Descrição, Gravidade) VALUES ('Doença renal crônica', 'Diminuição da capacidade dos rins de filtrar os resíduos metabólicos do sangue', 'Alta');
INSERT INTO Comorbidade(Tipo, Descrição, Gravidade) VALUES ('Derrame', 'Obstrução da artéria do cérebro (AVC isquêmico)', 'Alta');
INSERT INTO Comorbidade(Tipo, Descrição, Gravidade) VALUES ('Câncer', 'Crescimento desordenado de células, que invadem tecidos e órgãos', 'Alta');
INSERT INTO Comorbidade(Tipo, Descrição, Gravidade) VALUES ('Asma', 'Estreitamento dos bronquíolos, comprometendo a respiração', 'Média');
INSERT INTO Comorbidade(Tipo, Descrição, Gravidade) VALUES ('Obesidade', 'Acúmulo de gordura corporal', 'Alta');
INSERT INTO Comorbidade(Tipo, Descrição, Gravidade) VALUES ('Imunodepressão', 'Diminuição das reações imunitárias do organismo', 'Média');
INSERT INTO Comorbidade(Tipo, Descrição, Gravidade) VALUES ('Neoplasia', 'Proliferação desordenada de células no organismo', 'Média');


-- INSERT HOSPITAL

INSERT INTO Hospital(Nome, Numero_de_leitos, Taxa_de_ocupação, UF) VALUES ('HOSPITAL FUNDHACRE', 233, 0.55, 'AC');
INSERT INTO Hospital(Nome, Numero_de_leitos, Taxa_de_ocupação, UF) VALUES ('HOSPITAL MEDICO CIRURGICO', 82, 0.82, 'AL');
INSERT INTO Hospital(Nome, Numero_de_leitos, Taxa_de_ocupação, UF) VALUES ('HOSPITAL DE EMERGENCIA', 98, 1, 'AP');
INSERT INTO Hospital(Nome, Numero_de_leitos, Taxa_de_ocupação, UF) VALUES ('HOSPITAL UNIVERSITARIO GETULIO VARGAS', 147, 0.4, 'AM');
INSERT INTO Hospital(Nome, Numero_de_leitos, Taxa_de_ocupação, UF) VALUES ('HOSPITAL GERAL DO ESTADO', 352, 1.1, 'BA');
INSERT INTO Hospital(Nome, Numero_de_leitos, Taxa_de_ocupação, UF) VALUES ('HGF HOSPITAL GERAL DE FORTALEZA', 474, 1.29, 'CE');
INSERT INTO Hospital(Nome, Numero_de_leitos, Taxa_de_ocupação, UF) VALUES ('HRAN', 302, 01.05, 'DF');
INSERT INTO Hospital(Nome, Numero_de_leitos, Taxa_de_ocupação, UF) VALUES ('HOSPITAL SANTA CASA DE VITORIA', 173, 0.72, 'ES');
INSERT INTO Hospital(Nome, Numero_de_leitos, Taxa_de_ocupação, UF) VALUES ('HOSPITAL SANTA LUCIA', 80, 0.54, 'GO');
INSERT INTO Hospital(Nome, Numero_de_leitos, Taxa_de_ocupação, UF) VALUES ('HOSPITAL PRESIDENTE VARGAS', 38, 0.82, 'MA');
INSERT INTO Hospital(Nome, Numero_de_leitos, Taxa_de_ocupação, UF) VALUES ('HOSPITAL SOFIA FELDMAN', 224, 0.93, 'MG');
INSERT INTO Hospital(Nome, Numero_de_leitos, Taxa_de_ocupação, UF) VALUES ('SMS HOSPITAL MUNICIPAL DA PIEDADE AP 32', 129, 0.44, 'RJ');
INSERT INTO Hospital(Nome, Numero_de_leitos, Taxa_de_ocupação, UF) VALUES ('HOSPITAL DAS CLINICAS DE SÃO PAULO', 1.316, 0.78, 'SP');


-- INSERT PACIENTE

INSERT INTO Paciente(ID, Sexo, Data_de_Nascimento, Nome) VALUES (NULL, 'F', '1997-12-01', 'HOSPITAL FUNDHACRE');
INSERT INTO Paciente(ID, Sexo, Data_de_Nascimento, Nome) VALUES (NULL, 'M', '1995-07-03', 'HOSPITAL MEDICO CIRURGICO');
INSERT INTO Paciente(ID, Sexo, Data_de_Nascimento, Nome) VALUES (NULL, 'F', '2000-10-14', 'HOSPITAL DE EMERGENCIA');
INSERT INTO Paciente(ID, Sexo, Data_de_Nascimento, Nome) VALUES (NULL, 'F', '2001-11-12', 'HOSPITAL UNIVERSITARIO GETULIO VARGAS');
INSERT INTO Paciente(ID, Sexo, Data_de_Nascimento, Nome) VALUES (NULL, 'M', '1965-01-24', 'HOSPITAL GERAL DO ESTADO');
INSERT INTO Paciente(ID, Sexo, Data_de_Nascimento, Nome) VALUES (NULL, 'F', '1977-12-14', 'HGF HOSPITAL GERAL DE FORTALEZA');
INSERT INTO Paciente(ID, Sexo, Data_de_Nascimento, Nome) VALUES (NULL, 'F', '1993-10-05', 'HRAN');
INSERT INTO Paciente(ID, Sexo, Data_de_Nascimento, Nome) VALUES (NULL, 'F', '1956-05-22', 'HOSPITAL SANTA CASA DE VITORIA');
INSERT INTO Paciente(ID, Sexo, Data_de_Nascimento, Nome) VALUES (NULL, 'M', '1990-07-30', 'HOSPITAL SANTA LUCIA');
INSERT INTO Paciente(ID, Sexo, Data_de_Nascimento, Nome) VALUES (NULL, 'M', '1992-06-15', 'HOSPITAL PRESIDENTE VARGAS');
INSERT INTO Paciente(ID, Sexo, Data_de_Nascimento, Nome) VALUES (NULL, 'M', '1955-02-25', 'HOSPITAL SOFIA FELDMAN');
INSERT INTO Paciente(ID, Sexo, Data_de_Nascimento, Nome) VALUES (NULL, 'F', '2005-11-23', 'SMS HOSPITAL MUNICIPAL DA PIEDADE AP 32');
INSERT INTO Paciente(ID, Sexo, Data_de_Nascimento, Nome) VALUES (NULL, 'F', '1999-12-21', 'HOSPITAL DAS CLINICAS DE SÃO PAULO');

-- INSERT COMORBIDADE_PACIENTE

INSERT INTO Comorbidade_Paciente(ID, Tipo) VALUES (1, 'Hipertensão');
INSERT INTO Comorbidade_Paciente(ID, Tipo) VALUES (2, 'Diabetes');
INSERT INTO Comorbidade_Paciente(ID, Tipo) VALUES (4, 'Derrame');
INSERT INTO Comorbidade_Paciente(ID, Tipo) VALUES (5, 'Obesidade');
INSERT INTO Comorbidade_Paciente(ID, Tipo) VALUES (8, 'Neoplasia');
INSERT INTO Comorbidade_Paciente(ID, Tipo) VALUES (9, 'Asma');

-- INSERT EXECUÇÃO

INSERT INTO Execução(Duração_dias, Código, RG) VALUES (14, 4, 124586);
INSERT INTO Execução(Duração_dias, Código, RG) VALUES (90, 2, 158649);
INSERT INTO Execução(Duração_dias, Código, RG) VALUES (60, 1, 203567);
INSERT INTO Execução(Duração_dias, Código, RG) VALUES (90, 5, 245875);
INSERT INTO Execução(Duração_dias, Código, RG) VALUES (32, 1, 958204);
INSERT INTO Execução(Duração_dias, Código, RG) VALUES (120, 2, 165842);
INSERT INTO Execução(Duração_dias, Código, RG) VALUES (65, 2, 182820);
INSERT INTO Execução(Duração_dias, Código, RG) VALUES (60, 5, 159260);
INSERT INTO Execução(Duração_dias, Código, RG) VALUES (20, 4, 851250);
INSERT INTO Execução(Duração_dias, Código, RG) VALUES (18, 4, 785550);
INSERT INTO Execução(Duração_dias, Código, RG) VALUES (60, 3, 620258);
INSERT INTO Execução(Duração_dias, Código, RG) VALUES (75, 1, 205488);
INSERT INTO Execução(Duração_dias, Código, RG) VALUES (140, 2, 205388);

-- INSERT SINTOMA

INSERT INTO Sintoma(Tipo, Descrição, Gravidade) VALUES ('Febre', 'Aumento da temperatura do corpo acima do limite normal', 'Baixa');
INSERT INTO Sintoma(Tipo, Descrição, Gravidade) VALUES ('Tosse seca', 'Quando não existe produção de muco ou catarro', 'Baixa');
INSERT INTO Sintoma(Tipo, Descrição, Gravidade) VALUES ('Cansaço', 'Se sentir desmotivado, sem energia', 'Baixa');
INSERT INTO Sintoma(Tipo, Descrição, Gravidade) VALUES ('Dores', 'Sentir desconfortos físicos', 'Média');
INSERT INTO Sintoma(Tipo, Descrição, Gravidade) VALUES ('Diarreia', 'Aumento do número de evacuações e a perda de consistência das fezes', 'Média');
INSERT INTO Sintoma(Tipo, Descrição, Gravidade) VALUES ('Dificuldade de respirar', 'Fazer força para respirar', 'Alta');
INSERT INTO Sintoma(Tipo, Descrição, Gravidade) VALUES ('Perda de paladar e/ou olfato', 'Deixar de sentir sabor ou cheiro', 'Baixa');
INSERT INTO Sintoma(Tipo, Descrição, Gravidade) VALUES ('Perda de fala ou movimento', 'Incapacidade de falar ou mover', 'Alta');


-- INSERT SINTOMA_PACIENTE

INSERT INTO Sintoma_Paciente(ID, Tipo, Duração_dias) VALUES (4, 'Febre', 3);
INSERT INTO Sintoma_Paciente(ID, Tipo, Duração_dias) VALUES (7, 'Febre', 2);
INSERT INTO Sintoma_Paciente(ID, Tipo, Duração_dias) VALUES (2, 'Febre', 1);
INSERT INTO Sintoma_Paciente(ID, Tipo, Duração_dias) VALUES (2, 'Cansaço', 2);
INSERT INTO Sintoma_Paciente(ID, Tipo, Duração_dias) VALUES (6, 'Diarreia', 2);
INSERT INTO Sintoma_Paciente(ID, Tipo, Duração_dias) VALUES (4, 'Dificuldade de respirar', 1);
INSERT INTO Sintoma_Paciente(ID, Tipo, Duração_dias) VALUES (9, 'Tosse seca', 3);
INSERT INTO Sintoma_Paciente(ID, Tipo, Duração_dias) VALUES (3, 'Dores', 2);


-- INSERT TESTAGEM

INSERT INTO Testagem(Data_testagem, Tipo, Contaminação, ID, Nome) VALUES ('2020-07-03 17:24:02', 'RT-PCR', 1, 1, 'Posto de saúde comunitário em aldeia do Rio Branco');
INSERT INTO Testagem(Data_testagem, Tipo, Contaminação, ID, Nome) VALUES ('2020-07-03 17:24:02', 'RT-PCR', 0, 2, 'Posto de Saúde Mata verde');
INSERT INTO Testagem(Data_testagem, Tipo, Contaminação, ID, Nome) VALUES ('2020-07-03 17:24:02', 'Teste rapido', 1, 3, 'Unidade Básica de Saúde Dr. Lélio Silva');
INSERT INTO Testagem(Data_testagem, Tipo, Contaminação, ID, Nome) VALUES ('2020-05-27 14:36:45', 'Teste rapido', 1, 4, 'Unidade Básica Saude L-34');
INSERT INTO Testagem(Data_testagem, Tipo, Contaminação, ID, Nome) VALUES ('2020-06-03 14:29:46', 'RT-PCR', 1, 5, 'Posto de Saúde Antônia Ribeiro Leal');
INSERT INTO Testagem(Data_testagem, Tipo, Contaminação, ID, Nome) VALUES ('2020-06-08 15:39:10', 'Teste rapido', 1, 6, 'Posto de Saúde Quatro Varas');
INSERT INTO Testagem(Data_testagem, Tipo, Contaminação, ID, Nome) VALUES ('2020-07-01 12:07:19', 'Teste rapido', 0, 7, 'Centro de Saúde n°12');
INSERT INTO Testagem(Data_testagem, Tipo, Contaminação, ID, Nome) VALUES ('2020-07-15 16:10:24', 'RT-PCR', 1, 8, 'Unidade De Saúde De Maruipe');
INSERT INTO Testagem(Data_testagem, Tipo, Contaminação, ID, Nome) VALUES ('2020-08-21 15:10:39', 'RT-PCR', 1, 9, 'Centro de Saúde Vila Boa');
INSERT INTO Testagem(Data_testagem, Tipo, Contaminação, ID, Nome) VALUES ('2020-08-30 13:29:45', 'RT-PCR', 0, 10, 'Unidade Básica de Saúde Delice Dias de Oliveira');
INSERT INTO Testagem(Data_testagem, Tipo, Contaminação, ID, Nome) VALUES ('2020-09-02 14:05:34', 'Teste rapido', 1, 11, 'Centro de Saúde Menino Jesus');


-- VIEW

CREATE VIEW melhores_estados AS 
SELECT UF 
FROM Estado
INNER JOIN Efetividade
ON Estado.ID = Efetividade.ID
WHERE Efetividade.Grau = 'Muito Alta';

CALL melhores_estados;


-- PROCEDURE

DELIMITER // 
CREATE PROCEDURE  Quantidade_pacientes(UF varchar(2)) 
BEGIN 
SELECT count(*)
FROM paciente, hospital 
WHERE paciente.nome = hospital.nome AND UF = hospital.UF; 
END // DELIMITER ;

CALL Quantidade_pacientes('DF');


-- CINCO CONSULTAS EM ALGEBRA RELACIONAL

SELECT paciente.ID, sintoma_paciente.tipo, comorbidade_paciente.tipo
FROM paciente
LEFT JOIN sintoma_paciente ON sintoma_paciente.ID = paciente.ID
LEFT JOIN comorbidade_paciente ON comorbidade_paciente.ID = paciente.ID
ORDER BY paciente.ID ASC;

SELECT governador.nome, ações.descrição
FROM governador
LEFT JOIN execução ON execução.RG = governador.RG
LEFT JOIN ações ON Ações.código = execução.Código
ORDER BY governador.nome ASC;

SELECT estado.UF, count(hospital.nome), count(posto_de_saúde.nome)
FROM Estado
RIGHT JOIN hospital ON hospital.UF = Estado.UF
RIGHT JOIN posto_de_saúde ON posto_de_saúde.UF = Estado.UF
GROUP BY estado.UF
ORDER BY Estado.UF ASC;

SELECT paciente.sexo, count(*)
FROM sintoma_paciente, sintoma, paciente
WHERE sintoma.gravidade = 'Alta' AND sintoma_paciente.ID = paciente.ID
GROUP BY paciente.sexo
ORDER BY paciente.sexo ASC;

SELECT governador.nome, efetividade.grau
FROM governador
INNER JOIN Estado on Governador.RG = Estado.RG
INNER JOIN Efetividade on Efetividade.ID = Estado.ID
ORDER BY governador.nome ASC;





