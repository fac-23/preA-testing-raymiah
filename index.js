const submitButton = document.getElementById("submit");
const todoList = document.getElementById("todoList");

let idx = 0;
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

	compTasks.forEach((element) => {
		// eslint-disable-next-line no-console
		console.log(element.children);

		const [completeLabel, completeCheckBox] = [...element.children];

		// eslint-disable-next-line no-console
		console.log(completeLabel, completeCheckBox);

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

				// eslint-disable-next-line no-use-before-define
			} else {
				// eslint-disable-next-line no-console
				console.log("item checked as completed");
			}
			// add updated task object to local storage
		});
	});
};

const moveItem = () => {
	// get all list items.
	const { children } = todoList;
	const taskToDelete = children;

	// get completed task container
	const completedTasksList = document.querySelector("#complete");

	// filter out list item with check box checked and return item
	const completedListIt = Array.from(taskToDelete).filter((element) =>
		element.childNodes[0].checked ? element : false
	);

	// conditional to prevent uncaught reference error as completedListIt not created yet.
	if (completedListIt.length > 0) {
		// get checkbox
		const [data] = [...completedListIt];

		// get todo checkbox and label
		const [completedCheck, completedLabel] = [...data.childNodes];

		// eslint-disable-next-line no-console
		console.log(completedCheck, completedLabel);

		// add completed task to local storage as completed item.
		localStorage.setItem(
			`completed-Items-${completedLabel.innerHTML}`,
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
	return console.error("completed item created yet");
};

const addItemToList = (e) => {
	e.preventDefault();

	// get input value
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
	itemContainer.setAttribute("id", `${idx}`);
	itemContainer.setAttribute("class", `list-item`);

	// Todo task label
	const itemLabel = document.createElement("LABEL");
	itemLabel.setAttribute("for", `listitem-${idx}`);
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
	deleteButton.setAttribute("id", itemToAdd);
	deleteButton.setAttribute("aria-label", "delete task");
	// add logo to delete todo button using span
	const deleteSpan = document.createElement("span");
	deleteSpan.classList.add("far", "fa-trash-alt");
	deleteButton.appendChild(deleteSpan);

	// add value from user input to array
	theTasks.push(itemToAdd);

	// add each task to local storage
	if (window.localStorage) {
		localStorage.setItem(`${itemToAdd}`, `${itemToAdd}`);
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
	checkBox.setAttribute("id", `listitem-${idx}`);
	checkBox.setAttribute("class", "list_item");

	checkBox.addEventListener("change", () => {
		// check if checkbox is checked
		if (checkBox.checked) {
			itemContainer.classList.add("completed");
			// add todo to completed tasks to be added to complete section
			completedTasks();
		} else if (!checkBox.checked) {
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
		if (deleteButton.id === itemToAdd) {
			// delete todo task from local storage
			if (window.localStorage) {
				localStorage.removeItem(`${deleteButton.id}`);
			}
		}
	});

	// eslint-disable-next-line no-plusplus
	idx++;
	// reset input
	document.getElementById("addItem").value = "";
};

const loadTasks = () => {
	// check if local storage has data
	if (window.localStorage) {
		// get todos data from local storage
		const tasks = { ...window.localStorage };

		// convert data into array and filter out todos not completed
		const nonCompListTasks = Object.entries(tasks).filter(
			(item) => !item[0].includes("completed")
		);

		// iterate over non completed todos array and get todo value
		nonCompListTasks.forEach((value) => {
			// create todo container
			const itemContainer = document.createElement("LI");
			itemContainer.setAttribute("id", `${value[0]}`);
			itemContainer.setAttribute("class", `list-item`);

			// create todo container label
			const itemLabel = document.createElement("LABEL");
			itemLabel.setAttribute("for", `listitem-${value[0]}`);

			// create todo container checkbox
			const checkBox = document.createElement("INPUT");
			checkBox.setAttribute(
				"aria-label",
				`check the checkbox to mark this task as completed`
			);
			checkBox.type = "checkbox";
			checkBox.setAttribute("id", `listitem-${value[0]}`);
			checkBox.setAttribute("class", "list_item");

			// add todo value to todo label.
			itemLabel.innerHTML = `${value[0]}`;
			// Give todo task as label title.
			itemLabel.setAttribute("title", value[0]);

			// create todo container delete button.
			const deleteButton = document.createElement("BUTTON");
			deleteButton.type = "button";
			deleteButton.setAttribute("class", "deleteButton");
			deleteButton.setAttribute("id", value[0]);
			deleteButton.setAttribute("aria-label", "delete task");

			// add logo to delete button using span.
			const deleteSpan = document.createElement("span");
			deleteSpan.classList.add("far", "fa-trash-alt");
			deleteButton.appendChild(deleteSpan);

			// add label, delete button and checkbox to todo container.
			itemContainer.appendChild(checkBox);
			itemContainer.appendChild(itemLabel);
			itemContainer.appendChild(deleteButton);
			// add todo container to todo list.
			todoList.appendChild(itemContainer);

			// see if checkbox is checked
			checkBox.addEventListener("change", (event) => {
				event.preventDefault();
				if (checkBox.checked) {
					itemContainer.classList.add("completed");
					// add to completed tasks
					completedTasks();
				} else if (!checkBox.checked) {
					itemContainer.classList.remove("completed");
				}
			});

			// click delete button to remove item container
			deleteButton.addEventListener("click", (event) => {
				event.preventDefault();
				// move item to completed section
				moveItem();
				// remove todo coontainer
				itemContainer.remove();

				// check if delete button matches todo task.
				if (deleteButton.id === value[0]) {
					// delete todo task from task object
					localStorage.removeItem(`${value[0]}`);
				}
			});
		});

		// convert data into array and filter out completed items
		const compListTasks = Object.entries(tasks).filter((item) =>
			item[0].includes("completed")
		);

		// iterate over completed tasks array and get value and key
		compListTasks.forEach((value, key) => {
			// get completed task container
			const compTasksList = document.querySelector("#complete");

			// create new list element
			// remove hidden class to show header
			const compHeader = document.querySelector("H2");
			compHeader.classList.remove("hidden");

			// create todo container
			const itemCont = document.createElement("LI");
			itemCont.setAttribute("id", `listItem-${key}`);
			itemCont.setAttribute("class", `list-item`);

			// create todo container lable
			const itemLab = document.createElement("LABEL");
			itemLab.setAttribute("for", `listitem-${key}`);
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
			compCheckBox.setAttribute("id", `listitem-${key}`);
			compCheckBox.setAttribute("class", "list_item");

			// append todo container, lable & checkbox to todo item list container
			itemCont.appendChild(compCheckBox);
			itemCont.appendChild(itemLab);
			compTasksList.appendChild(itemCont);
		});
	}

	// reset value
	document.getElementById("addItem").value = "";
};

// load tasks on page reload
loadTasks();

// add task to todo list
submitButton.addEventListener("click", addItemToList);
