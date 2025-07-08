namespace AnimationTask {

	type vec2 = {
		x: number,
		y: number
	};

	type ball = {
		element: HTMLSpanElement,
		position: vec2,
		velocity: vec2,
		scale: number
	};

	const balls: ball[] = [];

	window.addEventListener("load", handleLoad);

	function handleLoad(): void {
		for(let i: number = 0; i < 1500; i++) {
			const ball: ball = {
				element: document.createElement("span"),
				position: { x: Math.random() * 1600 + 1, y: Math.random() * 900 + 1},
				velocity: { x: Math.random() * 20 + 1, y: Math.random() * 20 + 1},
				scale: Math.floor(Math.random() * 8 + 3)
			};
			document.body.appendChild(ball.element);
			balls.push(ball);
		}
		move();
	}

	function move(): void {
		for(const ball of balls) {
			ball.position.x += ball.velocity.x;
			ball.position.y += ball.velocity.y;

			ball.position.x = (ball.position.x + window.innerWidth) % window.innerWidth;
			ball.position.y = (ball.position.y + window.innerHeight) % window.innerHeight;
			
			ball.element.style.transform = `matrix(${ball.scale}, 0, 0, ${ball.scale}, ${ball.position.x}, ${ball.position.y})`;
		}
		setTimeout(move, 16.667);
	}
}