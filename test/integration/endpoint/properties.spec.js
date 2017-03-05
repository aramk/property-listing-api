'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const request = require('supertest');
const Q = require('q');

const Property = require('@aramk/property-listing-models').Property;

const config = require('../../../src/config.js');
const propertiesFixture = require('../../fixtures/properties-get-all.json');

describe('properties endpoint', () => {

  let app;

  before(() => {
    app = require('../../../src/app.js');
    
    sinon.stub(Property, 'find', () => Q.resolve(propertiesFixture));
    sinon.stub(Property, 'findById', () => Q.resolve(propertiesFixture[0]));
  });

  after(() => {
    Property.find.restore();
  });

  it('should get properties', function() {
    return request(app)
      .get('/properties')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(({body} = response) => {
        expect(body).with.property('properties');
        expect(body).with.property('count', 60);
        const doc = body.properties[0];
        expect(doc).not.with.property(config.MONGOOSE_VERSION_KEY);
        expect(doc).with.property('_id', '58bbe11efe5092cb0b206924');
        expect(doc).with.deep.property('zoopla.listingId', '33119661');
      });
  });

  it('should get a single property', function() {
    return request(app)
      .get('/properties/58bbe11efe5092cb0b206924')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(({body} = response) => {
        expect(body).not.with.property(config.MONGOOSE_VERSION_KEY);
        expect(body).with.property('_id', '58bbe11efe5092cb0b206924');
        expect(body).with.deep.property('zoopla.listingId', '33119661');
      });
  });

});

