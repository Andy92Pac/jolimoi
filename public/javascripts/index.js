submitForm = (event, form) => {
	event.preventDefault()

	let number = Number(form.number.value)

	if (number === undefined) {
		return alert("Nombre manquant")
	}
	if (isNaN(number)) {
		return alert("L'argument n'est pas un nombre")
	}
	if (number <= 0 || number > 100) {
		return alert("Le nombre doit être compris entre 0 et 100")
	}

	fetch('/romanian', {
		method: 'POST',
		headers: {'content-type': 'application/json'},
		body: JSON.stringify({
			number
		})
	})
	.then(async res => {
		if (res.status === 400 || res.status === 401) {
			res = await res.json()
			throw res.message
		}
		return res.json()
	})
	.then(data => {
		document.getElementById("conversionResult").innerHTML = `Le nombre ${form.number.value} s'écrit ${data.convertedNumber} en chiffre romains`;
	})
	.catch(err => {
		alert(err)
	})
}