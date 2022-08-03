const submitButton = document.getElementById("submit");
const todoList = document.getElementById("todoList");

let idx = 0;
const theLibrary = {};

const addItemToList = (e) => {
	e.preventDefault();

	const itemToAdd = document.getElementById("addItem").value.trim();

	// get input value
	// eslint-disable-next-line no-console
	// console.log(itemToAdd);

	// grab error message and hide it
	const errorMessage = document.querySelector(".error");
	errorMessage.classList.add("hidden");

	// create li, label and checkbox
	const itemContainer = document.createElement("LI");
	itemContainer.setAttribute("class", `list-item`);

	const itemLabel = document.createElement("LABEL");
	itemLabel.setAttribute("for", `listitem-${idx}`);

	const checkBox = document.createElement("INPUT");
	checkBox.setAttribute(
		"aria-label",
		`check the checkbox to mark this task as completed`
	);

	// display message only if input input is empty string
	if (itemToAdd === "") {
		errorMessage.classList.remove("hidden");
		return;
	}
	theLibrary[itemToAdd] = itemToAdd;

	// get input value
	// eslint-disable-next-line no-console
	console.log(theLibrary);

	// add task to local storage
	if (window.localStorage) {
		localStorage.setItem("list-Items", JSON.stringify(theLibrary));
		// for (const item in theLibrary) {
		// 	console.log(`${item}: ${theLibrary[item]}`);
		// 	localStorage.setItem(`${item}`, `${item}`);
		// 	localStorage.getItem(`${item}`);
		// 	itemLabel.innerHTML = `${item}`;
		// }
	}

	// label - give label matching title of item to add
	itemLabel.setAttribute("title", itemToAdd);

	// delete button
	const deleteButton = document.createElement("BUTTON");
	deleteButton.type = "button";
	deleteButton.setAttribute("class", "deleteButton");
	deleteButton.setAttribute("aria-label", "delete task");

	// add logo to delete button using span
	const deleteSpan = document.createElement("span");
	deleteSpan.classList.add("far", "fa-trash-alt");
	deleteButton.appendChild(deleteSpan);

	// add task to local storage

	let tasks = localStorage.getItem("list-Items");

	if (tasks) {
		tasks = JSON.parse(tasks);
		// eslint-disable-next-line no-console
		console.log(tasks);
	} else {
		tasks = {};
	}

	// itemLabel.innerHTML = itemToAdd;
	// eslint-disable-next-line prefer-destructuring
	itemLabel.innerHTML = tasks[itemToAdd];

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
		// eslint-disable-next-line no-console
		// console.log(event);
		// move item to completed section
		// eslint-disable-next-line no-use-before-define
		moveItem();
		itemContainer.remove();
	});

	// eslint-disable-next-line no-plusplus
	idx++;
	document.getElementById("addItem").value = "";

	// eslint-disable-next-line no-use-before-define
	completedTasks();
};

const completedTasks = () => {
	// complete tasks
	const { completeTask } = todoList;

	if (completeTask.length === 0) {
		// eslint-disable-next-line no-console
		console.log("no items");
	}

	// eslint-disable-next-line no-plusplus
	for (let i = 0; i < completeTask.length; i++) {
		// get label
		// eslint-disable-next-line prefer-destructuring
		// const completeLabel = completeTask[i].childNodes[1];

		// get checkbox
		const { completeCheckBox, completeLabel } = { ...completeTask };

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

const loadTasks = () => {
	if (window.localStorage) {
		let tasks = localStorage.getItem("list-Items");

		if (tasks) {
			tasks = JSON.parse(tasks);
			// eslint-disable-next-line no-console
			console.log(tasks);
		} else {
			tasks = {};
		}

		Object.entries(tasks).forEach((key, value) => {
			// create li, label and checkbox
			const itemContainer = document.createElement("LI");
			itemContainer.setAttribute("class", `list-item`);

			const itemLabel = document.createElement("LABEL");
			itemLabel.setAttribute("for", `listitem-${key}`);

			const checkBox = document.createElement("INPUT");
			checkBox.setAttribute(
				"aria-label",
				`check the checkbox to mark this task as completed`
			);
			// console.log(`${item}: ${theLibrary[item]}`);
			itemLabel.innerHTML = `${value}`;
			// label - give label matching title of item to add
			itemLabel.setAttribute("title", value);

			// delete button
			const deleteButton = document.createElement("BUTTON");
			deleteButton.type = "button";
			deleteButton.setAttribute("class", "deleteButton");
			deleteButton.setAttribute("id", value);
			deleteButton.setAttribute("aria-label", "delete task");

			// add logo to delete button using span
			const deleteSpan = document.createElement("span");
			deleteSpan.classList.add("far", "fa-trash-alt");
			deleteButton.appendChild(deleteSpan);

			// itemLabel.innerHTML = itemToAdd;
			itemLabel.innerHTML = value;

			itemContainer.appendChild(checkBox);
			itemContainer.appendChild(itemLabel);
			itemContainer.appendChild(deleteButton);
			todoList.appendChild(itemContainer);

			checkBox.type = "checkbox";
			checkBox.setAttribute("id", `listitem-${key}`);
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
				itemContainer.remove();

				if (deleteButton.id === value) {
					delete theLibrary[value];

					if (window.localStorage) {
						localStorage.setItem("list-Items", JSON.stringify(theLibrary));
					}
				}
			});
		});

		document.getElementById("addItem").value = "";

		completedTasks();
	}
};

loadTasks();

submitButton.addEventListener("click", addItemToList);
