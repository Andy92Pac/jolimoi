const service = require('./../services')

exports.romanian = async (req, res, next) => {
	res.writeHead(200, {
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache',
		'Connection': 'keep-alive'
	})

	if (req.params.number === undefined) {
		return writeError(res, "Nombre manquant")
	}

	let number = Number(req.params.number)

	if (isNaN(number)) {
		return writeError(res, "L'argument n'est pas un nombre")
	}
	if (number <= 0 || number > 100) {
		return writeError(res, "Le nombre doit être compris entre 0 et 100")
	}
	if (!Number.isInteger(number)) {
		return writeError(res, "Le nombre doit être un entier")
	}

	for (let i=5; i>0; i--) {
		res.write(`event: update\n`)
		res.write(`data: ${JSON.stringify({ secondsToGo: i })}\n\n`)
		await sleep(1000)
	}

	let convertedNumber = service.convertToRomanianNumber(number)

	res.write(`event: result\n`);
	res.write(`data: ${JSON.stringify({convertedNumber})}\n\n`);
	res.end()
}

writeError = (res, errorMessage) => {
	res.write(`id: 0\n`)
	res.write(`data: ${JSON.stringify({ message: errorMessage})}\n\n`)
	res.end()
}

sleep = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
}