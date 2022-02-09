/**
 * CONFIG
 */

// REMOVE ACCENTS
const noAccents = (str) => {
	return str.normalize("NFD").replace(/\p{Diacritic}/gu, "")
}


// CONFETTI
let myConfetti = confetti.create(document.querySelector('canvas'), {
	resize: true,
	useWorker: true
})

myConfetti({
	particleCount: 100,
	spread: 160
})


// MICRO MODAL
MicroModal.init({
	disableFocus: true
})