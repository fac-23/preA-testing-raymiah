function createTodoCompleted(id, item) {
	// create todo container
	const compItemCont = document.createElement("LI");
	compItemCont.setAttribute("id", `todo-${id}`);
	compItemCont.setAttribute("class", `list-item`);

	// create todo container lable
	const compItemLab = document.createElement("LABEL");
	compItemLab.setAttribute("for", `${id}`);
	// give label matching title of item to add
	compItemLab.setAttribute("title", item);

	// create todo container checkbox
	const compItemCheck = document.createElement("INPUT");
	compItemCheck.setAttribute("aria-label", `task marked as completed`);
	compItemCheck.checked = "true";
	// add todo value to todo lable
	compItemCheck.type = "checkbox";
	compItemCheck.setAttribute("id", `${id}`);
	compItemCheck.setAttribute("class", "list_item");

	// Add checkbox to the label before the text
	compItemLab.appendChild(compItemCheck);
	compItemLab.appendChild(document.createTextNode(`${item}`));

	// Todo task delete button
	const compItemDelButton = document.createElement("BUTTON");
	compItemDelButton.type = "button";
	compItemDelButton.setAttribute("class", "deleteButton");
	compItemDelButton.setAttribute("id", `${id}`);
	compItemDelButton.setAttribute("aria-label", "delete task");
	compItemDelButton.setAttribute("style", "{color:#c90;}");
	// add logo to delete todo button using span
	const deleteSpan = document.createElement("span");
	deleteSpan.classList.add("far", "fa-trash-alt");
	compItemDelButton.appendChild(deleteSpan);

	// append todo container, lable & checkbox to todo item list container
	// itemCont.appendChild(compCheckBox);
	compItemCont.appendChild(compItemLab);
	compItemCont.appendChild(compItemDelButton);

	return compItemCont;
}

export default createTodoCompleted;
