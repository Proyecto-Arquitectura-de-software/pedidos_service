const express = require('express');
const bodyParser = require("body-parser");
const morgan = require('morgan');
const { database } = require('./keys');

// Inicialization
const app = express();


// Setup
app.set('port', 3100);
app.use(bodyParser.json());

// MIddlewares
app.use(morgan('dev'));

// Routes
app.use(require('./routes'));
app.use(require('./routes/pedido'));


app.listen(app.get('port'), () => {
    console.log('Server is on port', app.get('port'));
  });

  /* version: "2"
services:
 pedidos-ms:
  image: 1022407817/pedidos_pedidos-ms:final
  ports:
    - "3100:3100"
  depends_on:
    - db_pedidos
 db_pedidos:
  image: mysql:5.7
  environment:
    MYSQL_ROOT_PASSWORD: Computing0
    MYSQL_DATABASE: db_pedidos
    MYSQL_USER: root
    MYSQL_PASSWORD: Computing0
  ports:
    - "7000:3306"
    */