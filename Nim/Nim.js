"use strict";
let a = 0, b = 0, c = 0, d = 0;
let activePlayer = 1;
function fillRows() {
    a = parseInt(prompt("Enter amount for Row A: "));
    b = parseInt(prompt("Enter amount for Row B: "));
    c = parseInt(prompt("Enter amount for Row C: "));
    d = parseInt(prompt("Enter amount for Row D: "));
    playGame();
}
function playGame() {
    displayState();
    promptRowAndAmount();
}
function displayState() {
    console.log("Current Turn: Player ", activePlayer);
    console.log("Row A:", a, "\nRow B:", b, "\nRow C:", c, "\nRow D:", d);
}
function promptRowAndAmount() {
    let row = "";
    let amount = 0;
    row = prompt("Select Row: ");
    amount = parseInt(prompt("Select amount: "));
    changeState(row, amount);
}
function changeState(_row, _amount) {
    switch (_row) {
        case "a":
            a -= _amount;
            break;
        case "b":
            b -= _amount;
            break;
        case "c":
            c -= _amount;
            break;
        case "d":
            d -= _amount;
            break;
        default:
            console.log("Invalid Input");
            break;
    }
    if (activePlayer == 1) {
        activePlayer = 2;
    }
    else {
        activePlayer = 1;
    }
    if (checkWin()) {
        displayWinner();
    }
    else {
        playGame();
    }
}
function checkWin() {
    return (a + b + c + d) == 1;
}
function displayWinner() {
    displayState();
    if (activePlayer == 1) {
        activePlayer = 2;
    }
    else {
        activePlayer = 1;
    }
    console.log("Player", activePlayer, "Won!");
}
