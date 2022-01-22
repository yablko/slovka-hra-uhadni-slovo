// BOUNCE WHEN YOU ADD NEW LETTER
const animateTileBounce = (tile) => {
	tile.classList.add('is-filled', 'animate__animated', 'animate__bounceIn')
}

// ROTATE TILE, WHEN YOU SUBMIT AN EXISTING WORD
const animateTileReveal = (row) => {
	row.querySelectorAll('.tile').forEach((tile, index) => {
		let tileLetter = word.charAt(index)
		let colorClass = 'wrong'

		if (solution.includes(tileLetter)) {
			if (!lettersInRow.correct.includes(tileLetter)) {
				colorClass = 'present'
			}
		}

		if (solution.charAt(index) === tileLetter) {
			colorClass = 'correct'
		}

		tile.classList.add(colorClass)

		tile.classList.remove('animate__bounceIn', 'animate__flipInY')

		setTimeout(() => {
			tile.classList.add('animate__flipInY', `animate__delay-${index}s`)
		}, 0)
	})
}

// DANCE WHEN YOU WIN!!!
const animateTileDance = (row) => {
	row.querySelectorAll('.tile').forEach((tile, index) => {
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