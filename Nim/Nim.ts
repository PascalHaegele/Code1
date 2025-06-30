let a: number = 0, b: number = 0, c: number = 0, d: number = 0;
let activePlayer: number = 1;



function fillRows(): void
{
	a = parseInt(prompt("Enter amount for Row A: ")!);
	b = parseInt(prompt("Enter amount for Row B: ")!);
	c = parseInt(prompt("Enter amount for Row C: ")!);
	d = parseInt(prompt("Enter amount for Row D: ")!);

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
	console.log("Row A:", a, "\nRow B:", b, "\nRow C:", c, "\nRow D:", d);
}

function promptRowAndAmount(): void
{
	let row: string = "";
	let amount: number = 0;

	row = prompt("Select Row: ")!;
	amount = parseInt(prompt("Select amount: ")!);

	changeState(row, amount);
}

function changeState(_row: string, _amount: number): void
{
	switch(_row) {
		case "a": a -= _amount; break;
		case "b": b -= _amount; break;
		case "c": c -= _amount; break;
		case "d": d -= _amount; break;
		default:
			console.log("Invalid Input");
			break;
	}

	if(activePlayer == 1) { activePlayer = 2; }
	else { activePlayer = 1; }

	if(checkWin()) { displayWinner(); }
	else { playGame(); }
}

function checkWin(): boolean
{
	return (a + b + c + d) == 1;
}

function displayWinner(): void
{
	displayState();

	if(activePlayer == 1) { activePlayer = 2; }
	else { activePlayer = 1; }

	console.log("Player", activePlayer, "Won!");
}
