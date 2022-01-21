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
	console.log(word);
}

// REMOVE LETTER
const removeLetter = () => {
	word = word.slice(0, -1)
	console.log(word);
}