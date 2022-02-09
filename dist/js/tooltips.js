/**
 * TOOLTIPS
 */

const tooltipElement = document.querySelector('.tooltip')

const tooltip = (text) => {
	if (!text) return

	tooltipElement.innerHTML = text
	tooltipElement.className = 'tooltip animate__animated'

	setTimeout(() => {
		tooltipElement.classList.add('animate__fadeIn')
	}, 0)

	setTimeout(() => {
		tooltipElement.className = 'tooltip animate__animated'
		tooltipElement.classList.add('animate__fadeOut')
	}, 2500)
}

// UNKNOWN WORD TOOLTIP
const tooltipUnknownWord = () => {
	let lastLetter = word.slice(-1).toLowerCase()

	// if (lastLetter === 'y') {
	// 	tooltip("bez množných čísel")
	// }

	if (['y', 'i', 't'].includes(lastLetter)) {
		tooltip("žiadne prídavné mená, slovesá, množné čísla")
	}
	else {
		tooltip('to slovo nepoznám')
	}
}

// TOOLTIP - YOU WON
const tooltipHellYeah = () => {
	setTimeout(() => {
		if (tries === 1) tooltip('WOW!')
		else if (tries === 2 || tries === 3) tooltip('PARÁDA!')
		else if (tries === 4 || tries === 5) tooltip('máš to!')
		else if (tries === 6) tooltip('uff, tesnotka!')
	}, 1500)
}