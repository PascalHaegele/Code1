"use strict";
function getInput() {
    let diceInput = document.getElementsByClassName("dice");
    let rollsInput = document.getElementById("rolls");
    rollDice(parseInt(rollsInput.value), diceInput);
}
function rollDice(_nRolls, _dice) {
    let rolls = [];
    let roll = 0;
    let sumRoll = 0;
    for (let i = 0; i < _nRolls; i++) {
        for (let die of _dice) {
            let nDie = parseInt(die.value);
            if (nDie == 0)
                continue;
            while (nDie > 0) {
                roll = Math.floor(Math.random() * parseInt(die.id)) + 1;
                sumRoll += roll;
                nDie--;
            }
        }
        rolls.push(sumRoll);
        sumRoll = 0;
    }
    getStatistics(rolls);
}
function getStatistics(_rolls) {
    _rolls.sort((a, b) => a - b);
    let total = getTotal(_rolls);
    let min = _rolls[0];
    let max = _rolls[_rolls.length - 1];
    let average = getAverage(_rolls);
    let median = getMedian(_rolls);
    printStatistics(total, min, max, average, median);
}
function getTotal(_rolls) {
    let total = 0;
    for (let i = 0; i < _rolls.length; i++) {
        total += _rolls[i];
    }
    return total;
}
function getAverage(_rolls) {
    return Math.floor(getTotal(_rolls) / _rolls.length);
}
function getMedian(_rolls) {
    let median = 0;
    if (_rolls.length == 1) {
        median = _rolls[0];
    }
    else if (_rolls.length % 2 == 0) {
        median = (_rolls[_rolls.length / 2 - 1] + _rolls[_rolls.length / 2]);
    }
    else {
        median = _rolls[(_rolls.length - 1) / 2];
    }
    return median;
}
function printStatistics(_total, _min, _max, _average, _median) {
    console.log("Total Sum:" + _total +
        "\nMinimal:" + _min +
        "\nMaximal:" + _max +
        "\nAverage:" + _average +
        "\nMedian:" + _median);
}
//# sourceMappingURL=Dice.js.map