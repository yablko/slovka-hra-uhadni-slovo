// BOUNCE WHEN YOU ADD NEW LETTER
const animateTileBounce = (tile) => {
	tile.classList.add('is-filled', 'animate__animated', 'animate__bounceIn')
}

// ROTATE TILE, WHEN YOU SUBMIT AN EXISTING WORD
const animateTileReveal = (row) => {
	row.querySelectorAll('.tile').forEach((tile, index) => {
		tile.classList.remove('animate__bounceIn', 'animate__flipInY')

		setTimeout(() => {
			tile.classList.add('animate__flipInY', `animate__delay-${index}s`)
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