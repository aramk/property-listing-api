# Property Listing API

An API for housing property listings.

## Setup

Default configuration is in `src/config.js` and environment variables will override it.

### Dependencies

Follow the setup in the following repos:

* [aramk/property-listing-models](https://github.com/aramk/property-listing-models)
* [aramk/property-listing-services](https://github.com/aramk/property-listing-services)

For local development, it's best to link the packages above with `npm link`.

## Run

	npm start         # re-execute on changes
	npm run server    # single execution
	
## API

See the endpoint tests in `test/endpoint` for examples.

### Properties

	GET /properties
	GET /properties/:id
	POST /properties
	PUT /properties/:id
	DELETE /properties/:id

## Tests

	npm test              # single execution
	npm run test:watch    # re-execute on changes 

## TODO

* Generate API docs with [rprieto/supersamples](https://github.com/rprieto/supersamples) or similar.
