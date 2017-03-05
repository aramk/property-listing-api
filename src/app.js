const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(require('./error-handler')());
app.use(logger());

// Endpoints
app.use('/properties', require('./properties'));

module.exports = app;
