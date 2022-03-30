"use strict";

var express = require("express");
var site = express();
var bodyParser = require("body-parser");
var fs = require("fs");
var PORT = process.env.port || 8081;

site.use(express.static("./static"));
site.use(bodyParser.urlencoded({ extended: true }));

site.get("/", function (request, response) {
	response.sendFile(__dirname + "/static/index.html");
});

site.get("/guestbook", function (request, response) {
	//var gbook = require("./JSON Guestbook data.json");
	response.sendFile(__dirname + "/static/guestbook.html");
});

site.get("/newmessage", function (request, response) {
	response.sendFile(__dirname + "/static/newmessage.html");
});

site.post("/newentry", function (request, response) {
	const body = request.body;

	try {
		var gbook = require("./JSON Guestbook data.json");
		const id = gbook.length+1;

		const newEntry = {
			id: ""+id,
			username: body.username,
			country: body.country,
			date: new Date().toString(),
			message: body.message,
		}
		gbook.push(newEntry);
		var data = JSON.stringify(gbook);
		fs.writeFileSync("JSON Guestbook data.json",data);
		console.log(gbook);
	} catch (e) {
		console.log(e);
	}
	
	response.status(302).sendFile(__dirname + "/static/guestbook.html");
});

site.get("/ajaxmessage", function (request, response) {
	response.sendFile(__dirname + "/static/ajaxmessage.html");
});

site.get("/json", function (request, response) {
	response.sendFile(__dirname + "/JSON Guestbook data.json");
});

site.get("*", function (request, response) {
	response.status(404).send("Not found");
});

site.listen(PORT, () => {
	console.log("it werks");
})