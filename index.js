const submitButton = document.getElementById("submit");
const todoList = document.getElementById("todoList");

let idx = 0;
const theLibrary = {};

const completedTasks = () => {
	// complete tasks
	// eslint-disable-next-line prefer-destructuring
	const completeTask = todoList.children;

	if (completeTask.length === 0) {
		// eslint-disable-next-line no-console
		console.log("no items");
	}

	// eslint-disable-next-line no-plusplus
	for (let i = 0; i < completeTask.length; i++) {
		// get label
		// eslint-disable-next-line prefer-destructuring
		const completeLabel = completeTask[i].childNodes[1];

		// get checkbox
		// eslint-disable-next-line prefer-destructuring
		const completeCheckBox = completeTask[i].childNodes[0];

		completeLabel.addEventListener("click", () => {
			// eslint-disable-next-line no-console
			console.log("label clicked");
		});

		completeCheckBox.addEventListener("change", () => {
			if (completeCheckBox.checked) {
				// eslint-disable-next-line no-console
				console.log("item checked as completed");
			} else {
				// eslint-disable-next-line no-console
				console.log("item not checked as completed");
			}
		});
	}
};

const moveItem = () => {
	// get all list items.
	// eslint-disable-next-line prefer-destructuring
	const taskToDelete = document.querySelector("#todoList").children;

	// get completed task container
	const completedTasksList = document.querySelector("#complete");

	// filter out list item with check box checked and return item
	const completedListIt = Array.from(taskToDelete).filter((element) =>
		element.childNodes[0].checked ? element : false
	);

	// conditional to prevent uncaught reference error as completedListIt not created yet.
	if (completedListIt.length > 0) {
		// get checkbox
		// eslint-disable-next-line prefer-destructuring
		const completedCheck = completedListIt[0].childNodes[0];

		// get label
		// eslint-disable-next-line prefer-destructuring
		const completedLabel = completedListIt[0].childNodes[1];

		// create new list element
		const completedHeader = document.querySelector("H2");
		completedHeader.classList.remove("hidden");
		const completedListItem = document.createElement("LI");
		completedListItem.setAttribute("class", `list-item`);
		// // add completed check box
		completedListItem.appendChild(completedCheck);
		// // add label (strikethrough not showing)
		completedListItem.appendChild(completedLabel);
		// add completed list item to completed section
		completedTasksList.append(completedListItem);
	}

	// eslint-disable-next-line no-console
	return console.error("completed item not created yet");
};

const addItemToList = (e) => {
	e.preventDefault();

	// get input value
	const itemToAdd = document.getElementById("addItem").value.trim();

	// grab error message and hide it
	const errorMessage = document.querySelector(".error");
	errorMessage.classList.add("hidden");

	// Todo container with lable, checkbox and delete button
	const itemContainer = document.createElement("LI");
	itemContainer.setAttribute("class", `list-item`);

	// todo label
	const itemLabel = document.createElement("LABEL");
	itemLabel.setAttribute("for", `listitem-${idx}`);

	// todo checkbox
	const checkBox = document.createElement("INPUT");
	checkBox.setAttribute(
		"aria-label",
		`check the checkbox to mark this task as completed`
	);

	// display message only if input is empty string
	if (itemToAdd === "") {
		errorMessage.classList.remove("hidden");
		return;
	}

	// add value from user input to object
	theLibrary[itemToAdd] = itemToAdd;

	// eslint-disable-next-line no-console
	console.log(theLibrary);

	// add object with tasks to local storage
	if (window.localStorage) {
		// stringyfy object with tasks - local storage only accepts strings
		localStorage.setItem("list-Items", JSON.stringify(theLibrary));
	}

	// label - give label matching title of item to add
	itemLabel.setAttribute("title", itemToAdd);

	// todo delete button
	const deleteButton = document.createElement("BUTTON");
	deleteButton.type = "button";
	deleteButton.setAttribute("class", "deleteButton");
	deleteButton.setAttribute("aria-label", "delete task");

	// add logo to delete todo button using span
	const deleteSpan = document.createElement("span");
	deleteSpan.classList.add("far", "fa-trash-alt");
	deleteButton.appendChild(deleteSpan);

	// get tasks from local storage
	let tasks = localStorage.getItem("list-Items");

	// check if localstorage has tasks. if not return empty object
	// if so, parse stringyfied object into an object
	if (tasks) {
		tasks = JSON.parse(tasks);
		// eslint-disable-next-line no-console
		console.log(tasks);
	} else {
		tasks = {};
	}

	// add todo task text to todo label;
	// eslint-disable-next-line prefer-destructuring
	itemLabel.innerHTML = tasks[itemToAdd];

	// add todo container to todo list.
	itemContainer.appendChild(checkBox);
	itemContainer.appendChild(itemLabel);
	itemContainer.appendChild(deleteButton);
	todoList.appendChild(itemContainer);

	checkBox.type = "checkbox";
	checkBox.setAttribute("id", `listitem-${idx}`);
	checkBox.setAttribute("class", "list_item");

	// see if checkbox is checked
	checkBox.addEventListener("change", () => {
		if (checkBox.checked) {
			itemContainer.classList.add("completed");
		} else if (!checkBox.checked) {
			itemContainer.classList.remove("completed");
		}
	});

	// click delete button to remove item container
	deleteButton.addEventListener("click", () => {
		// move item to completed section
		moveItem();
		itemContainer.remove();
		// check if delete button matches todo task.
		if (deleteButton.id === itemToAdd) {
			// delete todo task from task object
			delete tasks[itemToAdd];
			// eslint-disable-next-line no-console
			console.log(tasks);
			if (window.localStorage) {
				// add updated task object to local storage
				localStorage.setItem("list-Items", JSON.stringify(tasks));
			}
		}
	});

	// eslint-disable-next-line no-plusplus
	idx++;
	document.getElementById("addItem").value = "";

	// add to completed tasks
	completedTasks();
};

// reload tasks after page reload.
const loadTasks = () => {
	if (window.localStorage) {
		// get tasks from local storage
		let tasks = localStorage.getItem("list-Items");

		// if local storage has task - parse object string back to object.
		// if not return empty object
		if (tasks) {
			tasks = JSON.parse(tasks);
		} else {
			tasks = {};
		}

		// tuen object in an array. iterate over tasks array and get key and value
		Object.entries(tasks).forEach((key, value) => {
			// eslint-disable-next-line no-console
			console.log(key[0]);
			// create li, label and checkbox
			const itemContainer = document.createElement("LI");
			itemContainer.setAttribute("class", `list-item`);

			const itemLabel = document.createElement("LABEL");
			itemLabel.setAttribute("for", `listitem-${value}`);

			const checkBox = document.createElement("INPUT");
			checkBox.setAttribute(
				"aria-label",
				`check the checkbox to mark this task as completed`
			);

			// add todo task value to todo lable
			itemLabel.innerHTML = `${key[0]}`;
			// label - give label matching title of item to add
			itemLabel.setAttribute("title", key[0]);

			// delete button
			const deleteButton = document.createElement("BUTTON");
			deleteButton.type = "button";
			deleteButton.setAttribute("class", "deleteButton");
			deleteButton.setAttribute("id", key[0]);
			deleteButton.setAttribute("aria-label", "delete task");

			// add logo to delete button using span
			const deleteSpan = document.createElement("span");
			deleteSpan.classList.add("far", "fa-trash-alt");
			deleteButton.appendChild(deleteSpan);

			itemContainer.appendChild(checkBox);
			itemContainer.appendChild(itemLabel);
			itemContainer.appendChild(deleteButton);
			todoList.appendChild(itemContainer);

			checkBox.type = "checkbox";
			checkBox.setAttribute("id", `listitem-${value}`);
			checkBox.setAttribute("class", "list_item");

			// see if checkbox is checked
			checkBox.addEventListener("change", (event) => {
				event.preventDefault();
				if (checkBox.checked) {
					itemContainer.classList.add("completed");
				} else if (!checkBox.checked) {
					itemContainer.classList.remove("completed");
				}
			});

			// click delete button to remove item container
			deleteButton.addEventListener("click", (event) => {
				event.preventDefault();
				// eslint-disable-next-line no-console
				console.log(deleteButton.id, value);
				// move item to completed section
				moveItem();
				// remove todo coontainer
				itemContainer.remove();

				// check if delete button matches todo task.
				if (deleteButton.id === key[0]) {
					// delete todo task from task object
					delete tasks[key[0]];
					// eslint-disable-next-line no-console
					console.log(tasks);
					if (window.localStorage) {
						// add updated task object to local storage
						localStorage.setItem("list-Items", JSON.stringify(tasks));
					}
				}
			});
		});

		document.getElementById("addItem").value = "";

		completedTasks();
	}
};

// load tasks on page reload
loadTasks();

// add task to todo list
submitButton.addEventListener("click", addItemToList);
