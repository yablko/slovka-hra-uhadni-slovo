// BOUNCE WHEN YOU ADD NEW LETTER
const animateTileBounce = (tile) => {
	tile.classList.add('is-filled', 'animate__animated', 'animate__bounceIn')
}

// ROTATE TILE, WHEN YOU SUBMIT AN EXISTING WORD
const animateTileReveal = (row) => {
	row.querySelectorAll('.tile').forEach((tile, index) => {
		tile.classList.remove('animate__bounceIn', 'animate__flipInY')

		setTimeout(() => {
			tile.style.visibility = 'visible'
			tile.classList.add('animate__flipInY', `animate__delay-${index}s`)
		}, 0)
	})
}

// DANCE WHEN YOU WIN!!!
const animateTileDance = (row) => {
	row.querySelectorAll('.tile').forEach((tile, index) => {
		tile.innerHTML = solution.charAt(index)

		tile.classList.remove('animate__bounceIn', 'animate__flipInY', 'animate__bounce')

		setTimeout(() => {
			tile.classList.add('animate__bounce', `animate__delay-${index}s`)
		}, 0)
	})
}

// SHAKE WHOLE ROW, WHEN YOU SUBMIT A NON-EXISTANT WORD
const animateRowShake = (row) => {
	row.classList.remove('animate__shakeX')

	setTimeout(() => {
		row.classList.add('animate__animated', 'animate__shakeX')
	}, 0)
}

// GAME OVER
const youVeryMuchLose = () => {
	let board = document.querySelector('.board')
	board.classList.add('animate__animated', 'animate__hinge')
}

// HIGHTLIGHT LETTERS
const highlightLetters = (row) => {
	let lettersToCheck = noAccentSolution.split('')

	row.querySelectorAll('.tile').forEach((tile, index) => {
		tile.style.visibility = 'hidden'

		let letter = noAccents(word.charAt(index))
		let colorClass = 'wrong'

		// the correct letter is in correct the place
		if (lettersToCheck[index] === letter) {
			colorClass = 'correct'
			lettersToCheck[index] = null
		}
		// this letter is present in the solution, but at a different place
		else if (lettersToCheck.indexOf(letter) >= 0) {
			colorClass = 'present'
			lettersToCheck[index] = null
		}

		tile.classList.add(colorClass)
	})

	// keyboard row in footer
	document.querySelectorAll('.keyboard .tile').forEach(tile => {
		let colorClass = ''

		if (lettersInRow.wrong.includes(tile.id)) colorClass = 'wrong'
		if (lettersInRow.present.includes(tile.id)) colorClass = 'present'
		if (lettersInRow.correct.includes(tile.id)) colorClass = 'correct'

		if (colorClass) tile.classList.add(colorClass)
	})
}