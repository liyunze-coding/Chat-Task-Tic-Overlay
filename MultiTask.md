# Multi-Task Widget

Multi-Task Widget is a task widget that allows you to add multiple tasks at one time!

Want acccess to the widget for your stream? Join the <a href="https://discord.gg/UnHyHkhbga" target="_blank">Discord server</a>!

---

# Follow the creator of the bot!

Hi! I frequently stream co-working & study so please drop a follow if you enjoy using the task bot, thank you <3

-    <a target="_blank" href="https://www.twitch.tv/RythonDev">https://www.twitch.tv/RythonDev</a>

# Basic commands

`()` : optional, if there's only 1 incomplete task

`[]` : required

-    `!taskhelp` : shows the help message
-    `!add [task]` : add the task to your list
-    `!focus (index / task)` : focus on ONE task
-    `!edit (index) [task]` : edit the task at the specified index
-    `!done (index / task)` : mark task as done
-    `!undone (index / task)` : mark task as incomplete
-    `!remove (index / task)` : remove task from list
-    `!check (@user)` : check (your own / mentioned user's) incomplete tasks
-    `!mytasks` : check your own incomplete tasks
-    `!count (@user)` : check (your own / mentioned user's) completed task count
-    `!boardcount` : check how many tasks have been completed by everyone in chat
-    `!points (@user)` : check how many points (you / mentioned user) earned

## Tips:

-    You can add/remove/mark complete several tasks in 1 command!
-    When you focus on a task, not only will it be highlighted on the widget, but the selected task will be given priority when you do `!done`

## Multiple tasks in one command

### Add command

-    `!add task 1, task 2, task 3`

### Remove command

-    `!remove task 1, task 2, task 3` (specify task names)
-    `!remove 1, 2, 3` (specify task indexes/indices)
-    `!remove 1 2 3` (specify task indexes/indices without commas)

### Done command

-    `!done task 1, task 2, task 3` (specify task names)
-    `!done 1, 2, 3` (specify task indexes/indices)
-    `!done 1 2 3` (specify task indexes/indices without commas)
-    `!done all`

# Admin commands

## Mod only

-    `!adel @user` : clears all tasks of the mentioned user

## Streamer only

-    `!clearall` : clears all tasks and count
-    `!cleartasks` : clears all tasks\*
-    `!cleardone` : clears all done tasks\*
-    `!clearns` : clear all tasks excluding streamer's incomplete tasks\*
-    `!resetboardcount` : resets the board count, individual users' task count won't be affected
-    `!resetuserscount` : resets users' task count, board count won't be affected
-    `!setboardcount [integer]` : set the board count to [integer], users' task count won't be affected

\* = count won't be affected at all
