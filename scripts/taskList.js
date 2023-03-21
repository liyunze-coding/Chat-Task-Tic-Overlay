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

function loadGoogleFont(font) {
	WebFont.load({
		google: {
			families: [font],
		},
	});
}

// convert taskListBorderColor to task-list-border-color
function convertToCSSVar(name) {
	let cssVar = name.replace(/([A-Z])/g, "-$1").toLowerCase();
	return `--${cssVar}`;
}

// import styles from configs
function importStyles() {
	const styles = configs.styles;

	loadGoogleFont(styles.headerFontFamily);
	loadGoogleFont(styles.bodyFontFamily);

	const stylesToImport = [
		"headerFontFamily",
		"bodyFontFamily",
		"taskListFontSize",
		"taskListWidth",
		"taskListHeight",
		"taskListColor",
		"taskListBorderColor",
		"taskListBorderWidth",
		"taskListBorderRadius",
		"taskListPadding",
		"numberOfLines",
		"headerBorderColor",
		"headerBorderWidth",
		"headerBorderRadius",
		"headerHeight",
		"headerFontSize",
		"headerFontColor",
		"headerPadding",
		"headerMarginBottom",
		"tasksNumberFontSize",
		"bodyBorderColor",
		"bodyBorderWidth",
		"bodyBorderRadius",
		"bodyFontColor",
		"bodyVerticalPadding",
		"bodyHorizontalPadding",
		"taskFontSize",
		"taskFontColor",
		"taskBorderRadius",
		"taskMarginBottom",
		"taskPadding",
		"checkBoxSize",
		"checkBoxBorderColor",
		"checkBoxBorderRadius",
		"checkBoxBorderWidth",
		"checkBoxMarginTop",
		"checkBoxMarginLeft",
		"checkBoxMarginRight",
		"checkBoxBackgroundColor",
		"checkBoxBackgroundOpacity",
		"tickCharacter",
		"tickColor",
		"tickSize",
		"tickTranslateY",
		"bulletPointColor",
		"bulletPointSize",
		"bulletPointMarginRight",
		"bulletPointMarginLeft",
		"bulletPointMarginTop",
		"usernameColor",
		"colonMarginRight",
		"colonMarginLeft",
	];

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

function setupDB() {
	if (!localStorage.usernames_id) {
		localStorage.setItem(`usernames_id`, "{}");
	}
	if (!localStorage.tasks) {
		localStorage.setItem(`tasks`, "{}");
	}
}

function resetDB() {
	localStorage.clear();
	setupDB();
}

function clearAllTasks() {
	resetDB();
	renderTaskList();
}

function getTasks() {
	return JSON.parse(localStorage.tasks);
}

function saveTasks(tasks) {
	localStorage.setItem(`tasks`, JSON.stringify(tasks));
}

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

function incrementID(username, value) {
	let newID = getID(username) + value;
	let usernames_id = JSON.parse(localStorage.usernames_id);
	usernames_id[username] = newID;
	localStorage.setItem(`usernames_id`, JSON.stringify(usernames_id));
}

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

// adding task to DOM
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

// return true if pending, else false
function checkUserTask(username) {
	let tasks = getTasks();
	let id = getID(username);

	if (!tasks[`${username}-${id}`]) {
		return false;
	}

	return tasks[`${username}-${id}`].done;
}

// user adding task
function addTask(username, userColor, task) {
	incrementID(username, 1);
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

// user completing task
function doneTask(username) {
	let id = getID(username);
	let tasks = getTasks();

	let finishedTask = tasks[`${username}-${id}`].task;

	tasks[`${username}-${id}`].done = true;

	saveTasks(tasks);

	renderTaskList();

	return finishedTask;
}

// user removing task
function removeTask(username) {
	let id = getID(username);
	let tasks = getTasks();

	let removedTask = tasks[`${username}-${id}`].task;

	delete tasks[`${username}-${id}`];

	saveTasks(tasks);

	renderTaskList();

	return removedTask;
}

// user editing task
function editTask(username, task) {
	let tasks = getTasks();
	let id = getID(username);

	tasks[`${username}-${id}`] = {
		task: task,
		done: false,
	};

	saveTasks(tasks);

	renderTaskList();

	console.log(`@${username} Task edited! `);
}

// checks user last task
function checkTask(username) {
	// remove @ in username if it exists
	if (username[0] === "@") {
		username = username.slice(1);
	}

	let id = getID(username);
	let tasks = getTasks();

	if (tasks[`${username}-${id}`]) {
		return tasks[`${username}-${id}`].task;
	} else if (tasks[`${username}-${id - 1}`]) {
		return tasks[`${username}-${id - 1}`].task;
	} else {
		return false;
	}
}

// admin delete all tasks of user
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

// delete all completed tasks
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

// sleep function
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

// scroll up and down
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

	let duration = (finalHeight / pixelsPerSecond) * 1000;

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
	await sleep(duration * 2);
	animate();
}

// cancel animation for restart (when clearing done, many tasks get cleared)
function restartAnimation() {
	// get animation object
	let animation = document
		.getElementsByClassName("task-container")[0]
		.getAnimations()[0];

	// cancel animation
	animation.cancel();

	animate();
}

// tests
function oneLineTasks() {
	for (let i = 1; i <= 10; i++) {
		addTasksToDom(`RyanPython${i}`, "test task", false);
	}
}

function oneLineDoneTasks() {
	for (let i = 1; i <= 10; i++) {
		addTask(`ryans_impostor`, "#fff", "test task");
		doneTask(`ryans_impostor`);
	}
}

function multiUserLineTasks() {
	for (let i = 1; i <= 20; i++) {
		addTask(`ryan${i}`, "#fff", `test task ${i}`);
		doneTask(`ryan${i}`);
	}
}

function tests() {
	// oneLineTasks();
	multiUserLineTasks();
	// oneLineDoneTasks();
}

// hex to rgb that accepts 3 or 6 digits
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

// interval the task title
setInterval(async () => {
	let taskTitle = document.getElementById("title");
	let taskTitleText = taskTitle.innerText;

	// cycle through a list of titles
	let titles = ["!ryanpython", "!taskadd", "!taskdone", "!taskhelp"];

	// get current title
	let currentTitle = titles.indexOf(taskTitleText);

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

// on window load
window.onload = function () {
	importStyles();
	// resetDB();
	setupDB();
	renderTaskList();
	// tests();
	animate();
};
