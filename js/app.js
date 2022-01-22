// DATA
const maxWordLength = 5
const maxTries = 6

let word = ''
let tries = 1

let solution = allWords[allWords.length * Math.random() | 0].toLowerCase()
let noAccentSolution = noAccents(solution)
let noAccentWords = allWords.map(x => noAccents(x))

let lettersInRow = {
	correct: [],
	present: [],
	wrong: []
}

// console.log(solution)

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
	if (!noAccentWords.includes(noAccents(word))) {
		animateRowShake(currentRow())
		return
	}

	findLettersInRow()
	highlightLetters(currentRow())
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

	// console.log(word)
}

// REMOVE LETTER
const removeLetter = () => {
	if (word.length <= 0) return

	let tile = currentTile()
	tile.innerHTML = ''
	tile.className = 'tile'

	word = word.slice(0, -1)
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
	if (noAccents(word) === noAccentSolution) {
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

// FIND ALL LETTERS FOR CURRENT ROW
const findLettersInRow = () => {
	let present = [];
	let correct = [];
	let wrong = [];

	[...word].forEach((letter, index) => {
		letter = noAccents(letter)

		// letter in correct place
		if (noAccentSolution.charAt(index) === letter) {
			correct.push(letter)
		}
		// letter in wrong place
		else if (noAccentSolution.includes(letter)) {
			present.push(letter)
		}
		// wrong number
		else {
			wrong.push(letter)
		}
	})

	lettersInRow = {
		present,
		correct,
		wrong
	}
}

// REMOVE ACCENTS
function noAccents (str) {
	return str.normalize("NFD").replace(/\p{Diacritic}/gu, "");
}