const service = require('./../services')

exports.romanian = async (req, res, next) => {
	let number = req.body.number

	if (number === undefined) {
		return res.status(400).end(JSON.stringify({ message: "Nombre manquant"}))
	}
	if (isNaN(number)) {
		return res.status(401).end(JSON.stringify({ message: "L'argument n'est pas un nombre"}))
	}
	if (number <= 0 || number > 100) {
		return res.status(401).end(JSON.stringify({ message: "Le nombre doit être compris entre 0 et 100"}))
	}
	if (!Number.isInteger(number)) {
		return res.status(401).end(JSON.stringify({ message: "Le nombre doit être un entier"}))
	}

	res.writeHead(200, {
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache',
		'Connection': 'keep-alive'
	})

	await sleep(10000)

	let convertedNumber = service.convertToRomanianNumber(number)

	return res.end(JSON.stringify({ convertedNumber }))
}

sleep = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
}