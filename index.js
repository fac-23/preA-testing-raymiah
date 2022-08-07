const submitButton = document.getElementById("submit");
const todoList = document.getElementById("todoList");

let idx = 0;
const theTasks = [];

const completedTasks = () => {
	// get todo list
	// eslint-disable-next-line prefer-destructuring
	const completeTask = todoList.children;

	// check if todo list contains any tasks
	if (completeTask.length === 0) {
		// eslint-disable-next-line no-console
		console.log("no items");
	}

	// iterate over todo list. filter and return array todo items checked as complete
	const compTasks = Array.from(completeTask).filter(
		(item) => item.classList[1]
	);

	// eslint-disable-next-line no-console
	console.log(compTasks);

	// eslint-disable-next-line no-plusplus
	for (let i = 0; i < compTasks.length; i++) {
		// eslint-disable-next-line prefer-destructuring
		const completeLabel = compTasks[i].childNodes[1];

		// get checkbox
		// eslint-disable-next-line prefer-destructuring
		const completeCheckBox = compTasks[i].childNodes[0];

		// eslint-disable-next-line no-console
		console.log(completeCheckBox.checked);

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
	}
};

const moveItem = () => {
	// get all list items.
	// eslint-disable-next-line prefer-destructuring
	const taskToDelete = todoList.children;

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

		// eslint-disable-next-line no-console
		console.log(completedCheck);

		// eslint-disable-next-line prefer-destructuring
		const completedLabel = completedListIt[0].childNodes[1];

		// eslint-disable-next-line no-console
		console.log(completedLabel.innerHTML);

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

	// eslint-disable-next-line no-console
	console.log(theTasks);

	// add each task to local storage
	if (window.localStorage) {
		localStorage.setItem(`${itemToAdd}`, `${itemToAdd}`);
	}

	// add todo task to todo label;
	// eslint-disable-next-line prefer-destructuring
	itemLabel.innerHTML = itemToAdd;
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
			// add to completed tasks
			completedTasks(e);
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
			localStorage.removeItem(`${itemToAdd}`);
		}
	});

	// eslint-disable-next-line no-plusplus
	idx++;
	document.getElementById("addItem").value = "";
};

const loadTasks = () => {
	// get tasks from local storage
	if (window.localStorage) {
		// get data from local storage
		const tasks = { ...window.localStorage };

		// convert data into array and filter out items not completed
		const nonCompListTasks = Object.entries(tasks).filter(
			(item) => !item[0].includes("completed")
		);

		// eslint-disable-next-line no-console
		console.log(nonCompListTasks);

		// iterate over non completed tasks array and get value
		nonCompListTasks.forEach((value) => {
			// eslint-disable-next-line no-console
			console.log(value[0]);
			const itemContainer = document.createElement("LI");
			itemContainer.setAttribute("id", `${value[0]}`);
			itemContainer.setAttribute("class", `list-item`);

			const itemLabel = document.createElement("LABEL");
			itemLabel.setAttribute("for", `listitem-${value[0]}`);

			const checkBox = document.createElement("INPUT");
			checkBox.setAttribute(
				"aria-label",
				`check the checkbox to mark this task as completed`
			);

			// // add todo task value to todo lable
			itemLabel.innerHTML = `${value[0]}`;
			// label - give label matching title of item to add
			itemLabel.setAttribute("title", value[0]);

			// delete button
			const deleteButton = document.createElement("BUTTON");
			deleteButton.type = "button";
			deleteButton.setAttribute("class", "deleteButton");
			deleteButton.setAttribute("id", value[0]);
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
			checkBox.setAttribute("id", `listitem-${value[0]}`);
			checkBox.setAttribute("class", "list_item");

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
				// eslint-disable-next-line no-console
				console.log(deleteButton.id, value);
				// move item to completed section
				moveItem();
				// remove todo coontainer
				itemContainer.remove();

				// check if delete button matches todo task.
				if (deleteButton.id === value[0][1]) {
					// delete todo task from task object
					localStorage.removeItem(`${value[0][1]}`);
				}
			});
		});

		// convert data into array and filter out completed items
		const compListTasks = Object.entries(tasks).filter((item) =>
			item[0].includes("completed")
		);

		// eslint-disable-next-line no-console
		console.log(compListTasks);

		// iterate over completed tasks array and get value and key
		compListTasks.forEach((value, key) => {
			// eslint-disable-next-line no-console
			// console.log(value[1], key);

			// get completed task container
			const compTasksList = document.querySelector("#complete");

			// create new list element
			// remove hidden class to show header
			const compHeader = document.querySelector("H2");
			compHeader.classList.remove("hidden");

			// create todo item container
			const itemCont = document.createElement("LI");
			itemCont.setAttribute("id", `listItem-${key}`);
			itemCont.setAttribute("class", `list-item`);

			// create todo item container lable
			const itemLab = document.createElement("LABEL");
			itemLab.setAttribute("for", `listitem-${key}`);
			// label - give label matching title of item to add
			itemLab.setAttribute("title", value[1]);
			itemLab.innerHTML = `${value[1]}`;

			// create todo item container checkbox
			const compCheckBox = document.createElement("INPUT");
			compCheckBox.setAttribute(
				"aria-label",
				`check the checkbox to mark this task as completed`
			);
			compCheckBox.checked = "true";
			// add todo task value to todo lable
			compCheckBox.type = "checkbox";
			compCheckBox.setAttribute("id", `listitem-${key}`);
			compCheckBox.setAttribute("class", "list_item");

			// append todo conatiner, lable & checkbox to todo item list container
			itemCont.appendChild(compCheckBox);
			itemCont.appendChild(itemLab);
			compTasksList.appendChild(itemCont);
		});
	}

	document.getElementById("addItem").value = "";
};

// load tasks on page reload
loadTasks();

// add task to todo list
submitButton.addEventListener("click", addItemToList);
