// Const submitButton = document.getElementById("submit");
const submitForm = document.getElementById("todo-form");
const todoList = document.getElementById("todoList");

// Create unique id
// https://stackoverflow.com/questions/3231459/how-can-i-create-unique-ids-with-javascript
function uid() {
	return Date.now().toString(36) + Math.random().toString(36).substring(2);
}
// Todos array
const theTasks = [];

function completedTasks() {
	// Get todo list
	const { children } = todoList;
	const completeTask = children;

	// Check if todo list contains any tasks
	if (completeTask.length === 0) {
		// eslint-disable-next-line no-console
		console.log("no items");
	}

	// Iterate over todo list array. filter and return array todo items checked as complete
	const compTasks = Array.from(completeTask).filter(
		(item) => item.classList[1]
	);

	const result = compTasks.forEach((element) => {
		const [completeLabel] = [...element.children];

		const [completeCheckBox] = [...completeLabel.children];

		if (completeCheckBox.checked) {
			// eslint-disable-next-line no-console
			console.log("item checked as completed");
		} else {
			// eslint-disable-next-line no-console
			console.log("item not checked as completed");
		}
	});

	return result;
}

function moveItem() {
	// Get all list items.
	const { children } = todoList;
	const taskToMove = children;

	// Get completed task list container
	const completedTasksCont = document.querySelector("#complete");

	// Return array of list items with checkbox checked true.
	const taskToMoveList = Array.from(taskToMove).filter((element) =>
		element.childNodes[0].firstChild.checked ? element : false
	);

	// Conditional to prevent uncaught reference error as completedListIt not created yet.
	if (taskToMoveList.length > 0) {
		const [data] = [...taskToMoveList];
		const [completedCheck] = [...data.childNodes];

		//Add completed task to local storage as completed item.
		localStorage.setItem(
			`completed-${completedCheck.firstChild.id}`,
			completedCheck.lastChild.textContent
		);

		// Todo task delete button
		const deleteButton = document.createElement("BUTTON");
		deleteButton.type = "button";
		deleteButton.setAttribute("class", "deleteButton");
		deleteButton.setAttribute("id", `listitem-${uid()}`);
		deleteButton.setAttribute("aria-label", "delete task");

		// Add logo to delete todo button using span
		const deleteSpan = document.createElement("span");
		deleteSpan.classList.add("far", "fa-trash-alt");
		deleteButton.appendChild(deleteSpan);

		// Create new list element
		const completedHeader = document.querySelector("H2");
		completedHeader.classList.remove("hidden");

		const completedListItem = document.createElement("LI");
		completedListItem.setAttribute("class", `list-item`);

		// // add completed check box
		completedListItem.appendChild(completedCheck);
		completedListItem.appendChild(deleteButton);
		completedTasksCont.append(completedListItem);

		// click delete button to remove todo container
		deleteButton.addEventListener("click", () => {
			// check if delete button id matches checkbox id.
			if (deleteButton.id === completedCheck.firstChild.id) {
				//remove todo from local storage
				localStorage.removeItem(`${completedCheck.firstChild.id}`);
			}
		});
	}

	// eslint-disable-next-line no-console
	return console.error("completed item created");
}

function addItemToList(e) {
	e.preventDefault();
	// Get input value remove any whitespace
	const [userInput] = [e.target[0]];
	const itemToAdd = userInput.value.trim();

	// grab error message and hide it
	const errorMessage = document.querySelector(".error");
	errorMessage.classList.add("hidden");

	// display message only if input is empty string
	if (itemToAdd === "") {
		errorMessage.classList.remove("hidden");
		return;
	}

	// Todo task container
	const itemContainer = document.createElement("LI");
	itemContainer.setAttribute("id", `todo-${uid()}`);
	itemContainer.setAttribute("class", `list-item`);

	// Todo task label
	const itemLabel = document.createElement("LABEL");
	itemLabel.setAttribute("for", `listitem-${uid()}`);
	// label - give label matching title of item to add
	itemLabel.setAttribute("title", itemToAdd);

	// Todo task checkbox
	const checkBox = document.createElement("INPUT");
	checkBox.type = "checkbox";
	checkBox.setAttribute(
		"aria-label",
		`check the checkbox to mark this task as completed`
	);
	checkBox.setAttribute("id", `listitem-${uid()}`);
	checkBox.setAttribute("class", "list_item");

	// Add checkbox to the label before the text
	itemLabel.appendChild(checkBox);
	itemLabel.appendChild(document.createTextNode(itemToAdd));

	// Todo task delete button
	const deleteButton = document.createElement("BUTTON");
	deleteButton.type = "button";
	deleteButton.setAttribute("class", "deleteButton");
	deleteButton.setAttribute("id", `listitem-${uid()}`);
	deleteButton.setAttribute("aria-label", "delete task");
	// add logo to delete todo button using span
	const deleteSpan = document.createElement("span");
	deleteSpan.classList.add("far", "fa-trash-alt");
	deleteButton.appendChild(deleteSpan);

	// add value from user input to array to for future use.
	theTasks.push(itemToAdd);

	// add each todo task to local storage
	if (window.localStorage) {
		localStorage.setItem(`listitem-${uid()}`, `${itemToAdd}`);
	}

	// add checkbox, label & delete button to todo list.
	itemContainer.appendChild(itemLabel);
	itemContainer.appendChild(deleteButton);
	todoList.appendChild(itemContainer);

	checkBox.addEventListener("change", (event) => {
		// eslint-disable-next-line no-console
		console.log(event);
		// check if checkbox is checked
		if (checkBox.checked) {
			// add css class
			itemContainer.classList.add("completed");
			// add todo to completed tasks to be added to complete section
			completedTasks();
		} else if (!checkBox.checked) {
			// remove css class
			itemContainer.classList.remove("completed");
		}
	});

	// click delete button to remove todo container
	deleteButton.addEventListener("click", () => {
		// move selected todo to completed section
		moveItem();
		// remove selected todo from todo list container
		itemContainer.remove();
		// check if delete button id matches checkbox id.
		if (deleteButton.id === checkBox.id) {
			// remove todo from local storage
			localStorage.removeItem(`${checkBox.id}`);
		}
	});

	// reset input
	document.getElementById("addItem").value = "";
}

function loadCompletedTasks() {
	// check if local storage has data
	if (window.localStorage) {
		// get todos data from local storage
		const tasks = { ...window.localStorage };

		// return array of todos not checked as completed
		const CompletedTasks = Object.entries(tasks).filter(
			(item) => !item[0].includes("completed")
		);

		// iterate over array of todos not completed and get value array
		CompletedTasks.forEach((value) => {
			// reload todo container
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
			deleteButton.setAttribute("id", value[0]);
			deleteButton.setAttribute("aria-label", "delete task");

			// reload logo to delete button using span.
			const deleteSpan = document.createElement("span");
			deleteSpan.classList.add("far", "fa-trash-alt");
			deleteButton.appendChild(deleteSpan);

			// reload label, delete button and checkbox to todo container.
			itemContainer.appendChild(itemLabel);
			itemContainer.appendChild(deleteButton);
			todoList.appendChild(itemContainer);

			checkBox.addEventListener("change", (event) => {
				event.preventDefault();
				// check if checkbox checked
				if (checkBox.checked) {
					itemContainer.classList.add("completed");
					completedTasks();
				} else if (!checkBox.checked) {
					itemContainer.classList.remove("completed");
				}
			});

			// remove item container
			deleteButton.addEventListener("click", (event) => {
				event.preventDefault();
				moveItem();
				itemContainer.remove();
				// remove item fromm local storage
				if (deleteButton.id === value[0]) {
					localStorage.removeItem(`${value[0]}`);
				}
			});
		});

		// return array of todos checked as completed
		const CompletedTasksList = Object.entries(tasks).filter((item) =>
			item[0].includes("completed")
		);

		// iterate over completed todos and get value array
		CompletedTasksList.forEach((value) => {
			// get completed task container
			const compTasksList = document.querySelector("#complete");

			// create list element
			// remove hidden class to show header
			const compHeader = document.querySelector("H2");
			compHeader.classList.remove("hidden");

			// create todo container
			const itemCont = document.createElement("LI");
			itemCont.setAttribute("id", `todo-${value[0]}`);
			itemCont.setAttribute("class", `list-item`);

			// create todo container lable
			const itemLab = document.createElement("LABEL");
			itemLab.setAttribute("for", `${value[0]}`);
			// give label matching title of item to add
			itemLab.setAttribute("title", value[1]);
			// itemLab.innerHTML = `${value[1]}`;

			// create todo container checkbox
			const compCheckBox = document.createElement("INPUT");
			compCheckBox.setAttribute(
				"aria-label",
				`check the checkbox to mark this task as completed`
			);
			compCheckBox.checked = "true";
			// add todo value to todo lable
			compCheckBox.type = "checkbox";
			compCheckBox.setAttribute("id", `${value[0]}`);
			compCheckBox.setAttribute("class", "list_item");

			// Add checkbox to the label before the text
			itemLab.appendChild(compCheckBox);
			itemLab.appendChild(document.createTextNode(`${value[1]}`));

			// Todo task delete button
			const delButton = document.createElement("BUTTON");
			delButton.type = "button";
			delButton.setAttribute("class", "deleteButton");
			delButton.setAttribute("id", `${value[0]}`);
			delButton.setAttribute("aria-label", "delete task");
			delButton.setAttribute("style", "{color:#c90;}");
			// add logo to delete todo button using span
			const deleteSpan = document.createElement("span");
			deleteSpan.classList.add("far", "fa-trash-alt");
			delButton.appendChild(deleteSpan);

			// append todo container, lable & checkbox to todo item list container
			// itemCont.appendChild(compCheckBox);
			itemCont.appendChild(itemLab);
			itemCont.appendChild(delButton);
			compTasksList.appendChild(itemCont);

			delButton.addEventListener("click", () => {
				// check if delete button id matches local storage id.
				if (delButton.id === `${value[0]}`) {
					// delete todo from local storage permanently
					if (window.localStorage) {
						localStorage.removeItem(`${value[0]}`);
					}
					// remove selected todo from todo list container
					itemCont.remove();
				}
			});
		});
	}

	// reset value
	//document.getElementById("addItem").value = "";
}

// load tasks on page reload
loadCompletedTasks();

// add task to todo list
submitForm.addEventListener("submit", addItemToList);
