//Modulos
const http = require('http');
const app = require('./app');

//A porta do nosso server
const port = process.env.PORT || 3000;

//Iniciando o server 
const server = http.createServer(app);

//Faz o server ouvir
server.listen(port);
