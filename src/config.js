const environment = require('envobj');

module.exports = environment({
  // NOTE: Also referenced in package.json.
  PORT: 3000,
  MONGOOSE_VERSION_KEY: '__v'
});
