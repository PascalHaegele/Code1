let rows: number[] = [0, 0, 0, 0];
let activePlayer: number = 1;

function fillRows(): void
{
	for(let i: number = 0; i < rows.length; i++) {
		rows[i] = parseInt(prompt("Enter amount for Row " + (i + 1) + ":")!);
	}

	playGame();
}

function playGame(): void
{
	displayState();
	promptRowAndAmount();
}

function displayState(): void
{
	console.log("Current Turn: Player ", activePlayer);
	for(let i: number = 0; i < rows.length; i++) {
		console.log("Row " + (i + 1) + ":", rows[i]);
	}
}

function promptRowAndAmount(): void
{
	let row: number = 0, amount: number = 0;

	row = parseInt(prompt("Select Row: ")!);
	amount = parseInt(prompt("Select amount: ")!);

	changeState(row, amount);
}

function changeState(_row: number, _amount: number): void
{
	rows[_row - 1] -= _amount;

	if(activePlayer == 1) { activePlayer = 2; }
	else { activePlayer = 1; }

	if(checkWin()) { displayWinner(); }
	else { playGame(); }
}

function checkWin(): boolean
{
	let sum: number = 0;

	for(let i: number = 0; i < rows.length; i++) {
		sum += rows[i];
	}
	return sum == 1;
}

function displayWinner(): void
{
	displayState();

	if(activePlayer == 1) { activePlayer = 2; }
	else { activePlayer = 1; }

	console.log("Player", activePlayer, "Won!");
}
