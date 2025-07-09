namespace AnimationTask {

	type Vec2 = {
		x: number,
		y: number
	};

	type Ball = {
		element: HTMLSpanElement,
		position: Vec2,
		velocity: Vec2,
		scale: number,
	};

	const balls: Ball[] = [];
	let point: HTMLDivElement;

	let timePreviousFrame: number = Date.now();

	window.addEventListener("load", handleLoad);

	function handleLoad(): void {
		document.body.addEventListener("click", handleClick);

		for(let i: number = 0; i < 100; i++) {
			createBall(Math.random() * 1600 + 1, Math.random() * 900 + 1);
		}

		point = document.createElement("div");
		document.body.appendChild(point);
		point.style.position = "fixed";
		point.style.width = "6px";
		point.style.height = "6px";
		point.style.backgroundColor = "red";
		point.style.top = "397px";
		point.style.left = "397px";

		move();
	}

	function createBall(_posX: number, _posY: number) {
		const ball: Ball = {
				element: document.createElement("span"),
				position: { x: _posX, y: _posY },
				velocity: { x: Math.random() * 20 + 5, y: Math.random() * 20 + 5},
				scale: Math.floor(Math.random() * 10 + 5)
			};

			balls.push(ball);
			document.body.appendChild(ball.element);
	}

	function move(): void {
		const timeCurrent: number = Date.now();
		const timeDelta: number = (timeCurrent - timePreviousFrame) / 1000;

		for(const ball of balls) {
			ball.position.x += ball.velocity.x * timeDelta;
			ball.position.y += ball.velocity.y * timeDelta;

			ball.position.x = (ball.position.x + window.innerWidth) % window.innerWidth;
			ball.position.y = (ball.position.y + window.innerHeight) % window.innerHeight;
			
			ball.element.style.transform = `matrix(${ball.scale}, 0, 0, ${ball.scale}, ${ball.position.x}, ${ball.position.y})`;
		}

		const element: Element | null = document.elementFromPoint(parseInt(point.style.left) + 3, parseInt(point.style.top) + 3); 
		if(element?.tagName == "SPAN") {
			console.log(element);
			removeBall(<HTMLSpanElement>element);
		}

		timePreviousFrame = timeCurrent;
		//setTimeout(move, 16);
		requestAnimationFrame(move);
	}

	function handleClick(_event: MouseEvent): void {
		const target = <HTMLElement> _event.target;
		if(target.tagName == "SPAN") {
			removeBall(target);
		}
		else {
			createBall(_event.clientX, _event.clientY);
		}
	}

	function removeBall(_target: HTMLSpanElement): void {
		document.body.removeChild(_target);
		for(let ball of balls) {
			if(ball.element.parentElement == null) balls.splice(balls.indexOf(ball), 1);
		}
	}
}