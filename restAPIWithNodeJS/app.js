//Modulos importados:
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')

//Criando nosso app apartir do express que puxamos do modulo express
const app = express();

//Criando nossas rotas, produtos e pedidos
const rotaProdutos = require('./routes/produtos');
const rotaPedidos = require('./routes/pedidos');
const rotaUsuarios = require('./routes/usuarios');

//Usando o morgan (serve para dar o feedback no terminal das consultas que estão ocorrendo)
app.use(morgan('dev'));

app.use('/uploads', express.static('uploads'));

//Aceita apenas dados simples
app.use(bodyParser.urlencoded({ extended: false }));

//Aceita apenas dados em formato json
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Acces-Control-Allow-Origin', '*')
  res.header(
    'Acces-Control-Allow-Header', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );

    if(req.method === 'OPTIONS'){
      res.headers('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
      return res.status(200).send({

      })
    }

    next();
})

//Rotas existentes:
app.use('/produtos', rotaProdutos);
app.use('/pedidos', rotaPedidos); 
app.use('/usuarios', rotaUsuarios);

//Quando não encontra rota, entra aqui:
app.use((req, res, next) =>{
  const erro = new Error('Não Encontrado');
  erro.status = 404;
  next(erro);
});

//Trata a mensagem de erro:
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    erro: {
      mensagem: error.message
    }
  });
  next(error);
});

module.exports = app;