namespace EventInspector {
	
	window.addEventListener("load", handleLoad);
	
	function handleLoad(): void {
		const body = document.getElementsByTagName("body")[0];
		const div0 = document.getElementsByTagName("div")[0];
		const div1 = document.getElementsByTagName("div")[1];
		
		const buttonEvent: CustomEvent = new CustomEvent("buttonclick", { bubbles: true });
		const button: HTMLButtonElement = document.getElementsByTagName("button")[0];
		
		document.addEventListener("mousemove", setInfoBox);
		document.addEventListener("click", logInfo);
		document.addEventListener("keyup", logInfo);
		
		body.addEventListener("click", logInfo);
		body.addEventListener("keyup", logInfo);
		
		div0.addEventListener("click", logInfo);
		div0.addEventListener("keyup", logInfo);
		
		div1.addEventListener("click", logInfo);
		div1.addEventListener("keyup", logInfo);
		
		document.addEventListener("buttonclick", logInfo);
		
		button.onclick = function(){
			button.dispatchEvent(buttonEvent);
		}
	}

	function setInfoBox(_event: MouseEvent): void {
		const tooltip = document.getElementById("tooltip");

		tooltip!.style.left = `${(_event.x + 10).toString()}px`;
		tooltip!.style.top = `${(_event.y + 10).toString()}px`;

		tooltip!.innerText = "x:" + _event.x + " y:" + _event.y + "\n" + _event.target;
	}

	function logInfo(_event: Event): void {
		console.log(
			"Event Type: " + _event.type + "\n" +
			"Target: " + _event.target + "\n" +
			"Current Target: " + _event.currentTarget + "\n" +
			"Event Object: " + _event
		);
	}

}