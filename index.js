const submitForm = document.getElementById("todo-form");
const todoList = document.getElementById("todoList");

import createTodo from "./createTodo.js";
import createTodoCompleted from "./createTodoCompleted.js";
import loadAllTodo from "./loadAllTodo.js";

// Create unique id
// https://stackoverflow.com/questions/3231459/how-can-i-create-unique-ids-with-javascript
function uid() {
	return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// Get completed todos container
const completedTasksCont = document.getElementById("complete");

function completedTasks() {
	// Get todo list of completed items
	const { children } = completedTasksCont;
	const completeTask = children;
	// array of todo items checked as complete
	const compTasks = Array.from(completeTask);

	const completedHeader = document.querySelector("#error");
	completedHeader.classList.remove("hidden");

	// Check if todo list contains any tasks
	if (compTasks.length <= 0) {
		// eslint-disable-next-line no-console
		console.log("no items");
		// Create new list element
		// const completedHeader = document.querySelector("#error");
		completedHeader.classList.add("hidden");
	}

	const result = compTasks.forEach((element) => {
		const [completeLabel, completeButton] = [...element.children];

		const [completeCheckBox, completeText] = [...completeLabel.children];

		// delete button to remove todo container
		completeButton.addEventListener("click", () => {
			// if id string includes completed.
			if (completeButton.id.includes("complete")) {
				// remove todo from todo list container
				element.remove();
				//remove todo from local storage
				localStorage.removeItem(`${completeCheckBox}`, `${completeText}`);
			}
		});
	});

	return result;
}

function moveItem() {
	// Get all todos created.
	const { children } = todoList;
	const taskToMove = children;

	// Return array of todos with checkbox checked as completed.
	const taskToMoveList = Array.from(taskToMove).filter((element) =>
		element.childNodes[0].firstChild.checked ? element : false
	);

	// Conditional to prevent uncaught reference error as completedListIt not created yet.
	if (taskToMoveList.length > 0) {
		const [data] = [...taskToMoveList];
		const [completedCheck] = [...data.childNodes];

		// get checkbox and todo text
		const [checkBox, text] = [...completedCheck.childNodes];

		// remove task if not marked as completed.
		if (!checkBox.id.includes("completed")) {
			localStorage.removeItem(`${checkBox.id}`, `${text.textContent}`);
		}

		//if not marked as completed - Add task to local storage marked as completed.
		localStorage.setItem(`completed-${checkBox.id}`, `${text.textContent}`);

		// create completed todo
		const completedListItem = createTodoCompleted(
			checkBox.id,
			`${text.textContent}`
		);
		// append completed todo to completed todo container
		completedTasksCont.append(completedListItem);

		completedTasks();
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

	// create todo
	const itemContainer = createTodo(`${uid()}`, itemToAdd);

	// add to todo to todo container
	todoList.appendChild(itemContainer);

	// get todo label and delete button
	const [todolabel, todoDelete] = [...itemContainer.children];

	// get todo checkbox inside label
	const [todoCheckBox] = [...todolabel.children];

	todoCheckBox.addEventListener("change", (event) => {
		// eslint-disable-next-line no-console
		console.log(event);
		// check if checkbox is checked
		if (todoCheckBox.checked) {
			// add css class
			itemContainer.classList.add("completed");
			// add todo to completed tasks to be added to complete section
			// completedTasks();
		} else if (!todoCheckBox.checked) {
			// remove css class
			itemContainer.classList.remove("completed");
		}
	});

	// delete button to remove todo container
	todoDelete.addEventListener("click", () => {
		// if todo checkbox checked
		if (todoCheckBox.checked) {
			// move selected todo to completed section
			moveItem();
			// remove selected todo from todo list container
			itemContainer.remove();
		}
		// if todo not checkbox checked
		if (!todoCheckBox.checked) {
			//remove todo from local storage
			localStorage.removeItem(`${todoCheckBox.id}`);
			// remove selected todo from todo list container
			itemContainer.remove();
		}
	});

	// reset input
	document.getElementById("addItem").value = "";
}

function loadAllTasks() {
	// check if local storage has data
	if (window.localStorage) {
		// get todos data from local storage
		const allTasks = { ...window.localStorage };

		// remove hidden class to show header
		const compHeader = document.querySelector("#error");
		compHeader.classList.remove("hidden");

		// return array of todos not checked as completed
		const NotCompletedTasks = Object.entries(allTasks).filter(
			(item) => !item[0].includes("completed")
		);

		// iterate over array of todos not completed.
		NotCompletedTasks.forEach((value) => {
			// create todo
			const itemContainer = loadAllTodo(`${value[0]}`, `${value[1]}`);

			todoList.appendChild(itemContainer);

			// get todo label and delete button
			const [todolabel, todoDelete] = [...itemContainer.children];

			// get todo checkbox inside label
			const [todoCheckBox] = [...todolabel.children];

			todoCheckBox.addEventListener("change", () => {
				// check if checkbox is checked
				if (todoCheckBox.checked) {
					// add css class
					itemContainer.classList.add("completed");
				} else if (!todoCheckBox.checked) {
					// remove css class
					itemContainer.classList.remove("completed");
				}
			});

			// remove item container
			todoDelete.addEventListener("click", () => {
				if (todoCheckBox.checked) {
					moveItem();
					itemContainer.remove();
				}

				if (!todoCheckBox.checked) {
					localStorage.removeItem(`${value[0]}`, `${value[1]}`);
					itemContainer.remove();
				}
			});
		});

		// return array of todos checked as completed
		const CompletedTasks = Object.entries(allTasks).filter((item) =>
			item[0].includes("completed")
		);

		// iterate over completed todos and get value array
		CompletedTasks.forEach((value) => {
			// get completed task container
			const compTasksList = document.querySelector("#complete");

			// create completed todo
			const compItemCont = loadAllTodo(`${value[0]}`, `${value[1]}`);

			compTasksList.appendChild(compItemCont);

			// get todo label and delete button
			const [todolabel, todoDelete] = [...compItemCont.children];

			// get todo checkbox inside label
			const [todoCheckBox] = [...todolabel.children];

			if (!todoCheckBox.checked) {
				todoCheckBox.checked = true;
			}

			todoDelete.addEventListener("click", () => {
				// check if delete button id matches checkbox id.
				if (todoDelete.id.includes("complete")) {
					// remove selected todo from todo list container
					compItemCont.remove();
					//remove todo from local storage
					localStorage.removeItem(`${value[0]}`, `${value[1]}`);
				}
			});
		});
	}
}

// load tasks on page reload
loadAllTasks();

// add task to todo list
submitForm.addEventListener("submit", addItemToList);
