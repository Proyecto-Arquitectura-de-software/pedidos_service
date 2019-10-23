const express = require('express');
const bodyParser = require("body-parser");
const morgan = require('morgan');
const { database } = require('./keys');

// Inicialization
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');

  // authorized headers for preflight requests
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();

  app.options('*', (req, res) => {
      // allowed XHR methods  
      res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
      res.send();
  });
});


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
