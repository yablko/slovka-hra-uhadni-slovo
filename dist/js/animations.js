/**
 * ANIMATIONS
 */

// ADD NEW LETTER
const animateTileBounce = (tile) => {
    tile.classList.add('is-filled', 'animate__animated', 'animate__bounceIn')
}


// SUBMIT NON-EXISTANT WORD
const animateRowShake = (row) => {
    row.classList.remove('animate__shakeX')

    setTimeout(() => {
        row.classList.add('animate__animated', 'animate__shakeX')
    }, 0)
}


// SUBMIT EXISTING WORD
const animateTileReveal = (row) => {
    row.querySelectorAll('.tile').forEach((tile, index) => {
        tile.classList.remove('animate__bounceIn', 'animate__flipInY')

        setTimeout(() => {
            tile.style.visibility = 'visible'
            tile.classList.add('animate__flipInY', `animate__delay-${index}s`)
        }, 0)
    })
}


// CORRECT WORD!!
const animateTileDance = (row) => {
    row.querySelectorAll('.tile').forEach((tile, index) => {
        tile.innerHTML = solution.charAt(index)
        tile.classList.remove('animate__bounceIn', 'animate__flipInY', 'animate__bounce')

        setTimeout(() => {
            tile.classList.add('animate__bounce', `animate__delay-${index}s`)
        }, 0)
    })
}


// HIGHLIGHT LETTERS
const highlightLetters = () => {
    let presentLetters = []

    // board row
    currentRow()
        .querySelectorAll(".tile")
        .forEach((tile, index) => {
            tile.style.visibility = "hidden"

            let letter = noAccents(word.charAt(index))
            let colorClass = "wrong"

            if (noAccentSolution.includes(letter)) {
                // if a letter is both 'present' and 'correct' only show 'correct'
                // only show each 'present' letter once
                if (!lettersInRow.correct.includes(letter) && !presentLetters.includes(letter)) {
                    colorClass = "present"
                    presentLetters.push(letter)
                }
            }

            if (letter === noAccentSolution.charAt(index)) {
                colorClass = "correct"
            }

            tile.classList.add(colorClass)
        })

    // aplhabet row in footer
    document.querySelectorAll(".keyboard .tile").forEach((tile, index) => {
        let colorClass = ""

        if (lettersInRow.wrong.includes(tile.id)) colorClass = "wrong"
        if (lettersInRow.present.includes(tile.id)) colorClass = "present"
        if (lettersInRow.correct.includes(tile.id)) colorClass = "correct"

        if (colorClass) {
            setTimeout(() => tile.classList.add(colorClass), 1400)
        }
    })
}


// WHOLE BOARD FALLS
const dropTheBoard = () => {
    let boardInside = document.querySelector('.board .inside')
    boardInside.classList.add('animate__animated', 'animate__hinge')

    revealSolution()
}


// SOLUTION APPEARS BEHIND GAME BOARD
const revealSolution = () => {
    let board = document.querySelector('.board')

    setTimeout(() => {
        let h2 = document.createElement('h2')
        h2.classList.add('animate__animated', 'animate__fadeIn')
        h2.innerHTML = solution.toUpperCase()
        board.prepend(h2)
    }, 1750)
}


// FADE OUT KEYBOARD
const fadeOutKeyboard = (variant, delay) => {
    let keyboardDelay = delay || 2500
    let keyboardButtons = document.querySelectorAll('.keyboard .row .tile')

    // fade out all keys
    setTimeout(() => {
        // if you win, keys fade out nicely
        if (variant === 'win') {
            keyboardButtons.forEach(tile =>
                tile.classList.add('animate__animated', 'animate__fadeOutDown')
            )
        }
        // if you lose, keys fall out erratically
        else if (variant === 'lose') {
            keyboardButtons.forEach(tile => {
                let chance = Math.floor(Math.random() * 5) + 1
                tile.classList.add('animate__animated', 'animate__fadeOutDownBig', `animate__delay-${chance}s`)
            })
        }
    }, keyboardDelay)
}


// FADE IN "PLAY AGAIN" BUTTON
const fadeInPlayAgainButton = (delay) => {
    let buttonDelay = delay || 2750

    // again button
    let winnerButton = document.querySelector('.keyboard .winner')

    setTimeout(() => {
        winnerButton.style.display = 'flex'
        winnerButton.classList.add('animate__animated', 'animate__fadeIn')
    }, buttonDelay)
}