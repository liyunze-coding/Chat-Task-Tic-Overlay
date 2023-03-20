# Chat-Task-Tic Overlay (Beta)

## Commands

-    !task \<task\> - Add a task
-    !done \<task\> - Mark a task as done
-    !remove \<task\> - Remove a task
-    !edit \<task\> - Edit a task
-    !check - Check your last task

### Moderators only

-    !clear - Clear all tasks
-    !cleardone - Clear all done tasks
-    !adel @user - Remove all tasks from a user

---

## Features

-    Add tasks
-    Remove tasks
-    Edit tasks
-    Mark tasks as done
-    Check your last task
-    Clear all tasks (mod only)
-    Clear all done tasks (mod only)
-    Remove all tasks from a user (mod only)

## Why you should use this

-    Free
-    Easy to use
-    Easy to setup
-    Easy to customize
-    No third-party database required

Note: It's only available on Twitch for now

---

## Installation

1. Install the zip or clone the repository
2. Create a Twitch application [here](https://dev.twitch.tv/console/apps) \(Log in with your alternate Twitch account if you wish to use a different account as a bot account\)
3. Copy the `Client ID` from the application
4. Create token using `get_token.txt`. Replace `CLIENT_ID` with the `Client ID` from the application
5. Setup authentication in `auth.js`
6. Setup `Browser Source` in OBS with the following settings:
     - Local file: `index.html`
     - Refresh browser when scene becomes active: `checked`

---

## Customization settings

Edit `configs.js` to edit the style of the task list

### Settings

`showDoneTasks`:

**true**: show the done tasks

**false**: hide the done tasks

`showTaskNumber`:

**true**: show the task number (completed tasks / total tasks)

**false**: hide the task number

`crossTasksOnDone`:

**true**: cross the tasks when they are marked as done

**false**: don't cross the tasks when they are marked as done

`showCheckBox`:

**true**: show the checkbox

**false**: hide the checkbox, use bullet points instead

### fonts

`headerFontFamily` - font family for the header \(supports all fonts from [Google Fonts](https://fonts.google.com/) \)

`bodyFontFamily` - font family for the body \(supports all fonts from [Google Fonts](https://fonts.google.com/)\)

### scroll

`taskListScrollBehaviour` - scroll behaviour for the task list \([supports all css transition-timing-function](https://www.w3schools.com/css/css3_transitions.asp)\), linear and ease-in-out recommended

`pixelsPerSecond` - speed of the scroll in pixels per second (number)

### task list

`taskListWidth` - width of the task list (px)

`taskListHeight` - height of the task list (px)

`taskListBackgroundColor` - background color of the task list (hex only)

`taskListBackgroundOpacity` - background opacity of the task list (0: transparent, 1: opaque, 0.5: half transparent)

`taskListBorderColor` - border color of the task list (hex, name)

`taskListBorderWidth` - border width of the task list (px)

`taskListBorderRadius` - border radius of the task list (px)

### header

`headerHeight` - height of the header (px)

`headerBackgroundColor` - background color of the header (hex only)

`headerBackgroundOpacity` - background opacity of the header (0: transparent, 1: opaque, 0.5: half transparent)

`headerBorderColor` - border color of the header (hex, name)

`headerBorderWidth` - border width of the header (px)

`headerBorderRadius` - border radius of the header (px)

`headerFontSize` - font size of the header (px)

`headerFontColor` - font color of the header (hex, name)

`headerPadding` - padding of the header (px)

`tasksNumberFontSize` - font size of the tasks number (px)

( under construction )

---
