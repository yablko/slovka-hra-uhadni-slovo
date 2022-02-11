/**
 * APP.JS
 */

// DATA
const maxWordLength = 5
const maxTries = 6

let solution = allWords[(allWords.length * Math.random()) | 0].toLowerCase()
let word = ""
let tries = 1

// no accents (pre slovencinu)
let noAccentWords = allWords.map((x) => noAccents(x))
let noAccentSolution = noAccents(solution)

let canSubmit = true

let lettersInRow = {
    correct: [],
    present: [],
    wrong: [],
}

// TILE TO UPDATE
const currentTile = () => {
    return currentRow().querySelector(`:nth-child(${word.length})`)
}

// ROW WE'RE PLAYING IN
const currentRow = () => {
    return document.querySelector(`.board .row:nth-of-type(${tries})`)
}

// KEY PRESS
document.addEventListener("keydown", (event) => {
    // de-focus any active element (needed for micromodal)
    if ("activeElement" in document) document.activeElement.blur()

    if (event.key === "Enter") {
        submitWord()
    } else if (event.key === "Backspace") {
        removeLetter()
    } else {
        addLetter(event.key)
    }
})

// SUBMIT
const submitWord = () => {
    if (word.length < maxWordLength) return
    if (!canSubmit) return

    // is this a real word ?
    if (!noAccentWords.includes(noAccents(word))) {
        animateRowShake(currentRow())
        tooltipUnknownWord()
        return
    }

    findLettersInRow()
    highlightLetters()
    animateTileReveal(currentRow())

    // can't submit again, while animations are running
    canSubmit = false

    // wait for reveal animation to finish
    setTimeout(judgeResult, 1500)
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
}

// REMOVE LETTER
const removeLetter = () => {
    if (word.length <= 0) return

    let tile = currentTile()
    tile.innerHTML = ""
    tile.className = "tile"

    word = word.slice(0, -1)
}

// JUDGE RESULT
const judgeResult = () => {
    canSubmit = true

    if (noAccents(word) === noAccentSolution) {
        youWin()
    } else if (tries >= maxTries) {
        youLose()
    } else {
        youTryAgain()
    }
}

// YOU WIN
const youWin = () => {
    animateTileDance(currentRow())
    setTimeout(() => confetti(), 1500)
    tooltipHellYeah()
    fadeOutKeyboard('win')
    fadeInPlayAgainButton()
}

// YOU LOSE
const youLose = () => {
    fadeOutKeyboard('lose', 100)
    fadeInPlayAgainButton(1000)
    setTimeout(() => {
        tooltip(`<small>riešenie:</small> <strong>${solution.toUpperCase()}</strong>`, true)
    }, 750)
}

// YOU TRY AGAIN
const youTryAgain = () => {
    word = ""
    tries++
}

// FIND LETTERS IN ROW
const findLettersInRow = () => {
    let present = []
    let correct = []
    let wrong = []

        ;[...word].forEach((letter, index) => {
            letter = noAccents(letter)

            // letter in correct place
            if (letter === noAccentSolution.charAt(index)) {
                correct.push(letter)
            }
            // letter in wrong place
            else if (noAccentSolution.includes(letter)) {
                present.push(letter)
            }
            // wrong letter
            else {
                wrong.push(letter)
            }
        })

    lettersInRow = {
        present,
        correct,
        wrong,
    }
}

// MOBILE
const keyboard = document.querySelector('.keyboard')
keyboard.addEventListener('click', (event) => {
    if (event.target.nodeName !== 'BUTTON') return
    let character = event.target.id

    if (character === 'again') {
        window.location.reload()
    }
    else if (character === '↵') {
        submitWord()
    }
    else if (character === '←') {
        removeLetter()
    }
    else {
        addLetter(character)
    }
})
