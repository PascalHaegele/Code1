namespace TankRace {

	type Vec2 = {
		x: number,
		y: number,
	};

	type Tank = {
		element: HTMLSpanElement,
		position: Vec2,
		scale: Vec2,
		velocity: number,
		rotation: number,
	};

	window.addEventListener("load", hndLoad);

	const deg2rad: number = Math.PI / 180;
	const velocity: number = 300;
	const rotation: number = 135;

	const keys: { [key: string]: boolean } = { };

	let timePreviousFrame: number = 0;
	let tank: Tank;

	function hndLoad(): void {
		tank = {
			element: document.createElement("span"),
			position: { x: 100, y: 100 },
			scale: { x: 30, y: 15}, 
			velocity: 0,
			rotation: 0,
		};
		document.body.appendChild(tank.element);

		//document.body.addEventListener("mousemove", hndMouseMove);
		document.body.addEventListener("keydown", hndKeys);
		document.body.addEventListener("keyup", hndKeys);

		update(0);
	}

	/*function hndMouseMove(_event: MouseEvent): void {
		tank.rotation += _event.movementX * 0.5;
	}*/

	function hndKeys(_event: KeyboardEvent): void {
		const down: boolean = _event.type == "keydown"
		keys[_event.key] = down;

		/*if(_event.key == "w") wPressed = down;
		if(_event.type == "keyup") {
			tank.velocity = 0;
			tank.velocity = 0;
			return;
		}

		switch(_event.key) {
			case "w":
			case "ArrowUp":
				tank.velocity = velocity;
				break;
			case "s":
			case "ArrowDown":
				tank.velocity = -velocity;
				break;
			default: break;
		}*/
	}

	function update(_time: number) {
		let timeDelta: number = _time - timePreviousFrame;
		timeDelta /= 1000;

		processInput();
		move(timeDelta);
		
		timePreviousFrame = _time;
		requestAnimationFrame(update);
	}

	function processInput(): void {
		tank.velocity = 0;
		if(checkKey("w") || checkKey("ArrowUp")) tank.velocity = velocity;
		if(checkKey("s") || checkKey("ArrowDown")) tank.velocity = -velocity / 2;
		if((checkKey("w") && checkKey("s")) || (checkKey("ArrowUp") && checkKey("ArrowDown"))) tank.velocity = 0;
		if(checkKey("a") || checkKey("ArrowLeft")) tank.rotation -= rotation * deg2rad;
		if(checkKey("d") || checkKey("ArrowRight")) tank.rotation += rotation * deg2rad;
	}

	function checkKey(_key: string): boolean {
		return keys[_key];
	}

	function move(_timeDelta: number): void {
		const radians: number = tank.rotation * deg2rad;
		tank.position.x += tank.velocity * Math.cos(radians) * _timeDelta;
		tank.position.y += tank.velocity * Math.sin(radians) * _timeDelta;

		const matrix: string = createMatrix(tank.position, tank.rotation, tank.scale)
		tank.element.style.transform = matrix;
	}

	function createMatrix(_translation: Vec2, _rotation: number, _scale: Vec2): string {
		const sin: number = Math.sin(Math.PI * _rotation / 180);
		const cos: number = Math.cos(Math.PI * _rotation / 180);
		const matrix: number[] = [_scale.x * cos, _scale.x * sin, _scale.y * -sin, _scale.y * cos, _translation.x, _translation.y];

		return "matrix(" + matrix.toString() + ")";
	}
}