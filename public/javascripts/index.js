const submitButton = document.getElementById('submit')

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

	if (!!window.EventSource) {
		const source = new EventSource(`/romanian/${number}`)

		source.addEventListener('message', function(e) {
			submitButton.disabled = false
			let result = JSON.parse(e.data)
			alert(result.message)
			source.close()
		}, false)

		source.addEventListener('update', function(e) {
			let result = JSON.parse(e.data)
			document.getElementById("conversionResult").innerHTML = `Le résultat sera disponible dans ${result.secondsToGo} secondes`;
		}, false)

		source.addEventListener('result', function(e) {
			submitButton.disabled = false
			let result = JSON.parse(e.data)
			document.getElementById("conversionResult").innerHTML = `Le nombre ${form.number.value} s'écrit ${result.convertedNumber} en chiffre romains`;
			source.close()
		}, false)

		source.addEventListener('open', function(e) {
			submitButton.disabled = true
		}, false)

		source.addEventListener('error', function(e) {
			submitButton.disabled = false
			alert("Erreur lors de la connexion avec le serveur")
		}, false)
	} else {
		alert("Votre navigateur ne supporte pas les SSE")
	}
}