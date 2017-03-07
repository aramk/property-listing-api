const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(logger());

// Endpoints
app.use('/properties', require('./properties'));

// Error handler must be added after endpoints to ensure middleware catches.
app.use(require('./error-handler')());

module.exports = app;
