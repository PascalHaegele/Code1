function getInput(): void
{
	let diceInput = document.getElementsByClassName("dice") as HTMLCollectionOf<HTMLInputElement>;
	let rollsInput = document.getElementById("rolls") as HTMLInputElement;
	rollDice(parseInt(rollsInput.value), diceInput);
}

function rollDice(_nRolls: number, _dice: HTMLCollectionOf<HTMLInputElement>): void
{
	let rolls: number[] = [];
	let roll: number = 0;
	let sumRoll: number = 0;

	for (let i: number = 0; i < _nRolls; i++) {
		for (let die of _dice) {
			let nDie: number = parseInt(die.value);
			if(nDie == 0) continue;
			while(nDie > 0) {
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

function getStatistics(_rolls: number[]): void
{
	_rolls.sort((a, b) => a - b);

	let total: number = getTotal(_rolls);
	let min: number =_rolls[0];
	let max: number = _rolls[_rolls.length - 1];
	let average: number = getAverage(_rolls);
	let median: number = getMedian(_rolls);

	printStatistics(total, min, max, average, median);
}

function getTotal(_rolls: number[]): number
{
	let total: number = 0;
	for(let i: number = 0; i < _rolls.length; i++) {
		total += _rolls[i];
	}
	return total;
}

function getAverage(_rolls: number[]): number
{
	return Math.floor(getTotal(_rolls) / _rolls.length);
}

function getMedian(_rolls: number[]): number
{
	let median: number = 0;
	if(_rolls.length == 1) {
		median = _rolls[0];
	}
	else if(_rolls.length % 2 == 0) {
		median = (_rolls[_rolls.length / 2 - 1] + _rolls[_rolls.length / 2])
	}
	else {
		median = _rolls[(_rolls.length - 1) / 2];
	}
	return median;
}

function printStatistics(_total: number, _min: number, _max: number, _average: number, _median: number): void
{
	console.log(
		"Total Sum:" + _total +
		"\nMinimal:" + _min +
		"\nMaximal:" + _max +
		"\nAverage:" + _average +
		"\nMedian:" + _median
	);
}