const express = require('express');
const path = require('path');
const mountRoutes = require('./routes');

const app = express();

// statically serve folder
app.use('/', express.static(__dirname + '/dist'));

// plug in router
mountRoutes(app);

// start server
app.listen(8080, '127.0.0.1');
