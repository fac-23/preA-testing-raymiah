const submitButton = document.getElementById("submit");
const todoList = document.getElementById("todoList");

// let idx = 0;
// create unique id
// https://stackoverflow.com/questions/3231459/how-can-i-create-unique-ids-with-javascript
const uid = () =>
	Date.now().toString(36) + Math.random().toString(36).substring(2);

// todos array
const theTasks = [];

const completedTasks = () => {
	// get todo list
	const { children } = todoList;
	const completeTask = children;

	// check if todo list contains any tasks
	if (completeTask.length === 0) {
		// eslint-disable-next-line no-console
		console.log("no items");
	}

	// iterate over todo list. filter and return array todo items checked as complete
	const compTasks = Array.from(completeTask).filter(
		(item) => item.classList[1]
	);

	const result = compTasks.forEach((element) => {
		const [completeCheckBox, completeLabel] = [...element.children];

		if (completeCheckBox.checked) {
			// eslint-disable-next-line no-console
			console.log("item checked as completed");
		} else {
			// eslint-disable-next-line no-console
			console.log("item not checked as completed");
		}

		completeLabel.addEventListener("click", () => {
			// eslint-disable-next-line no-console
			console.log("label clicked");
		});

		// remove checked item
		completeCheckBox.addEventListener("change", () => {
			if (!completeCheckBox.checked) {
				// eslint-disable-next-line no-console
				console.log("item not checked as completed");
			} else {
				// eslint-disable-next-line no-console
				console.log("item checked as completed");
			}
		});
	});

	return result;
};

const moveItem = () => {
	// get all list items.
	const { children } = todoList;
	const taskToDelete = children;

	// get completed task list container
	const completedTasksList = document.querySelector("#complete");

	// return array of list items with checkbox checked true.
	const completedListIt = Array.from(taskToDelete).filter((element) =>
		element.childNodes[0].checked ? element : false
	);

	// conditional to prevent uncaught reference error as completedListIt not created yet.
	if (completedListIt.length > 0) {
		const [data] = [...completedListIt];
		// get todo checkbox and label
		const [completedCheck, completedLabel] = [...data.childNodes];

		// eslint-disable-next-line no-console
		console.log(completedCheck, completedLabel);

		// add completed task to local storage as completed item.
		localStorage.setItem(
			`completed-${completedCheck.id}`,
			`${completedLabel.innerHTML}`
		);

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
	return console.error("completed item created");
};

const addItemToList = (e) => {
	e.preventDefault();

	// get input value remove any whitespace
	const itemToAdd = document.getElementById("addItem").value.trim();

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
	checkBox.setAttribute(
		"aria-label",
		`check the checkbox to mark this task as completed`
	);

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

	// add todo task to todo label;
	// eslint-disable-next-line prefer-destructuring
	itemLabel.innerHTML = itemToAdd;
	// add checkbox, label & delete button to todo list.
	itemContainer.appendChild(checkBox);
	itemContainer.appendChild(itemLabel);
	itemContainer.appendChild(deleteButton);
	// add todo container to todo list.
	todoList.appendChild(itemContainer);

	checkBox.type = "checkbox";
	checkBox.setAttribute("id", `listitem-${uid()}`);
	checkBox.setAttribute("class", "list_item");

	checkBox.addEventListener("change", () => {
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
		// check if delete button id matches todo task.
		if (deleteButton.id === checkBox.id) {
			// delete todo task from local storage
			if (window.localStorage) {
				localStorage.removeItem(`${checkBox.id}`);
			}
		}
	});

	// reset input
	document.getElementById("addItem").value = "";
};

const loadTasks = () => {
	// check if local storage has data
	if (window.localStorage) {
		// get todos data from local storage
		const tasks = { ...window.localStorage };

		// return array of todos not checked as completed
		const nonCompListTasks = Object.entries(tasks).filter(
			(item) => !item[0].includes("completed")
		);

		// iterate over array of todos not completed and get value array
		nonCompListTasks.forEach((value) => {
			// reload todo container
			const itemContainer = document.createElement("LI");
			itemContainer.setAttribute("id", `todo-${value[0]}`);
			itemContainer.setAttribute("class", `list-item`);

			// reload todo container label
			const itemLabel = document.createElement("LABEL");
			itemLabel.setAttribute("for", `${value[0]}`);

			// reload todo container checkbox
			const checkBox = document.createElement("INPUT");
			checkBox.setAttribute(
				"aria-label",
				`check the checkbox to mark this task as completed`
			);
			checkBox.type = "checkbox";
			checkBox.setAttribute("id", `${value[0]}`);
			checkBox.setAttribute("class", "list_item");

			// reload todo value to todo label.
			itemLabel.innerHTML = `${value[1]}`;
			// reloadtodo task as label title.
			itemLabel.setAttribute("title", value[1]);

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
			itemContainer.appendChild(checkBox);
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
		const compListTasks = Object.entries(tasks).filter((item) =>
			item[0].includes("completed")
		);

		// iterate over completed todos and get value array
		compListTasks.forEach((value) => {
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
			itemLab.innerHTML = `${value[1]}`;

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
			itemCont.appendChild(compCheckBox);
			itemCont.appendChild(itemLab);
			itemCont.appendChild(delButton);
			compTasksList.appendChild(itemCont);

			delButton.addEventListener("click", () => {
				// check if delete button id matches local storage id.
				if (delButton.id === `${value[0]}`) {
					// delete todo task from local storage permanently
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
	document.getElementById("addItem").value = "";
};

// load tasks on page reload
loadTasks();

// add task to todo list
submitButton.addEventListener("click", addItemToList);
