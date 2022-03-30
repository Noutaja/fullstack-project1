"use strict";

const table = document.querySelector(".table");
const submit = document.querySelector("#submit-btn");

submit.addEventListener("click", sendForm);


function sendForm() {
	const username = document.querySelector("#username-input").value;
	const country = document.querySelector("#country-input").value;
	const message = document.querySelector("#message-input").value;
	if (username.length < 1 || country < 1 || message < 1) return;
	//console.log("%s, %s, %s",username,country,message);
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			console.log(this.responseText);
		} else if (this.readyState == 4 && this.status == 302) {
			location.replace("/guestbook");
		}
	}
	xhttp.open("POST", "/newentry", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("username=" + username + "&country=" + country + "&message=" + message);
}