function loadTodos(id, item) {
	const itemContainer = document.createElement("LI");
	itemContainer.setAttribute("id", `todo-${value[0]}`);
	itemContainer.setAttribute("class", `list-item`);

	// reload todo container label
	const itemLabel = document.createElement("LABEL");
	itemLabel.setAttribute("for", `${value[0]}`);
	// reloadtodo task as label title.
	itemLabel.setAttribute("title", value[1]);

	// reload todo container checkbox
	const checkBox = document.createElement("INPUT");
	checkBox.setAttribute(
		"aria-label",
		`check the checkbox to mark this task as completed`
	);
	checkBox.type = "checkbox";
	checkBox.setAttribute("id", `${value[0]}`);
	checkBox.setAttribute("class", "list_item");

	// Add checkbox to the label before the text
	itemLabel.appendChild(checkBox);
	itemLabel.appendChild(document.createTextNode(`${value[1]}`));

	// reload todo container delete button.
	const deleteButton = document.createElement("BUTTON");
	deleteButton.type = "button";
	deleteButton.setAttribute("class", "deleteButton");
	deleteButton.setAttribute("id", `${value[0]}`);
	deleteButton.setAttribute("aria-label", "delete task");
	deleteButton.setAttribute("style", "{color:#c90;}");

	// reload logo to delete button using span.
	const deleteSpan = document.createElement("span");
	deleteSpan.classList.add("far", "fa-trash-alt");
	deleteButton.appendChild(deleteSpan);

	// reload label, delete button and checkbox to todo container.
	itemContainer.appendChild(itemLabel);
	itemContainer.appendChild(deleteButton);
	// todoList.appendChild(itemContainer);

	return itemContainer;
}

export default loadTodos;
