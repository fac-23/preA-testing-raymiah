test("input text added to list container as list item", () => {
	const itemToAdd = document.getElementById("addItem");
	// test value

	const name = "abc";

	itemToAdd.value = name; // step 2
	const submitButton = document.querySelector("#submit");
	// submit form
	submitButton.click(); // step 3

	// get all lI elementsm if they exist
	const children = document.getElementsByTagName("LI");

	// loop over collection with existing LI elements.
	// eslint-disable-next-line no-plusplus
	for (let i = 0; i < children.length; i++) {
		// check if UL contains an LI element. If so result will be true.
		// eslint-disable-next-line no-undef
		const listItem = todoList.contains(children[i]);

		// get any text submitted to label.
		// eslint-disable-next-line prefer-destructuring
		const listItemContent = children[i].querySelector("label").textContent;
		// console.log('fghjk', children[i]);

		// test whether LI element has been created
		// eslint-disable-next-line no-undef
		equal(listItem, true, "LI element created"); // step 4

		// test whether text has been submitted or blank field.
		// eslint-disable-next-line no-undef
		equal(listItemContent, name, "text inserted"); // step 5
	}
});

test("list item marked as completed and ready for deletion", () => {
	// return html collection
	// eslint-disable-next-line prefer-destructuring
	const completeCheck = document.querySelector("#todoList").children;

	// loop over collection
	// eslint-disable-next-line no-plusplus
	for (let i = 0; i < completeCheck.length; i++) {
		// find checkbox and add event listener
		// eslint-disable-next-line no-loop-func
		completeCheck[i].childNodes[0].addEventListener("change", (e) => {
			// target selected checkbox using event object target property
			// eslint-disable-next-line no-undef
			equal(e.target.checked, true, "checkbox checked"); // step 4
		}); // step 3
	}
});

test("check if list item has been deleted", () => {
	// arrange - create varibles/input and pass in what you think you are going to get
	// delete button
	const deleteButton = document.querySelector(".deleteButton");
	// console.log(deleteButton);
	// find all child elements in to-do-list
	// eslint-disable-next-line prefer-destructuring
	const listItems = document.querySelector("#todoList").children;

	// store length of to-do-list in current length
	// eslint-disable-next-line prefer-destructuring
	const currentLength = listItems.length;

	// act
	// action delete button click
	deleteButton.click();

	// when click is performed 1 item will be removed from the list, assign this to new length to compare
	const expected = currentLength - 1;
	// eslint-disable-next-line prefer-destructuring
	const result = document.querySelector("#todoList").children.length;

	// assert - call helper function
	// eslint-disable-next-line no-undef
	equal(result, expected, "item has been deleted from list");
});
