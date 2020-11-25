const app = require('express')();

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: ''
});

app.get('/governadores', (req, res) => {
  connection.query('select * from trabalho.governador', (err, resultado, fields) => {
    res.send(resultado.map((r) => {
      return r.RG;
    }))
  });
});


// app.get('/bla', (req, res) => {
//   connection.query('select * from trabalho.governador', (err, resultado, fields) => {
//     res.send(resultado.map((r) => {
//       return r.RG;
//     }))
//   });
// });

app.listen(8080);