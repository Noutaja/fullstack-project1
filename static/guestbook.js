"use strict";

const table = document.querySelector(".table");


populateTable();

function populateTable() {
	fetch("/json")
		.then(response => response.json())
		.then(data => {
			const tableContent = table.children[1];
			for (let i in data) {
				const row = data[i];

				const tableRow = document.createElement("tr");
				tableContent.appendChild(tableRow);

				tableRow.appendChild(createTableCell(row.id));
				tableRow.appendChild(createTableCell(row.username));
				tableRow.appendChild(createTableCell(row.country));
				tableRow.appendChild(createTableCell(row.date));
				tableRow.appendChild(createTableCell(row.message));
			}
		});
}

function createTableCell(text) {
	const element = document.createElement("td");
	element.innerHTML = text;
	return element;
}