"use strict";
let rows = [0, 0, 0, 0];
let activePlayer = 1;
function fillRows() {
    for (let i = 0; i < rows.length; i++) {
        rows[i] = parseInt(prompt("Enter amount for Row " + (i + 1) + ":"));
    }
    playGame();
}
function playGame() {
    displayState();
    promptRowAndAmount();
}
function displayState() {
    console.log("Current Turn: Player ", activePlayer);
    for (let i = 0; i < rows.length; i++) {
        console.log("Row " + (i + 1) + ":", rows[i]);
    }
}
function promptRowAndAmount() {
    let row = 0, amount = 0;
    row = parseInt(prompt("Select Row: "));
    amount = parseInt(prompt("Select amount: "));
    changeState(row, amount);
}
function changeState(_row, _amount) {
    rows[_row - 1] -= _amount;
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
    let sum = 0;
    for (let i = 0; i < rows.length; i++) {
        sum += rows[i];
    }
    return sum == 1;
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
