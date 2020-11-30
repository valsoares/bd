## :pushpin: Objetivo
> Repositório para o trabalho da disciplina de Banco de Dados.

## :books: Conteúdos
`Trabalho_BD.sql`
> 1. Código em MySQL da criação do banco de dados;
> 2. Código em MySQL da inserção dos registros em cada tabela; 
> 3. Código em MySQL da criação da view;
> 4. Código em MySQL da criação da procedure; 
> 5. Código em MySQL da criação de cinco consultas em algébra relacional.

`app.js`
> Código em Javascript da criação das funções GET, POST, PUT e DELETE para cada tabela.

`interface`
> Essa pasta contém a construção da interface em ReactJS para o acesso das tabelas do banco de dados, as tabelas estão listadas e é possível a inserção, a edição e a remoção de seus registros.

## :wrench: Acesso à aplicação
No arquivo `app.js` é necessário configurar as credenciais para o acesso do banco de dados criado 
```javascript

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'senha'
});

```
É necessário acessar a pasta onde está o arquivo `app.js` (nesse caso é a pasta inicial do repositório) pelo terminal e dar o seguinte comando 
```
node app.js
```
Em outro terminal deve-se acessar a pasta `interface` e dar os seguintes comandos
```
npm install
```
```
npm start
```
