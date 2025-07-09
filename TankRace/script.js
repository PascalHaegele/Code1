"use strict";
var TankRace;
(function (TankRace) {
    window.addEventListener("load", hndLoad);
    const deg2rad = Math.PI / 180;
    const velocity = 300;
    const rotation = 135;
    const keys = {};
    let timePreviousFrame = 0;
    let tank;
    function hndLoad() {
        tank = {
            element: document.createElement("span"),
            position: { x: 100, y: 100 },
            scale: { x: 30, y: 15 },
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
    function hndKeys(_event) {
        const down = _event.type == "keydown";
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
    function update(_time) {
        let timeDelta = _time - timePreviousFrame;
        timeDelta /= 1000;
        processInput();
        move(timeDelta);
        timePreviousFrame = _time;
        requestAnimationFrame(update);
    }
    function processInput() {
        tank.velocity = 0;
        if (checkKey("w") || checkKey("ArrowUp"))
            tank.velocity = velocity;
        if (checkKey("s") || checkKey("ArrowDown"))
            tank.velocity = -velocity / 2;
        if ((checkKey("w") && checkKey("s")) || (checkKey("ArrowUp") && checkKey("ArrowDown")))
            tank.velocity = 0;
        if (checkKey("a") || checkKey("ArrowLeft"))
            tank.rotation -= rotation * deg2rad;
        if (checkKey("d") || checkKey("ArrowRight"))
            tank.rotation += rotation * deg2rad;
    }
    function checkKey(_key) {
        return keys[_key];
    }
    function move(_timeDelta) {
        const radians = tank.rotation * deg2rad;
        tank.position.x += tank.velocity * Math.cos(radians) * _timeDelta;
        tank.position.y += tank.velocity * Math.sin(radians) * _timeDelta;
        const matrix = createMatrix(tank.position, tank.rotation, tank.scale);
        tank.element.style.transform = matrix;
    }
    function createMatrix(_translation, _rotation, _scale) {
        const sin = Math.sin(Math.PI * _rotation / 180);
        const cos = Math.cos(Math.PI * _rotation / 180);
        const matrix = [_scale.x * cos, _scale.x * sin, _scale.y * -sin, _scale.y * cos, _translation.x, _translation.y];
        return "matrix(" + matrix.toString() + ")";
    }
})(TankRace || (TankRace = {}));
//# sourceMappingURL=script.js.map