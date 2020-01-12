submitForm = (event, form) => {
	event.preventDefault()

	fetch('/romain', {
		method: 'POST',
		headers: {'content-type': 'application/json'},
		body: JSON.stringify({
			number: form.number.value
		})
	})
	.then(res => res.json())
	.then(data => {
		document.getElementById("conversionResult").innerHTML = `Le nombre ${form.number.value} s'écrit ${data.convertedNumber} en chiffre romains`;
	})
	.catch(err => {
		alert(err)
	})
}