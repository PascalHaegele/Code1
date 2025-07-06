"use strict";
var EventInspector;
(function (EventInspector) {
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        const body = document.getElementsByTagName("body")[0];
        const div0 = document.getElementsByTagName("div")[0];
        const div1 = document.getElementsByTagName("div")[1];
        const buttonEvent = new CustomEvent("clickbutton", { bubbles: true });
        const button = document.getElementsByTagName("button")[0];
        document.addEventListener("mousemove", setInfoBox);
        document.addEventListener("click", logInfo);
        document.addEventListener("keyup", logInfo);
        document.addEventListener("clickbutton", logInfo);
        body.addEventListener("click", logInfo);
        body.addEventListener("keyup", logInfo);
        div0.addEventListener("click", logInfo);
        div0.addEventListener("keyup", logInfo);
        div1.addEventListener("click", logInfo);
        div1.addEventListener("keyup", logInfo);
        button.onclick = function () {
            button.dispatchEvent(buttonEvent);
        };
    }
    function setInfoBox(_event) {
        const tooltip = document.getElementById("tooltip");
        tooltip.style.left = `${(_event.x + 10).toString()}px`;
        tooltip.style.top = `${(_event.y + 10).toString()}px`;
        tooltip.innerText = "x:" + _event.x + " y:" + _event.y + "\n" + _event.target;
    }
    function logInfo(_event) {
        console.log("Event Type: " + _event.type + "\n" +
            "Target: " + _event.target + "\n" +
            "Current Target: " + _event.currentTarget + "\n" +
            "Event Object: " + _event);
    }
})(EventInspector || (EventInspector = {}));
//# sourceMappingURL=EventInspector.js.map