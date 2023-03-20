const configs = (function () {
	"use strict";

	// settings
	const showDoneTasks = true; // true: check the box to mark the task as done, false: delete the task when done
	const showTasksNumber = true; // show the number of tasks in the header, 'false' recommended if show done tasks is false
	const crossTasksOnDone = false; // cross the task when done, 'false' recommended if show done tasks is false'
	const showCheckBox = true; // show the checkbox to mark the task as done (otherwise use bullet points), 'false' recommended if show done tasks is false

	// fonts
	const headerFontFamily = "Fredoka One"; // supports all google fonts - https://fonts.google.com/
	const bodyFontFamily = "Nunito"; // supports all google fonts - https://fonts.google.com/

	// scroll
	const taskListScrollBehaviour = "linear"; // supports all css transition-timing-function (ease-in-out or linear recommended) - https://www.w3schools.com/css/css3_transitions.asp
	const pixelsPerSecond = 30; // must be a number

	// task list
	const taskListWidth = "500px"; // must have px at the end
	const taskListHeight = "200px"; // must have px at the end
	const taskListBackgroundColor = "#000"; // hex only
	const taskListBackgroundOpacity = 0; // must be between 0 and 1

	const taskListBorderColor = "white"; // hex or name
	const taskListBorderWidth = "0px"; // must have px at the end
	const taskListBorderRadius = "10px"; // must have px at the end

	const numberOfLines = 1; // number of lines

	// header
	const headerBorderColor = "black"; // hex or name
	const headerBorderWidth = "px"; // must have px at the end
	const headerBorderRadius = "5px"; // must have px at the end
	const headerHeight = "30px"; // must have px at the end
	const headerFontSize = "20px"; // must have px at the end
	const headerBackgroundColor = "#000"; // hex only
	const headerBackgroundOpacity = 0.9; // must be between 0 and 1
	const headerFontColor = "white"; // hex or name
	const headerPadding = "10px"; // must have px at the end
	const tasksNumberFontSize = "20px"; // must have px at the end

	// body
	const bodyBorderColor = "white"; // hex or name
	const bodyBorderWidth = "0px"; // must have px at the end
	const bodyBorderRadius = "0px"; // must have px at the end
	const bodyBackgroundColor = "#ffffff"; // hex only
	const bodyBackgroundOpacity = 0; // must be between 0 and 1
	const bodyFontColor = "white"; // hex or name

	const bodyVerticalPadding = "5px"; // must have px at the end
	const bodyHorizontalPadding = "3px"; // must have px at the end

	// task (individual tasks)
	const usernameColor = "white"; // hex or name, "" for twitch username color

	const taskFontSize = "16px"; // must have px at the end
	const taskFontColor = "white"; // hex or name
	const taskBackgroundColor = "#000"; // hex only
	const taskBackgroundOpacity = 0.5; // must be between 0 and 1
	const taskBorderRadius = "5px"; // must have px at the end
	const taskBorderColor = "black"; // hex or name
	const taskBorderWidth = "0px"; // must have px at the end
	const taskMarginBottom = "5px"; // must have px at the end
	const taskPadding = "5px"; // must have px at the end

	// checkbox - if enabled
	const checkBoxSize = "15px"; // must have px at the end
	const checkBoxBackgroundColor = "#000"; // hex only
	const checkBoxBackgroundOpacity = 0; // must be between 0 and 1
	const checkBoxBorderRadius = "3px"; // must have px at the end
	const checkBoxBorderColor = "white"; // hex or name
	const checkBoxBorderWidth = "1px"; // must have px at the end

	const checkBoxMarginTop = "3px"; // must have px at the end
	const checkBoxMarginLeft = "2px"; // must have px at the end

	const tickCharacter = "'✔'"; // any character, must be in single quotes
	const tickColor = "white"; // hex or name
	const tickSize = "10px"; // must have px at the end
	const tickTranslateY = "0px"; // must have px at the end

	// bullet point - if enabled
	const bulletPointCharacter = "🌻"; // any character
	const bulletPointColor = "white"; // hex or name
	const bulletPointSize = "15px"; // must have px at the end
	const bulletPointMarginRight = "5px"; // must have px at the end
	const bulletPointMarginLeft = "5px"; // must have px at the end
	const bulletPointMarginTop = "-1px"; // must have px at the end

	// colon
	const colonMarginRight = "2px"; // must have px at the end
	const colonMarginLeft = "2px"; // must have px at the end

	// Add task commands - please add commands in the exact format
	const addTaskCommands = [
		"!taska",
		"!taskadd",
		"!atask",
		"!addtask",
		"!task",
		"!add",
		"!todo",
	];

	// Delete task commands - please add commands in the exact format
	const deleteTaskCommands = [
		"!taskdel",
		"!taskdelete",
		"!deltask",
		"!deletetask",
		"!taskr",
		"!taskremove",
		"!rtask",
		"!removetask",
		"!remove",
		"!delete",
	];

	// Edit task commands - please add commands in the exact format
	const editTaskCommands = [
		"!taske",
		"!taskedit",
		"!etask",
		"!edittask",
		"!edit",
	];

	// Finish task commands - please add commands in the exact format
	const finishTaskCommands = [
		"!taskf",
		"!taskfinish",
		"!ftask",
		"!finishtask",
		"!taskd",
		"!taskdone",
		"!donetask",
		"!dtask",
		"!finish",
		"!done",
		"!finished",
	];

	// Check task commands - please add commands in the exact format
	const checkCommands = [
		"!taskc",
		"!taskcheck",
		"!ctask",
		"!checktask",
		"!mytask",
		"!check",
	];

	// Help commands - please add commands in the exact format
	const helpCommands = [
		"!taskh",
		"!taskhelp",
		"!htask",
		"!helptask",
		"!tasks",
	];

	// Admin delete - please add commands following the exact format
	const adminDeleteCommands = [
		"!taskadel",
		"!adel",
		"!adelete",
		"!admindelete",
	];

	// Admin clear done - please add commands following the exact format
	const adminClearDoneCommands = [
		"!acleardone",
		"!admincleardone",
		"!cleardone",
	];

	const adminClearAllCommands = [
		"!clearall",
		"!allclear",
		"!adminclearall",
		"!adminallclear",
		"!aclearall",
		"!aclear",
		"!clear",
	];

	// TODO ADD GITHUB README TO HELP COMMAND
	// Responses
	const taskAdded = 'The task "{task}" has been added, {user}!';
	const noTaskAdded = 'Looks like you already have "{task}" up there {user}';
	const noTaskContent = "Try using !add the-task-you-are-working-on {user}";
	const noTaskToEdit = "No task to edit {user}";
	const taskEdited = 'Task edited to "{task}" {user}';
	const taskDeleted = 'Task "{task}" has been deleted, {user}';
	const adminDeleteTasks = "All of the user's tasks have been deleted";
	const taskFinished = 'Good job on finishing "{task}" {user}!';
	const taskCheck = '{user} your current task is: "{task}"';
	const noTask = "Looks like you don't have a task up there {user}";
	const noTaskA = "Looks like there is no task from that user there {user}";
	const notMod = "Permission denied, {user}; Mods only";
	const clearedAll = "All tasks have been cleared";
	const clearedDone = "All finished tasks have been cleared";
	const ryanpython =
		"{user} RyanPython is the creator of this bot, check out his Twitch at https://www.twitch.tv/ryanpython";
	const help = `{user} Use the following commands to help you out - !task !remove !edit !done. For mods !adel @user
		or !adel user. There are additional aliases as well. If you need any more help, feel free to ping 
		an available mod to assist you!`;

	// Other
	const styles = {
		headerFontFamily,
		bodyFontFamily,
		taskListScrollBehaviour,
		pixelsPerSecond,
		taskListWidth,
		taskListHeight,
		taskListBackgroundColor,
		taskListBackgroundOpacity,
		taskListBorderColor,
		taskListBorderWidth,
		taskListBorderRadius,
		numberOfLines,
		headerFontColor,
		headerBorderColor,
		headerBorderWidth,
		headerBorderRadius,
		headerHeight,
		headerFontSize,
		headerBackgroundColor,
		headerBackgroundOpacity,
		headerPadding,
		tasksNumberFontSize,
		bodyBorderColor,
		bodyBorderWidth,
		bodyBorderRadius,
		bodyBackgroundColor,
		bodyBackgroundOpacity,
		bodyFontColor,
		bodyVerticalPadding,
		bodyHorizontalPadding,
		usernameColor,
		taskFontSize,
		taskFontColor,
		taskBackgroundColor,
		taskBackgroundOpacity,
		taskBorderRadius,
		taskBorderColor,
		taskBorderWidth,
		taskMarginBottom,
		taskPadding,
		checkBoxSize,
		checkBoxBorderColor,
		checkBoxBorderRadius,
		checkBoxBorderWidth,
		checkBoxMarginTop,
		checkBoxMarginLeft,
		checkBoxBackgroundColor,
		checkBoxBackgroundOpacity,
		tickCharacter,
		tickColor,
		tickSize,
		tickTranslateY,
		bulletPointCharacter,
		bulletPointColor,
		bulletPointSize,
		bulletPointMarginRight,
		bulletPointMarginLeft,
		bulletPointMarginTop,
		colonMarginRight,
		colonMarginLeft,
	};

	const commands = {
		addTaskCommands,
		deleteTaskCommands,
		editTaskCommands,
		finishTaskCommands,
		helpCommands,
		checkCommands,
		adminDeleteCommands,
		adminClearDoneCommands,
		adminClearAllCommands,
	};

	const responses = {
		taskAdded,
		noTaskAdded,
		noTaskContent,
		taskDeleted,
		taskEdited,
		noTaskToEdit,
		taskFinished,
		taskCheck,
		noTask,
		noTaskA,
		notMod,
		help,
		adminDeleteTasks,
		ryanpython,
		clearedAll,
		clearedDone,
	};

	const settings = {
		showDoneTasks,
		showTasksNumber,
		crossTasksOnDone,
		showCheckBox,
	};

	let module = {
		styles,
		commands,
		responses,
		settings,
	};

	return module;
})();
