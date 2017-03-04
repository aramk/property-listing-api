const express = require('express');
const app = express();

const properties = require('./properties');

app.use('/properties', properties);

app.listen(3000, function () {
  console.log('App started on port 3000');
});
