const express = require('express');
const app = require('express')();

const mysql = require('mysql');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({ origin: true }));
app.listen(8080, () => {
  console.log("Servidor rodando...");
});


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'valbanco'
});

// Tabela Governador

app.get('/governadores', (req, res) => {
  connection.query('SELECT * FROM trabalho.governador', (err, resultado, fields) => {
    if(!err) {
      res.send(resultado.map((r) => {
        return r;
      }));
    }
    else {
      console.log("Erro ao listar: %s ",err );
    }
  });
});

app.get('/governadores/:pk', (req, res) => {
  const {pk} = req.params;
  const sql = "SELECT * FROM trabalho.governador WHERE RG=?";
  connection.query(sql, [pk], (err, resultado, fields) => {
    if(!err) {
      res.send(resultado.map((r) => {
        return r;
      }));
    }
    else {
      console.log("Erro ao listar: %s ",err );
    }
  });
});

app.post('/governadores', (req, res) => {
  const params = req.body;
  const sql = "INSERT INTO trabalho.governador(RG, Nome, Data_nascimento, Data_de_admissão) VALUES (?,?,?,?)";
  connection.query(sql, [params.RG, params.Nome, params.Data_nascimento, params.Data_de_admissão], (err, resultado, fields) => {
    if(!err) {
      res.json({resultado});
    }
    else {
      console.log("Erro ao inserir: %s ",err );
    }
  });
});

app.put('/governadores/:pk', (req, res) => {
  const params = req.body;
  const {pk} = req.params;
  const sql = "UPDATE trabalho.governador SET Nome=?, Data_nascimento=?, Data_de_admissão=? WHERE RG=?";
  connection.query(sql, [params.Nome, params.Data_nascimento, params.Data_de_admissão, pk], (err, resultado, fields) => {
    if(!err) {
      res.json({resultado});
    }
    else {
      console.log("Erro ao editar: %s ",err );
    }
  });
});

app.delete('/governadores/:pk', (req, res) => {
  const {pk} = req.params;
  const sql = "DELETE FROM trabalho.governador WHERE governador.RG=?";
  connection.query(sql, [pk], (err, resultado, fields) => {
    if(!err) {
      res.json({resultado});
    }
    else {
      console.log("Erro ao deletar: %s ",err );
    }
  });
});

// Tabela Efetividade

app.get('/efetividade', (req, res) => {
  const sql = "SELECT * FROM trabalho.efetividade";
  connection.query(sql, (err, resultado, fields) => {
    res.send(resultado.map((r) => {
      return r;
    }))
  });
});

app.get('/efetividade/:pk', (req, res) => {
  const {pk} = req.params;
  const sql = "SELECT * FROM trabalho.efetividade WHERE ID=?";
  connection.query(sql, [pk], (err, resultado, fields) => {
    res.send(resultado.map((r) => {
      return r;
    }))
  });
});

app.post('/efetividade', (req, res) => {
  const params = req.body;
  const sql = "INSERT INTO trabalho.efetividade(ID, Grau, Descrição) VALUES (?,?,?)";
  connection.query(sql, [params.ID, params.Grau, params.Descrição], (err, resultado, fields) => {
    res.json({resultado});
  });
});

app.put('/efetividade/:pk', (req, res) => {
  const params = req.body;
  const {pk} = req.params;
  const sql = "UPDATE trabalho.efetividade SET Grau=?, Descrição=? WHERE ID=?";
  connection.query(sql, [params.Grau, params.Descrição, pk], (err, resultado, fields) => {
    if(!err) {
      res.json({resultado});
    }
    else {
      console.log("Erro ao editar: %s ",err );
    }
  });
});

app.delete('/efetividade/:pk', (req, res) => {
  const {pk} = req.params;
  const sql = "DELETE FROM trabalho.efetividade WHERE efetividade.ID=?";
  connection.query(sql, [pk], (err, resultado, fields) => {
    if(!err) {
      res.json({resultado});
    }
    else {
      console.log("Erro ao deletar: %s ",err );
    }
  });
});

// Tabela Ações

app.get('/acoes', (req, res) => {
  const sql = "SELECT * FROM trabalho.ações";
  connection.query(sql, (err, resultado, fields) => {
    res.send(resultado.map((r) => {
      return r;
    }))
  });
});

app.get('/acoes/:pk', (req, res) => {
  const {pk} = req.params;
  const sql = "SELECT * FROM trabalho.ações WHERE Código=?";
  connection.query(sql, [pk], (err, resultado, fields) => {
    res.send(resultado.map((r) => {
      return r;
    }))
  });
});

app.post('/acoes', (req, res) => {
  const params = req.body;
  const sql = "INSERT INTO trabalho.ações(Código, Eficácia, Descrição) VALUES (?,?,?)";
  connection.query(sql, [params.Código, params.Eficácia, params.Descrição], (err, resultado, fields) => {
    if(!err) {
      res.json({resultado});
    }
    else {
      console.log("Erro ao adicionar: %s ",err );
    }
  });
});

app.put('/acoes/:pk', (req, res) => {
  const params = req.body;
  const {pk} = req.params;
  const sql = "UPDATE trabalho.ações SET Eficácia=?, Descrição=? WHERE Código=?";
  connection.query(sql, [params.Eficácia, params.Descrição, pk], (err, resultado, fields) => {
    if(!err) {
      res.json({resultado});
    }
    else {
      console.log("Erro ao editar: %s ",err );
    }
  });
});

app.delete('/acoes/:pk', (req, res) => {
  const {pk} = req.params;
  const sql = "DELETE FROM trabalho.ações WHERE ações.Código=?";
  connection.query(sql, [pk], (err, resultado, fields) => {
    if(!err) {
      res.json({resultado});
    }
    else {
      console.log("Erro ao deletar: %s ",err );
    }
  });
});

// Tabela Estado

app.get('/estados', (req, res) => {
  const sql = "SELECT * FROM trabalho.estado";
  connection.query(sql, (err, resultado, fields) => {
    res.send(resultado.map((r) => {
      return r;
    }))
  });
});

app.get('/estados/:pk', (req, res) => {
  const sql = "SELECT * FROM trabalho.estado WHERE UF=?";
  connection.query(sql, [pk], (err, resultado, fields) => {
    res.send(resultado.map((r) => {
      return r;
    }))
  });
});

app.post('/estados', (req, res) => {
  const params = req.body;
  const sql = "INSERT INTO trabalho.estado(UF, População, Quant_postos_saude, Quant_hospitais, ID, RG) VALUES (?,?,?,?,?,?)";
  connection.query(sql, [params.UF, params.População, params.Quant_postos_saude, params.Quant_hospitais, params.ID, params.RG], (err, resultado, fields) => {
    if(!err) {
      res.json({resultado});
    }
    else {
      console.log("Erro ao deletar: %s ",err );
    }
  });
});

app.put('/estados/:pk', (req, res) => {
  const params = req.body;
  const {pk} = req.params;
  const sql = "UPDATE trabalho.estado SET População=?, Quant_postos_saude=?, Quant_hospitais=?, ID=?, RG=? WHERE UF=?";
  connection.query(sql, [params.População, params.Quant_postos_saude, params.Quant_hospitais, params.ID, params.RG, pk], (err, resultado, fields) => {
    if(!err) {
      res.json({resultado});
    }
    else {
      console.log("Erro ao editar: %s ",err );
    }
  });
});

app.delete('/estados/:pk', (req, res) => {
  const {pk} = req.params;
  const sql = "DELETE FROM trabalho.estado WHERE estado.UF=?";
  connection.query(sql, [pk], (err, resultado, fields) => {
    if(!err) {
      res.json({resultado});
    }
    else {
      console.log("Erro ao deletar: %s ",err );
    }
  });
});

// Tabela Posto_de_saúde

app.get('/postos', (req, res) => {
  const sql = "SELECT * FROM trabalho.posto_de_saúde";
  connection.query(sql, (err, resultado, fields) => {
    res.send(resultado.map((r) => {
      return r;
    }))
  });
});

app.get('/postos/:pk', (req, res) => {
  const {pk} = req.params;
  const sql = "SELECT * FROM trabalho.posto_de_saúde WHERE Nome=?";
  connection.query(sql, [pk], (err, resultado, fields) => {
    res.send(resultado.map((r) => {
      return r;
    }))
  });
});

app.post('/postos', (req, res) => {
  const params = req.body;
  const sql = "INSERT INTO trabalho.posto_de_saúde(Nome, CEP, Capacidade_diária, UF) VALUES (?,?,?,?)";
  connection.query(sql, [params.Nome, params.CEP, params.Capacidade_diária, params.UF], (err, resultado, fields) => {
    res.json({resultado});
  });
});

app.put('/postos/:pk', (req, res) => {
  const params = req.body;
  const {pk} = req.params;
  const sql = "UPDATE trabalho.posto_de_saúde SET CEP=?, Capacidade_diária=?, UF=? WHERE Nome=?";
  connection.query(sql, [params.CEP, params.Capacidade_diária, params.UF, pk], (err, resultado, fields) => {
    if(!err) {
      res.json({resultado});
    }
    else {
      console.log("Erro ao editar: %s ",err );
    }
  });
});

app.delete('/postos/:pk', (req, res) => {
  const {pk} = req.params;
  const sql = "DELETE FROM trabalho.posto_de_saúde WHERE posto_de_saúde.Nome=?";
  connection.query(sql, [pk], (err, resultado, fields) => {
    if(!err) {
      res.json({resultado});
    }
    else {
      console.log("Erro ao deletar: %s ",err );
    }
  });
});

// Tabela Hospital

app.get('/hospitais', (req, res) => {
  const sql = "SELECT * FROM trabalho.hospital";
  connection.query(sql, (err, resultado, fields) => {
    res.send(resultado.map((r) => {
      return r;
    }))
  });
});

app.get('/hospitais/:pk', (req, res) => {
  const {pk} = req.params;
  const sql = "SELECT * FROM trabalho.hospital WHERE Nome=?";
  connection.query(sql, [pk], (err, resultado, fields) => {
    res.send(resultado.map((r) => {
      return r;
    }))
  });
});

app.post('/hospitais', (req, res) => {
  const params = req.body;
  const sql = "INSERT INTO trabalho.hospital(Nome, Numero_de_leitos, Taxa_de_ocupação, UF) VALUES (?,?,?,?)";
  connection.query(sql, [params.Nome, params.Numero_de_leitos, params.Taxa_de_ocupação, params.UF], (err, resultado, fields) => {
    res.json({resultado});
  });
});

app.put('/hospitais/:pk', (req, res) => {
  const params = req.body;
  const {pk} = req.params;
  const sql = "UPDATE trabalho.hospital SET Numero_de_leitos=?, Taxa_de_ocupação=?, UF=? WHERE Nome=?";
  connection.query(sql, [params.Numero_de_leitos, params.Taxa_de_ocupação, params.UF, pk], (err, resultado, fields) => {
    if(!err) {
      res.json({resultado});
    }
    else {
      console.log("Erro ao editar: %s ",err );
    }
  });
});

app.delete('/hospitais/:pk', (req, res) => {
  const {pk} = req.params;
  const sql = "DELETE FROM trabalho.hospital WHERE hospital.Nome=?";
  connection.query(sql, [pk], (err, resultado, fields) => {
    if(!err) {
      res.json({resultado});
    }
    else {
      console.log("Erro ao deletar: %s ",err );
    }
  });
});

// Tabela Paciente

app.get('/pacientes', (req, res) => {
  const sql = "SELECT * FROM trabalho.paciente";
  connection.query(sql, (err, resultado, fields) => {
    res.send(resultado.map((r) => {
      return r;
    }))
  });
});

app.get('/pacientes/:pk', (req, res) => {
  const {pk} = req.params;
  const sql = "SELECT * FROM trabalho.paciente WHERE ID=?";
  connection.query(sql, [pk], (err, resultado, fields) => {
    res.send(resultado.map((r) => {
      return r;
    }))
  });
});

app.post('/pacientes', (req, res) => {
  const params = req.body;
  const sql = 'INSERT INTO trabalho.paciente (Sexo, Data_de_Nascimento, Nome) VALUES (?,?,?)';
  connection.query(sql, [params.Sexo, params.Data_de_nascimento, params.Nome], (err, resultado, fields) => {
    if (err) console.log("Error inserting : %s ",err );
    res.json({requestBody: req.body})
  });
});

app.put('/pacientes/:pk', (req, res) => {
  const params = req.body;
  const {pk} = req.params;
  const sql = "UPDATE trabalho.paciente SET Sexo=?, Data_de_Nascimento=?, Nome=? WHERE ID=?";
  connection.query(sql, [params.Sexo, params.Data_de_nascimento, params.Nome, pk], (err, resultado, fields) => {
    if (err) console.log("Erro ao editar : %s ",err );
    res.json({resultado});
  });
});

app.delete('/pacientes/:pk', (req, res) => {
  const {pk} = req.params;
  const sql = "DELETE FROM trabalho.paciente WHERE paciente.ID=?";
  connection.query(sql, [pk], (err, resultado, fields) => {
    if(err) console.log("Erro ao deletar: %s ",err );
    res.json({resultado});
  });
});

// Tabela Testagem

app.get('/testagens', (req, res) => {
  const sql = "SELECT * FROM trabalho.testagem";
  connection.query(sql, (err, resultado, fields) => {
    res.send(resultado.map((r) => {
      return r;
    }))
  });
});

app.get('/testagens/:pk/:fk', (req, res) => {
  const {pk, fk} = req.params;
  const sql = "SELECT * FROM trabalho.testagem WHERE Data_testagem=? AND ID=?";
  connection.query(sql, [pk, fk], (err, resultado, fields) => {
    res.send(resultado.map((r) => {
      return r;
    }))
  });
});

app.post('/testagens', (req, res) => {
  const params = req.body;
  const sql = "INSERT INTO trabalho.testagem (Data_testagem, Tipo, Contaminação, ID, Nome) VALUES (?,?,?,?,?)";
  connection.query(sql, [params.Data_testagem, params.Tipo, params.Contaminação, params.ID, params.Nome], (err, resultado, fields) => {
    if (err) console.log("Error inserting : %s ",err );
    res.json({resultado})
  });
});

app.put('/testagens/:pk/:fk', (req, res) => {
  const params = req.body;
  const {pk, fk} = req.params;
  const sql = "UPDATE trabalho.testagem SET Tipo=?, Contaminação=?, Nome=? WHERE Data_testagem=? AND ID=?";
  connection.query(sql, [params.Tipo, params.Contaminação, params.Nome, pk, fk], (err, resultado, fields) => {
    if (err) console.log("Erro ao editar : %s ",err );
    res.json({resultado});
  });
});

app.delete('/testagens/:pk/:fk', (req, res) => {
  const {pk, fk} = req.params;
  const sql = "DELETE FROM trabalho.testagem WHERE paciente.Data_testagem=? AND paciente.ID=?";
  connection.query(sql, [pk, fk], (err, resultado, fields) => {
    if(err) console.log("Erro ao deletar: %s ",err );
    res.json({resultado});
  });
});

// Tabela Comorbidade

app.get('/comorbidades', (req, res) => {
  const sql = "SELECT * FROM trabalho.comorbidade";
  connection.query(sql, (err, resultado, fields) => {
    res.send(resultado.map((r) => {
      return r;
    }))
  });
});

app.get('/comorbidades/:pk', (req, res) => {
  const {pk} = req.params;
  const sql = "SELECT * FROM trabalho.comorbidade WHERE Tipo=?";
  connection.query(sql, [pk], (err, resultado, fields) => {
    res.send(resultado.map((r) => {
      return r;
    }))
  });
});

app.post('/comorbidades', (req, res) => {
  const params = req.body;
  const sql = "INSERT INTO trabalho.comorbidade(Tipo, Descrição, Gravidade) VALUES (?,?,?)";
  connection.query(sql, [params.Tipo, params.Descrição, params.Gravidade], (err, resultado, fields) => {
    res.json({resultado});
  });
});

app.put('/comorbidades/:pk', (req, res) => {
  const params = req.body;
  const {pk} = req.params;
  const sql = "UPDATE trabalho.comorbidade SET Descrição=?, Gravidade=? WHERE Tipo=?";
  connection.query(sql, [params.Descrição, params.Gravidade, pk], (err, resultado, fields) => {
    if (err) console.log("Erro ao editar : %s ",err );
    res.json({resultado});
  });
});

app.delete('/comorbidades/:pk', (req, res) => {
  const {pk} = req.params;
  const sql = "DELETE FROM trabalho.comorbidade WHERE comorbidade.Tipo=?";
  connection.query(sql, [pk], (err, resultado, fields) => {
    if(err) console.log("Erro ao deletar: %s ",err );
    res.json({resultado});
  });
});

// Tabela Sintoma

app.get('/sintomas', (req, res) => {
  const sql = "SELECT * FROM trabalho.sintoma"
  connection.query(sql, (err, resultado, fields) => {
    res.send(resultado.map((r) => {
      return r;
    }))
  });
});

app.get('/sintomas', (req, res) => {
  const {pk} = req.params;
  const sql = "SELECT * FROM trabalho.sintoma WHERE Tipo=?"
  connection.query(sql, [pk], (err, resultado, fields) => {
    res.send(resultado.map((r) => {
      return r;
    }))
  });
});

app.post('/sintomas', (req, res) => {
  const params = req.body;
  const sql = "INSERT INTO trabalho.sintoma(Tipo, Descrição, Gravidade) VALUES (?,?,?)";
  connection.query(sql, [params.Tipo, params.Descrição, params.Gravidade], (err, resultado, fields) => {
    res.json({resultado});
  });
});

app.put('/sintomas/:pk', (req, res) => {
  const params = req.body;
  const {pk} = req.params;
  const sql = "UPDATE trabalho.sintoma SET Descrição=?, Gravidade=? WHERE Tipo=?";
  connection.query(sql, [params.Descrição, params.Gravidade, pk], (err, resultado, fields) => {
    if (err) console.log("Erro ao editar : %s ",err );
    res.json({resultado});
  });
});

app.delete('/sintomas/:pk', (req, res) => {
  const {pk} = req.params;
  const sql = "DELETE FROM trabalho.sintoma WHERE sintoma.Tipo=?";
  connection.query(sql, [pk], (err, resultado, fields) => {
    if(err) console.log("Erro ao deletar: %s ",err );
    res.json({resultado});
  });
});