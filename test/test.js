process.env.NODE_ENV = 'test';

const expect = require('chai').expect;
const request = require('request');
const EventSource = require("eventsource");
const app = require('../app')

describe('Romanian', () => {
	it('should fail because of missing number', (done) => {
		request.get('http://localhost:3000/romanian'
		, (err, res, body) => {
			expect(res.statusCode).equal(404)
			done()
		})
	})

	it('should fail because of argument not being a number', (done) => {
		const source = new EventSource('http://localhost:3000/romanian/hello')
		
		source.addEventListener('message', function(e) {
			let result = JSON.parse(e.data)
			expect(result.message).equal("L'argument n'est pas un nombre")
			source.close()
			done()
		}, false)
	})

	it('should fail because number is out of bounds', (done) => {
		const source = new EventSource('http://localhost:3000/romanian/200')
		
		source.addEventListener('message', function(e) {
			let result = JSON.parse(e.data)
			expect(result.message).equal("Le nombre doit être compris entre 0 et 100")
			source.close()
			done()
		}, false)
	})

	it('should return correct converted number', (done) => {
		const source = new EventSource('http://localhost:3000/romanian/3')
		
		source.addEventListener('result', function(e) {
			let result = JSON.parse(e.data)
			expect(result.convertedNumber).equal("III")
			source.close()
			done()
		}, false)
	})
})