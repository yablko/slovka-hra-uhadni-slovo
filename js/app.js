// DATA
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
	alert(word)
}

// ADD LETTER
const addLetter = (letter) => {
	word = word + letter

	let tile = currentTile()
	tile.innerHTML = letter

	console.log(word);
}

// REMOVE LETTER
const removeLetter = () => {
	let tile = currentTile()
	tile.innerHTML = ''

	word = word.slice(0, -1)
	console.log(word);
}

// TILE TO UPDATE
const currentTile = () => {
	return currentRow().querySelector(':nth-child(' + word.length + ')')
}

// CURRENT ROW
const currentRow = () => {
	return document.querySelector('.row')
}