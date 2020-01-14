const service = require('./../services')

exports.romanian = (req, res, next) => {
	let number = req.body.number

	if (number === undefined) {
		return res.status(400).json({ message: "Nombre manquant"})
	}
	if (isNaN(number)) {
		return res.status(401).json({ message: "L'argument n'est pas un nombre"})
	}
	if (number <= 0 || number > 100) {
		return res.status(401).json({ message: "Le nombre doit être compris entre 0 et 100"})
	}
	if (!Number.isInteger(number)) {
		return res.status(401).json({ message: "Le nombre doit être un entier"})
	}

	let convertedNumber = service.convertToRomanianNumber(number)

	res.json({ convertedNumber })
}