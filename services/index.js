exports.convertToRomanianNumber = number => {
	const arr = [
	['C', 100],
	['XC', 90],
	['L', 50],
	['XL', 40],
	['X', 10],
	['IX', 9],
	['V', 5],
	['IV', 4],
	['I', 1]
	]

	let convertedNumber = ''

	for (let i=0; i<arr.length; i++) {
		while (number >= arr[i][1]) {
			convertedNumber += arr[i][0]
			number -= arr[i][1]
		}
	}

	return convertedNumber
}