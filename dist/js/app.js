// DATA
const maxWordLength = 5;
const maxTries = 6;

let solution = allWords[(allWords.length * Math.random()) | 0].toLowerCase();
let word = "";
let tries = 1;

// no accents (pre slovencinu)
let noAccentWords = allWords.map((x) => noAccents(x));
let noAccentSolution = noAccents(solution);

let lettersInRow = {
	correct: [],
	present: [],
	wrong: [],
};

MicroModal.init({
	disableFocus: true
});

// KEY PRESS
document.addEventListener("keydown", (event) => {
	// de-focus any active element
	if ("activeElement" in document) document.activeElement.blur();

	if (event.key === "Enter") {
		submitWord();
	} else if (event.key === "Backspace") {
		removeLetter();
	} else {
		addLetter(event.key);
	}
});

// SUBMIT
const submitWord = () => {
	if (word.length < maxWordLength) return;

	// is this a real word ?
	if (!noAccentWords.includes(noAccents(word))) {
		animateRowShake(currentRow());
		return;
	}

	findLettersInRow();
	highlightLetters();
	animateTileReveal(currentRow());

	// wait for reveal animation to finish
	setTimeout(() => {
		judgeResult();
	}, 1500);
};

// ADD LETTER
const addLetter = (character) => {
	if (word.length >= maxWordLength) return;

	// allow only letters
	if (/^\p{L}$/u.test(character)) {
		word = word + character;
		word = word.toLowerCase();

		let tile = currentTile();
		tile.innerHTML = character;

		animateTileBounce(tile);
	}

	// console.log(word);
};

// REMOVE LETTER
const removeLetter = () => {
	if (word.length <= 0) return;

	let tile = currentTile();
	tile.innerHTML = "";
	tile.className = "tile";

	word = word.slice(0, -1);
};

// UPDATE THIS TILE
const currentTile = () => {
	return currentRow().querySelector(`:nth-child(${word.length})`);
};

const currentRow = () => {
	return document.querySelector(`.row:nth-child(${tries})`);
};

// JUDGE RESULT
const judgeResult = () => {
	if (noAccents(word) === noAccentSolution) {
		animateTileDance(currentRow());
	} else if (tries >= maxTries) {
		alert(`riešenie bolo: ${solution.toUpperCase()}`);
		youVeryMuchLose();
	} else {
		word = "";
		tries++;
	}
};

// FIND LETTERS IN ROW
const findLettersInRow = () => {
	let present = [];
	let correct = [];
	let wrong = [];

	[...word].forEach((letter, index) => {
		letter = noAccents(letter);

		// letter in correct place
		if (letter === noAccentSolution.charAt(index)) {
			correct.push(letter);
		}
		// letter in wrong place
		else if (noAccentSolution.includes(letter)) {
			present.push(letter);
		}
		// wrong letter
		else {
			wrong.push(letter);
		}
	});

	lettersInRow = {
		present,
		correct,
		wrong,
	};
};

// HIGHLIGHT LETTERS
const highlightLetters = () => {
	let presentLetters = [];

	// board row
	currentRow()
		.querySelectorAll(".tile")
		.forEach((tile, index) => {
			tile.style.visibility = "hidden";

			let letter = noAccents(word.charAt(index));
			let colorClass = "wrong";

			if (noAccentSolution.includes(letter)) {
				// if a letter is both 'present' and 'correct' only show 'correct'
				// only show each 'present' letter once
				if (!lettersInRow.correct.includes(letter) && !presentLetters.includes(letter)) {
					colorClass = "present";
					presentLetters.push(letter);
				}
			}

			if (letter === noAccentSolution.charAt(index)) {
				colorClass = "correct";
			}

			tile.classList.add(colorClass);
		});

	// aplhabet row in footer
	document.querySelectorAll(".keyboard .tile").forEach((tile, index) => {
		let colorClass = "";

		if (lettersInRow.wrong.includes(tile.id)) colorClass = "wrong";
		if (lettersInRow.present.includes(tile.id)) colorClass = "present";
		if (lettersInRow.correct.includes(tile.id)) colorClass = "correct";

		if (colorClass) tile.classList.add(colorClass);
	});
};

// REMOVE ACCENTS
function noAccents(str) {
	return str.normalize("NFD").replace(/\p{Diacritic}/gu, "");
}

// MOBILE
const keyboard = document.querySelector('.keyboard');
keyboard.addEventListener('click', (event) => {
	if (event.target.nodeName !== 'BUTTON') return; // clicked on link?
	let character = event.target.id;

	if ( character === '↵' ) {
		submitWord();
	}
	else if ( character === '←' ) {
		removeLetter();
	}
	else {
		addLetter(character);
	}
});