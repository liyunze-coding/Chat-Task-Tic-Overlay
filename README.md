# Better task list

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

## Customizing

Edit `configs.js` to edit the style of the task list

---
