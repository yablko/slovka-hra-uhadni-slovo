// DATA
const maxWordLength = 5

let word = ''

// KEYBOARD
document.addEventListener('keydown', (event) => {

	if (event.key === 'Enter') {
		submitWord()
	}
	else if (event.key === 'Backspace') {
		removeLetter()
	}
	else {
		addLetter(event.key)
	}

})

// SUBMIT
const submitWord = () => {
	if (word.length !== maxWordLength) return

	alert(word)
}

// ADD LETTER
const addLetter = (character) => {
	if (word.length >= maxWordLength) return

	// allow only letters
	if (/^\p{L}$/u.test(character)) {
		word = word + character
		word = word.toLowerCase()

		let tile = currentTile()
		tile.innerHTML = character
	}

	console.log(word)
}

// REMOVE LETTER
const removeLetter = () => {
	if (word.length <= 0) return

	let tile = currentTile()
	tile.innerHTML = ''

	word = word.slice(0, -1)
	console.log(word)
}

// TILE TO UPDATE
const currentTile = () => {
	return currentRow().querySelector(':nth-child(' + word.length + ')')
}

// CURRENT ROW
const currentRow = () => {
	return document.querySelector('.row')
}