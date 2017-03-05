const express = require('express')
const router = express.Router();
const Property = require('@aramk/property-listing-models').Property;

const config = require('./config');

router.get('/', function(req, res, next) {
  Property.find().then(properties => {
    res.send({
      properties: properties.map(property => {
        delete property[config.MONGOOSE_VERSION_KEY];
        return property;
      }),
      count: properties.length
    });
  }).catch(next);
});

module.exports = router;
