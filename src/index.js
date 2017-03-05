const app = require('./app.js');
const config = require('./config.js');

app.listen(config.PORT, function () {
  console.log('App started on port 3000');
});
