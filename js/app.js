// DATA
const maxWordLength = 5
const maxTries = 6

let solution = allWords[allWords.length * Math.random() | 0].toLowerCase()
let word = ''
let tries = 1

console.dir(solution)

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

	// is this a real world?
	if (!allWords.includes(word)) {
		animateRowShake(currentRow())
		return
	}

	animateTileReveal(currentRow())

	setTimeout(() => {
		judgeResult()
	}, 1500)
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

		animateTileBounce(tile)
	}

	console.log(word)
}

// REMOVE LETTER
const removeLetter = () => {
	if (word.length <= 0) return

	let tile = currentTile()
	tile.innerHTML = ''
	tile.className = 'tile'

	word = word.slice(0, -1)
	console.log(word)
}

// TILE TO UPDATE
const currentTile = () => {
	return currentRow().querySelector(':nth-child(' + word.length + ')')
}

// CURRENT ROW
const currentRow = () => {
	return document.querySelector('.row:nth-child(' + tries + ')')
}

// JUDGE RESULT
const judgeResult = () => {
	if (word === solution) {
		animateTileDance(currentRow())
	}
	else if (tries >= maxTries) {
		youVeryMuchLose()

		setTimeout(() => {
			alert('riešenie bolo: ' + solution.toUpperCase())
			window.location.reload()
		}, 2000)
	}
	else {
		word = ''
		tries++
	}
}