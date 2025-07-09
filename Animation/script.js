"use strict";
var AnimationTask;
(function (AnimationTask) {
    const balls = [];
    let point;
    let timePreviousFrame = Date.now();
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        document.body.addEventListener("click", handleClick);
        for (let i = 0; i < 100; i++) {
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
    function createBall(_posX, _posY) {
        const ball = {
            element: document.createElement("span"),
            position: { x: _posX, y: _posY },
            velocity: { x: Math.random() * 20 + 5, y: Math.random() * 20 + 5 },
            scale: Math.floor(Math.random() * 10 + 5)
        };
        balls.push(ball);
        document.body.appendChild(ball.element);
    }
    function move() {
        const timeCurrent = Date.now();
        const timeDelta = (timeCurrent - timePreviousFrame) / 1000;
        for (const ball of balls) {
            ball.position.x += ball.velocity.x * timeDelta;
            ball.position.y += ball.velocity.y * timeDelta;
            ball.position.x = (ball.position.x + window.innerWidth) % window.innerWidth;
            ball.position.y = (ball.position.y + window.innerHeight) % window.innerHeight;
            ball.element.style.transform = `matrix(${ball.scale}, 0, 0, ${ball.scale}, ${ball.position.x}, ${ball.position.y})`;
        }
        const element = document.elementFromPoint(parseInt(point.style.left) + 3, parseInt(point.style.top) + 3);
        if (element?.tagName == "SPAN") {
            console.log(element);
            removeBall(element);
        }
        timePreviousFrame = timeCurrent;
        //setTimeout(move, 16);
        requestAnimationFrame(move);
    }
    function handleClick(_event) {
        const target = _event.target;
        if (target.tagName == "SPAN") {
            removeBall(target);
        }
        else {
            createBall(_event.clientX, _event.clientY);
        }
    }
    function removeBall(_target) {
        document.body.removeChild(_target);
        for (let ball of balls) {
            if (ball.element.parentElement == null)
                balls.splice(balls.indexOf(ball), 1);
        }
    }
})(AnimationTask || (AnimationTask = {}));
//# sourceMappingURL=script.js.map