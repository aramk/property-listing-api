'use strict';

const expect = require('chai').expect;
const request = require('supertest');
const Q = require('q');
const _ = require('lodash');

const Property = require('@aramk/property-listing-models').Property;

const app = require('../../src/app.js');
const config = require('../../src/config.js');
const propertiesFixture = require('../fixtures/properties-get-all.json');

describe('properties endpoint', () => {

  it('can get properties', function() {
    this.sinon.stub(Property, 'find', () => Q.resolve(propertiesFixture));

    return request(app)
      .get('/properties')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(({body} = response) => {
        expect(Property.find).to.have.been.called;
        expect(body).with.property('properties');
        expect(body).with.property('count', 60);
        const doc = body.properties[0];
        expect(doc).not.with.property(config.MONGOOSE_VERSION_KEY);
        expect(doc).with.property('_id', '58bbe11efe5092cb0b206924');
        expect(doc).with.deep.property('zoopla.listingId', '33119661');
      });
  });

  it('can get a property', function() {
    this.sinon.stub(Property, 'findById', () => Q.resolve(propertiesFixture[0]));

    return request(app)
      .get('/properties/58bbe11efe5092cb0b206924')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(({body} = response) => {
        expect(Property.findById).to.have.been.called;
        expect(body).not.with.property(config.MONGOOSE_VERSION_KEY);
        expect(body).with.property('_id', '58bbe11efe5092cb0b206924');
        expect(body).with.deep.property('zoopla.listingId', '33119661');
      });
  });

  it('can create a property', function() {
    const newProperty = _.cloneDeep(propertiesFixture[0]);
    newProperty._id = 'foo';
    newProperty.zoopla.listingId = 'bar';
    this.sinon.stub(Property, 'create', () => Q.resolve(newProperty));
    
    return request(app)
      .post('/properties')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(newProperty)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(({body} = response) => {
        expect(Property.create).to.have.been.calledWith(newProperty);
        expect(body).not.with.property(config.MONGOOSE_VERSION_KEY);
        expect(body).with.property('_id', 'foo');
        expect(body).with.deep.property('zoopla.listingId', 'bar');
      });
  });

  it('can update a property', function() {
    const newProperty = _.cloneDeep(propertiesFixture[0]);
    const id = newProperty._id;
    newProperty.zoopla.listingId = 'bar2';
    this.sinon.stub(Property, 'findByIdAndUpdate', () => Q.resolve(newProperty));
    
    return request(app)
      .put(`/properties/${id}`)
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send(newProperty)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(({body} = response) => {
        expect(Property.findByIdAndUpdate).to.have.been.calledWith(id, newProperty);
        expect(body).not.with.property(config.MONGOOSE_VERSION_KEY);
        expect(body).with.property('_id', id);
        expect(body).with.deep.property('zoopla.listingId', 'bar2');
      });
  });

  it('can delete a property', function() {
    this.sinon.stub(Property, 'remove', () => Q.resolve());

    return request(app)
      .delete('/properties/58bbe11efe5092cb0b206924')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(({body} = response) => {
        expect(Property.remove).to.have.been.called;
        expect(body).with.property('success', true);
      });
  });

});
