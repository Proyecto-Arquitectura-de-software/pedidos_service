const express = require('express');
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cors = require('cors');

// Inicialization
const app = express();


// Setup
app.set('port', 3100);
app.use(cors());
app.use(bodyParser.json());

// MIddlewares
app.use(morgan('dev'));

// Routes
app.use(require('./routes'));
app.use(require('./routes/pedido'));


app.listen(app.get('port'), () => {
    console.log('Server is on port', app.get('port'));
  });
