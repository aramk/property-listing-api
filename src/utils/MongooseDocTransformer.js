const config = require('../config');

module.exports = {

  removeVersionKey(doc) {
    delete doc[config.MONGOOSE_VERSION_KEY];
    return doc;
  }

};
