const player1 = prompt("Player One: Enter Your Name, you will be Blue")
const player1Color = 'rgb(86, 151, 255)'

const player2 = prompt("Player Two: Enter Your Name, you will be Red")
const player2Color = 'rgb(237, 45, 73)'

let table = $('table tr')


const reportWin = (rowNum, colNum) => {
    console.log('You won starting at this row,col')
    console.log(rowNum)
    console.log(colNum)
}

const changeColor = (rowIndex, colIndex, color) => {
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color)
}

const returnColor = (rowIndex, colIndex) => {
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color')
}

const checkBottom = (colIndex) => {
    for(let row = 5; row > -1; row--) {
        const colorReport = returnColor(row, colIndex)
        if (colorReport === 'rgb(128, 128, 128)') {
            return row
        }
    }
}

const colorMatchCheck = (one, two, three, four) => {
    return (one !== undefined) && (one !== 'rgb(128, 128, 128)') && ( one === two) && (one === three) && (one === four)
}

const horizontalWinCheck = () => {
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 4; col++) {
            if (colorMatchCheck(returnColor(row,col), returnColor(row,col+1) ,returnColor(row,col+2), returnColor(row,col+3))) {
                reportWin(row,col);
                return true;
            }
        }
    }
}

const verticalWinCheck = () => {
    for (let col = 0; col < 7; col++) {
        for (let row = 0; row < 3; row++) {
            if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col) ,returnColor(row+2,col), returnColor(row+3,col))) {
                reportWin(row,col);
                return true;
            }
        }
    }
}

function diagonalWinCheck() {
    for (let col = 0; col < 5; col++) {
        for (let row = 0; row < 7; row++) {
            if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1) ,returnColor(row+2,col+2), returnColor(row+3,col+3))) {
                reportWin(row,col);
                return true;
            }else if (colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1) ,returnColor(row-2,col+2), returnColor(row-3,col+3))) {
                reportWin(row,col);
                return true;
            }
        }
    }
}

const gameEnd = (winningPlayer) => {
    for (let col = 0; col < 7; col++) {
        for (let row = 0; row < 7; row++) {
            $('h3').fadeOut('fast');
            $('h2').fadeOut('fast');
            $('h1').text(winningPlayer+" has won! Refresh your browser to play again!").css("fontSize", "50px")
        }
    }
}

let currentPlayer = 1
let currentName = player1
let currentColor = player1Color

$('h3').text(player1+": it is your turn, please pick a column to drop your blue chip.")

$('.board button').on('click', (event) => {

    // Get the Column Index of TD of the Button
    const col = $(event.target).closest("td").index()

    const bottomAvail = checkBottom(col)

    changeColor(bottomAvail,col,currentColor)

    if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
        gameEnd(currentName);
    }

    currentPlayer = currentPlayer * -1

    if (currentPlayer === 1) {
        currentName = player1;
        $('h3').text(currentName + ": it is your turn, please pick a column to drop your blue chip.");
        currentColor = player1Color;
    }else {
        currentName = player2
        $('h3').text(currentName + ": it is your turn, please pick a column to drop your red chip.");
        currentColor = player2Color;
    }
})
