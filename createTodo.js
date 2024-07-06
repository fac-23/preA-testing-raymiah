function createTodo(id, item) {
	// Todo task container
	const itemContainer = document.createElement("LI");
	itemContainer.setAttribute("id", `todo-${id}`);
	itemContainer.setAttribute("class", `list-item`);

	// Todo task label
	const itemLabel = document.createElement("LABEL");
	itemLabel.setAttribute("for", `listitem-${id}`);
	// label - give label matching title of item to add
	itemLabel.setAttribute("title", item);

	// Todo task checkbox
	const checkBox = document.createElement("INPUT");
	checkBox.type = "checkbox";
	checkBox.setAttribute(
		"aria-label",
		`check the checkbox to mark this task as completed`
	);
	checkBox.setAttribute("id", `listitem-${id}`);
	checkBox.setAttribute("class", "list_item");

	// Add checkbox to the label before the text
	itemLabel.appendChild(checkBox);
	itemLabel.appendChild(document.createTextNode(item));

	// Todo task delete button
	const deleteButton = document.createElement("BUTTON");
	deleteButton.type = "button";
	deleteButton.setAttribute("class", "deleteButton");
	deleteButton.setAttribute("id", `listitem-${id}`);
	deleteButton.setAttribute("aria-label", "delete task");
	// add logo to delete todo button using span
	const deleteSpan = document.createElement("span");
	deleteSpan.classList.add("far", "fa-trash-alt");
	deleteButton.appendChild(deleteSpan);

	// add each todo task to local storage
	if (window.localStorage) {
		localStorage.setItem(`listitem-${id}`, `${item}`);
	}

	// add checkbox, label & delete button to todo list.
	itemContainer.appendChild(itemLabel);
	itemContainer.appendChild(deleteButton);
	// todoList.appendChild(itemContainer);

	return itemContainer;
}

export default createTodo;
