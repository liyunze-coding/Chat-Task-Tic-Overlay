const commands = configs.commands;
const responseTemplates = configs.responses;
const settings = configs.settings;

function respond(template, user = "", message = "") {
	console.log(template);
	ComfyJS.Say(template.replace("{user}", user).replace("{task}", message));
}

function isMod(flags) {
	if (flags.broadcaster || flags.mod) {
		return true;
	} else {
		return false;
	}
}

ComfyJS.onCommand = (user, command, message, flags, extra) => {
	// check if command is in the list of commands
	command = `!${command.toLowerCase()}`;

	if (commands.addTaskCommands.includes(command)) {
		// ADD TASK

		if (checkUserTask(user)) {
			// check if user has a task pending
			return respond(responseTemplates.userHasTask, user);
		}
		addTask(user, extra.userColor, message);

		respond(responseTemplates.taskAdded, user, message);
	} else if (commands.finishTaskCommands.includes(command)) {
		// FINISH TASK

		if (!checkUserTask(user)) {
			// check whether user has task, if not, return
			return respond(responseTemplates.noTask, user);
		}

		let finishedTask = "";

		if (settings.showDoneTasks) {
			finishedTask = doneTask(user);
		} else {
			finishedTask = removeTask(user);
		}

		respond(responseTemplates.taskFinished, user, finishedTask);
	} else if (commands.deleteTaskCommands.includes(command)) {
		// DELETE TASK

		let removedTask = removeTask(user);

		respond(responseTemplates.taskDeleted, user, removedTask);
	} else if (commands.editTaskCommands.includes(command)) {
		// EDIT TASK

		if (!checkUserTask(user)) {
			// check if user has a task pending
			return respond(responseTemplates.noTask, user);
		}
		editTask(user, message);

		respond(responseTemplates.taskEdited, user, message);
	} else if (commands.checkCommands.includes(command)) {
		// CHECK YOUR OWN TASK

		if (!checkUserTask(user)) {
			// check if user has a task pending
			return respond(responseTemplates.noTask, user);
		}
		let currentTask = checkTask(user);

		respond(responseTemplates.taskCheck, user, currentTask);
	} else if (commands.adminClearAllCommands.includes(command)) {
		if (!isMod(flags)) {
			// user is not a mod or broadcaster
			return respond(responseTemplates.notMod, user);
		}
		resetDB();
		renderTaskList();

		respond(responseTemplates.clearedAll, user);
	} else if (commands.adminDeleteCommands.includes(command)) {
		if (!isMod(flags)) {
			// user is not a mod or broadcaster
			return respond(responseTemplates.notMod, user);
		}
		adminDeleteTask(message);
		respond(responseTemplates.adminDeleteTasks, user, message);
	} else if (commands.adminClearDoneCommands.includes(command)) {
		if (!isMod(flags)) {
			// user is not a mod or broadcaster
			return respond(responseTemplates.notMod, user);
		}
		cleardone();
		respond(responseTemplates.clearedDone, user);
	} else if (command === "!ryanpython") {
		respond(responseTemplates.ryanpython, user);
	} else if (commands.helpCommands.includes(command)) {
		respond(responseTemplates.help, user);
	} else {
		// command not found
	}
};

// ComfyJS.Init("RyanPython");
ComfyJS.Init(auth.username, `oauth:${auth.oauth}`, [auth.channel]);
