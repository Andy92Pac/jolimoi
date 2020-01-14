const expect = require('chai').expect;
const request = require('request');
const app = require('../app')

describe('Romanian', () => {
	it('should fail because of missing number', () => {
		const res = request.post({
			url: 'http://localhost:3000/romanian', 
		}, (err, res, body) => {
			expect(res.statusCode).equal(400)
			expect(JSON.parse(body).message).equal('Nombre manquant')
		})
	})

	it('should fail because of argument not being a number', () => {
		const res = request.post({
			url: 'http://localhost:3000/romanian', 
			headers: {'content-type' : 'application/json'},
			body: JSON.stringify({ number: 'hello' })
		}, (err, res, body) => {
			expect(res.statusCode).equal(401)
			expect(JSON.parse(body).message).equal("L'argument n'est pas un nombre")
		})
	})

	it('should fail because number is out of bounds', () => {
		const res = request.post({
			url: 'http://localhost:3000/romanian', 
			headers: {'content-type' : 'application/json'},
			body: JSON.stringify({ number: 200 })
		}, (err, res, body) => {
			expect(res.statusCode).equal(401)
			expect(JSON.parse(body).message).equal("Le nombre doit être compris entre 0 et 100")
		})
	})

	it('should fail because of number not being an integer', () => {
		const res = request.post({
			url: 'http://localhost:3000/romanian', 
			headers: {'content-type' : 'application/json'},
			body: JSON.stringify({ number: '3' })
		}, (err, res, body) => {
			expect(res.statusCode).equal(401)
			expect(JSON.parse(body).message).equal('Le nombre doit être un entier')
		})
	})

	it('should return correct converted number', () => {
		const res = request.post({
			url: 'http://localhost:3000/romanian', 
			headers: {'content-type' : 'application/json'},
			body: JSON.stringify({ number: 3 })
		}, (err, res, body) => {
			expect(res.statusCode).equal(200)
			expect(JSON.parse(body).convertedNumber).equal('III')
		})
	})

})