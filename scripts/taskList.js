/*
DB structure:

- usernames
    - username : 
		- current-id

- tasks
    - username-[id]:
		- task
		- done
		- userColor
*/

const responses = configs.responses;

/**
 * Loads a specified Google Font using the WebFont loader.
 * @param {string} font - The name of the Google Font to load.
 */
function loadGoogleFont(font) {
	WebFont.load({
		google: {
			families: [font],
		},
	});
}

/**
 * Converts a camelCase name to a CSS variable format.
 * @param {string} name - The camelCase name to be converted.
 * @returns {string} The converted name in CSS variable format.
 */
function convertToCSSVar(name) {
	let cssVar = name.replace(/([A-Z])/g, "-$1").toLowerCase();
	return `--${cssVar}`;
}

/**
 * Imports styles from the configs object and applies them to the document.
 * This function also handles the loading of Google Fonts and the display setting of the task count.
 * @throws {TypeError} If the styles or settings properties are not found in the configs object.
 */
function importStyles() {
	const styles = configs.styles;

	loadGoogleFont(styles.headerFontFamily);
	loadGoogleFont(styles.bodyFontFamily);

	const stylesToImport = Object.keys(styles).filter((style) => {
		return !style.includes("Background");
	});

	const backgroundStyles = [
		"taskList",
		"header",
		"body",
		"task",
		"checkBox",
	];

	stylesToImport.forEach((style) => {
		document.documentElement.style.setProperty(
			convertToCSSVar(style),
			styles[style]
		);
	});

	// loop through backgroundstyles
	backgroundStyles.forEach((style) => {
		// get background color and opacity
		let backgroundColor = styles[`${style}BackgroundColor`];
		let backgroundOpacity = styles[`${style}BackgroundOpacity`];

		let cssStyle = convertToCSSVar(style);

		// set background color
		document.documentElement.style.setProperty(
			`${cssStyle}-background-color`,
			`rgba(${hexToRgb(backgroundColor)}, ${backgroundOpacity})`
		);
	});

	if (!configs.settings.showTasksNumber) {
		document.getElementById("task-count").style.display = "none";
	}
}

/**
 * Sets up the local storage for the application.
 * If the local storage does not already contain the 'usernames_id' and 'tasks' items,
 * it initializes them with empty JSON objects.
 */
function setupDB() {
	if (!localStorage.usernames_id) {
		localStorage.setItem(`usernames_id`, "{}");
	}
	if (!localStorage.tasks) {
		localStorage.setItem(`tasks`, "{}");
	}
}

/**
 * Resets the local storage for the application.
 * This function clears the local storage and then sets it up again using the setupDB function.
 */
function resetDB() {
	localStorage.clear();
	setupDB();
}

/**
 * Clears all tasks from the task list.
 * This function resets the database and then re-renders the task list.
 */
function clearAllTasks() {
	resetDB();
	renderTaskList();
}

/**
 * Retrieves the list of tasks from local storage.
 * @returns {Object[]} An array of task objects parsed from JSON stored in local storage.
 * @throws {SyntaxError} If the stored tasks cannot be parsed into JSON.
 */
function getTasks() {
	return JSON.parse(localStorage.tasks);
}

/**
 * Saves the current state of tasks to local storage.
 * @param {Object[]} tasks - An array of task objects to be saved.
 */
function saveTasks(tasks) {
	localStorage.setItem(`tasks`, JSON.stringify(tasks));
}

/**
 * Retrieves the ID associated with a given username from local storage.
 * If the username does not exist in local storage, it is added with an ID of 0.
 * @param {string} username - The username for which to retrieve the ID.
 * @returns {number} The ID associated with the given username.
 * @throws {SyntaxError} If the stored usernames_id cannot be parsed into JSON.
 */
function getID(username) {
	let id = 0;
	let usernames_id = JSON.parse(localStorage.usernames_id);
	if (usernames_id[username]) {
		id = usernames_id[username];
	} else {
		usernames_id[username] = id;
		localStorage.setItem(`usernames_id`, JSON.stringify(usernames_id));
	}

	return id;
}

/**
 * Increments the ID associated with a given username in local storage by a specified value.
 * @param {string} username - The username for which to increment the ID.
 * @param {number} value - The value by which to increment the ID.
 * @throws {SyntaxError} If the stored usernames_id cannot be parsed into JSON.
 */
function incrementID(username, value) {
	let newID = getID(username) + value;
	let usernames_id = JSON.parse(localStorage.usernames_id);
	usernames_id[username] = newID;
	localStorage.setItem(`usernames_id`, JSON.stringify(usernames_id));
}

/**
 * Renders the count of total and completed tasks in the task list.
 * This function retrieves the tasks from local storage, counts the total number of tasks and the number of completed tasks,
 * and then updates the inner text of the element with the ID 'task-count' to reflect these counts.
 * @throws {SyntaxError} If the stored tasks cannot be parsed into JSON.
 */
function renderTaskCount() {
	let tasks = getTasks();

	let totalTasksCount = 0;
	let completedTasksCount = 0;

	for (let task in tasks) {
		let taskData = tasks[task];
		if (taskData.done) {
			completedTasksCount++;
		}
		totalTasksCount++;
	}

	let taskCount = document.getElementById("task-count");
	taskCount.innerText = `${completedTasksCount}/${totalTasksCount}`;
}

/**
 * Renders the task list in the DOM.
 * This function retrieves the tasks from local storage, filters them based on the showDoneTasks setting,
 * reverses their order if the reverseOrder setting is true, and then adds each task to the DOM.
 * After all tasks have been added, it calls the renderTaskCount function to update the task count.
 * @throws {SyntaxError} If the stored tasks cannot be parsed into JSON.
 */
function renderTaskList() {
	let tasks = getTasks();

	if (!configs.settings.showDoneTasks) {
		for (let task in tasks) {
			let taskData = tasks[task];
			if (taskData.done) {
				delete tasks[task];
			}
		}
	}

	// reverse the order of tasks
	if (configs.settings.reverseOrder) {
		let reversedTasks = {};
		let tasksKeys = Object.keys(tasks);
		for (let i = tasksKeys.length - 1; i >= 0; i--) {
			let task = tasksKeys[i];
			reversedTasks[task] = tasks[task];
		}
		tasks = reversedTasks;
	}

	let taskList = document.getElementsByClassName("task-container")[0];
	taskList.innerHTML = "";

	for (let task in tasks) {
		let taskData = tasks[task];
		let username = task.split("-")[0];
		let id = task.split("-")[1];

		addTasksToDom(
			username,
			taskData.userColor,
			taskData.task,
			taskData.done
		);
	}

	renderTaskCount();
}

/**
 * Adds a task to the DOM.
 * This function creates a new task element and appends it to the task list in the DOM.
 * The task element includes a checkbox or bullet point, the username of the task creator, a colon, and the task text.
 * The checkbox is checked and the task text is crossed out if the task is completed.
 * The color of the username is set to the userColor parameter if the usernameColor setting is not set.
 * @param {string} username - The username of the task creator.
 * @param {string} userColor - The color to be used for the username text.
 * @param {string} task - The text of the task.
 * @param {boolean} completed - Whether the task is completed.
 */
function addTasksToDom(username, userColor, task, completed) {
	let taskList = document.getElementsByClassName("task-container")[0];

	let newTask = document.createElement("div");
	newTask.className = "task-div";

	if (configs.settings.showCheckBox) {
		// <div class="checkbox"><input type="checkbox" /><label></label></div>
		let checkbox = document.createElement("div");
		checkbox.className = "checkbox";

		let checkboxInput = document.createElement("input");
		checkboxInput.type = "checkbox";

		// if completed is true, check the checkbox
		if (completed) {
			checkboxInput.checked = true;
		}

		checkbox.appendChild(checkboxInput);

		let checkboxLabel = document.createElement("label");
		checkbox.appendChild(checkboxLabel);

		newTask.appendChild(checkbox);
	} else {
		let bulletPointDiv = document.createElement("div");

		bulletPointDiv.className = "bullet-point";
		bulletPointDiv.innerText = configs.styles.bulletPointCharacter;

		newTask.appendChild(bulletPointDiv);
	}

	// <div class="username">username</div>
	let usernameDiv = document.createElement("div");
	usernameDiv.className = "username";
	usernameDiv.innerText = username;

	if (configs.styles.usernameColor == "") {
		usernameDiv.style.color = userColor;
	}

	newTask.appendChild(usernameDiv);

	//  <div class="colon">:</div>
	let colon = document.createElement("div");
	colon.className = "colon";
	colon.innerText = ":";
	newTask.appendChild(colon);

	// <div class="task">task</div>
	let taskDiv = document.createElement("div");
	taskDiv.className = "task";
	taskDiv.innerText = task;

	if (configs.settings.crossTasksOnDone) {
		if (completed) {
			taskDiv.classList.add("crossed");
		}
	}

	newTask.appendChild(taskDiv);

	// append to task list
	taskList.appendChild(newTask);
}

/**
 * Checks if a user has a task that is not done.
 * @param {string} username - The username of the user to check.
 * @returns {boolean} Returns true if the user has a task that is not done, false otherwise.
 * @throws {SyntaxError} If the stored tasks cannot be parsed into JSON.
 */
function userHasTask(username) {
	let tasks = getTasks();
	let id = getID(username);

	if (tasks[`${username}-${id}`] == null) {
		return false;
	}

	return !tasks[`${username}-${id}`].done;
}

/**
 * Adds a task to the task list.
 * This function retrieves the tasks from local storage, adds a new task to the tasks object with a key of the format 'username-id',
 * saves the tasks back to local storage, and then re-renders the task list.
 * @param {string} username - The username of the user who is adding the task.
 * @param {string} userColor - The color to be used for the username text.
 * @param {string} task - The text of the task.
 * @throws {SyntaxError} If the stored tasks cannot be parsed into JSON.
 */
function addTask(username, userColor, task) {
	let tasks = getTasks();
	let id = getID(username);

	tasks[`${username}-${id}`] = {
		userColor: userColor,
		task: task,
		done: false,
	};

	saveTasks(tasks);

	renderTaskList();

	console.log(`@${username} Task added! `);
}

/**
 * Marks a task as done.
 * This function retrieves the tasks from local storage, marks the task associated with the given username and ID as done,
 * increments the ID associated with the username, saves the tasks back to local storage, and then re-renders the task list.
 * @param {string} username - The username of the user who completed the task.
 * @returns {string} The text of the task that was marked as done.
 * @throws {SyntaxError} If the stored tasks cannot be parsed into JSON.
 */
function doneTask(username) {
	let id = getID(username);
	let tasks = getTasks();

	let finishedTask = tasks[`${username}-${id}`].task;

	tasks[`${username}-${id}`].done = true;

	incrementID(username, 1);

	saveTasks(tasks);

	renderTaskList();

	return finishedTask;
}

/**
 * Removes a task from the task list.
 * This function retrieves the tasks from local storage, removes the task associated with the given username and ID,
 * decrements the ID associated with the username, saves the tasks back to local storage, and then re-renders the task list.
 * @param {string} username - The username of the user who removed the task.
 * @returns {string} The text of the task that was removed.
 * @throws {SyntaxError} If the stored tasks cannot be parsed into JSON.
 */
function removeTask(username) {
	let id = getID(username);
	let tasks = getTasks();

	let removedTask = tasks[`${username}-${id}`].task;

	delete tasks[`${username}-${id}`];

	incrementID(username, -1);

	saveTasks(tasks);

	renderTaskList();

	return removedTask;
}

/**
 * Edits the text of a task.
 * This function retrieves the tasks from local storage, edits the task associated with the given username and ID,
 * saves the tasks back to local storage, and then re-renders the task list.
 * @param {string} username - The username of the user who edited the task.
 * @param {string} task - The new text of the task.
 * @throws {SyntaxError} If the stored tasks cannot be parsed into JSON.
 */
function editTask(username, task) {
	let tasks = getTasks();
	let id = getID(username);

	tasks[`${username}-${id}`].task = task;

	saveTasks(tasks);

	renderTaskList();

	console.log(`@${username} Task edited! `);
}

/**
 * Marks the next task as done and adds a new task to the task list.
 * This function calls the doneTask function to mark the next task of the given username as done,
 * then calls the addTask function to add a new task to the task list.
 * @param {string} username - The username of the user who is performing the actions.
 * @param {string} userColor - The color to be used for the username text.
 * @param {string} task - The text of the new task.
 * @returns {string} The text of the task that was marked as done.
 */
function nextTask(username, userColor, task) {
	let finishedTask = doneTask(username);
	addTask(username, userColor, task);

	return finishedTask;
}

/**
 * Checks if a task exists for a given username and ID.
 * This function retrieves the ID associated with the given username and the tasks from local storage,
 * and then checks if a task exists with a key of the format 'username-id'.
 * @param {string} username - The username of the user to check.
 * @returns {string} The text of the task if it exists, an empty string otherwise.
 * @throws {SyntaxError} If the stored tasks or usernames_id cannot be parsed into JSON.
 */
function checkTask(username) {
	// remove @ in username if it exists
	if (username[0] === "@") {
		username = username.slice(1);
	}

	let id = getID(username);
	let tasks = getTasks();

	if (tasks[`${username}-${id}`]) {
		return tasks[`${username}-${id}`].task;
	} else {
		return "";
	}
}

/**
 * Deletes all tasks associated with a given username.
 * This function retrieves the tasks from local storage, removes all tasks associated with the given username,
 * resets the ID associated with the username to 0, saves the tasks back to local storage, and then re-renders the task list.
 * @param {string} username - The username of the user whose tasks are to be deleted.
 * @throws {SyntaxError} If the stored tasks or usernames_id cannot be parsed into JSON.
 */
function adminDeleteTask(username) {
	// remove @ in username if it exists
	if (username[0] === "@") {
		username = username.slice(1);
	}

	// allows admin to delete all tasks from username
	let tasks = getTasks();

	// get all tasks that has username as the keys and delete them
	for (let task in tasks) {
		if (task.split("-")[0] === username) {
			console.log(task.split("-")[0]);
			delete tasks[task];
		}
	}

	// reset id to 0
	let usernames_id = JSON.parse(localStorage.usernames_id);
	usernames_id[username] = 0;
	localStorage.setItem(`usernames_id`, JSON.stringify(usernames_id));

	saveTasks(tasks);
	renderTaskList();

	console.log(`@${username} Tasks deleted! `);
}

/**
 * Deletes all completed tasks from the task list.
 * This function retrieves the tasks from local storage, removes all tasks that are marked as done,
 * saves the tasks back to local storage, re-renders the task list, and restarts the animation.
 * @throws {SyntaxError} If the stored tasks cannot be parsed into JSON.
 */
function cleardone() {
	let tasks = getTasks();

	for (let task in tasks) {
		if (tasks[task].done) {
			delete tasks[task];
		}
	}

	saveTasks(tasks);
	renderTaskList();
	restartAnimation();

	console.log(`Completed tasks deleted! `);
}

/**
 * Pauses execution for a specified number of milliseconds.
 * @param {number} ms - The number of milliseconds to pause execution for.
 * @returns {Promise} A promise that resolves after the specified number of milliseconds.
 */
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Animates the task list by scrolling it up and down.
 * This function calculates the height of the task container and the task wrapper,
 * the vertical padding of the task wrapper, and the final height for the animation.
 * It then creates a keyframes object for the animation, creates a new animation object, and plays the animation.
 * After the animation finishes, it calls itself recursively to continue the animation.
 * If the final height for the animation is less than 15, it waits for a delay before calling itself recursively.
 * @throws {TypeError} If the task container or task wrapper cannot be found.
 * @throws {SyntaxError} If the stored configs cannot be parsed into JSON.
 */
async function animate() {
	// task container height
	let taskContainer = document.getElementsByClassName("task-container")[0];
	let taskContainerHeight = taskContainer.scrollHeight;

	// task wrapper height
	let taskWrapper = document.getElementsByClassName("task-wrapper")[0];
	let taskWrapperHeight = taskWrapper.clientHeight;

	// get vertical padding
	let verticalPadding = parseInt(
		window.getComputedStyle(taskWrapper).paddingTop
	);

	let finalHeight =
		taskContainerHeight - taskWrapperHeight + verticalPadding * 2;

	let pixelsPerSecond = configs.styles.pixelsPerSecond;
	let animationDelay = configs.styles.animationDelay;

	let duration = (finalHeight / pixelsPerSecond) * 1000;

	if (finalHeight > 15) {
		// keyframes object in css scroll
		let keyframes = [
			{ transform: `translateY(0px)` },
			{ transform: `translateY(-${finalHeight}px)` },
		];

		// create a new animation object
		let animation = document
			.getElementsByClassName("task-container")[0]
			.animate(keyframes, {
				duration: duration,
				iterations: 2,
				easing: configs.styles.taskListScrollBehaviour,
				direction: "alternate",
			});

		// play the animation
		animation.play();

		// wait for animation to finish
		await sleep(duration * 2 + animationDelay * 1000);
		animate();
	} else {
		await sleep(animationDelay * 1000);
		animate();
	}
}

/**
 * Restarts the animation of the task list.
 * This function retrieves the animation object of the task container, cancels the animation, and then calls the animate function to start a new animation.
 * @throws {TypeError} If the task container cannot be found or if it does not have an animation.
 */
function restartAnimation() {
	// get animation object
	let animation = document
		.getElementsByClassName("task-container")[0]
		.getAnimations()[0];

	// cancel animation
	animation.cancel();

	animate();
}

/**
 * Runs a series of tests on the task list.
 * This function creates a list of streamer usernames, and for each username, it adds a task to the task list and then marks it as done.
 * The tasks are added with a white color and a text of the format 'test task i', where i is the index of the username in the list.
 */
function tests() {
	let listOfStreamers = [
		`cloudydayzzz`,
		`berryspace`,
		`MohFocus`,
		`xeno_hiraeth`,
		`euphie___`,
		`unknownnie`,
		`theyolotato`,
		`charliosaurus`,
		`jutstreams`,
		`mikewhatwhere`,
		`studypaws`,
		`pcc_lanezzz`,
		`workwithjandj`,
		`studylena`,
	];

	// loop through list of streamers
	for (let i = 0; i < listOfStreamers.length; i++) {
		addTask(listOfStreamers[i], "#fff", `test task ${i}`);
		doneTask(listOfStreamers[i]);
	}
}

/**
 * Converts a hex color to an rgb color.
 * @param {string} hex - The hex color to be converted.
 * @returns {string} The converted rgb color.
 */
function hexToRgb(hex) {
	// remove # if present
	if (hex[0] === "#") {
		hex = hex.slice(1);
	}

	let r = 0,
		g = 0,
		b = 0;

	if (hex.length == 3) {
		// 3 digits
		r = "0x" + hex[0] + hex[0];
		g = "0x" + hex[1] + hex[1];
		b = "0x" + hex[2] + hex[2];
	} else if (hex.length == 6) {
		// 6 digits
		r = "0x" + hex[0] + hex[1];
		g = "0x" + hex[2] + hex[3];
		b = "0x" + hex[4] + hex[5];
	}

	// interger value of rgb
	r = +r;
	g = +g;
	b = +b;

	return `${r}, ${g}, ${b}`;
}

let currentTitle = 0;

/* 
	Title cycle
*/
setInterval(async () => {
	let taskTitle = document.getElementById("title");

	// cycle through a list of titles
	const titles = configs.titles;

	// if current title is the last title, set it to the first title
	if (currentTitle === titles.length - 1) {
		currentTitle = 0;
	} else {
		currentTitle++;
	}

	// on change title, add fade animation
	taskTitle.classList.add("fade");
	await sleep(500);

	// set new title
	taskTitle.innerText = titles[currentTitle];

	await sleep(100);

	// remove fade animation
	taskTitle.classList.remove("fade");
}, 8000);

/**
 * Runs when the window loads.
 *
 * This function imports styles, sets up the local storage, renders the task list, and starts the animation.
 */
window.onload = function () {
	importStyles();
	// resetDB();
	setupDB();
	renderTaskList();
	// tests();
	animate();
};
