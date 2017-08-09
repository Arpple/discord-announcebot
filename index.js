import { Task } from "./src/task"
import { Bot, MessageCommand } from './src/bot'
import * as schedule from 'node-schedule'
import { config } from './config/config'

const tasks = []

const getCommandArguments = (message) => message.content.split(" ").slice(1)

const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n)

const help = `
\`\`\`md
# Commands

- help
    show this

- list
  show all scheduled tasks

- add <name> <time> <message>
  - name
    name of this task *without space*
  - time
    cron time for this task (more information below)
  - message
    yes, just any message

- remove <number>
  - number
    index of task, see it using 'list'

# Cron Time
time format compose with 5 strings
*  *  *  *  *
┬  ┬  ┬  ┬  ┬
│  │  │  │  |
│  │  │  │  └ day of week (0 - 7) (0 or 7 is Sun)
│  │  │  └─── month (1 - 12)
│  │  └────── day of month (1 - 31)
│  └───────── hour (0 - 23)
└──────────── minute (0 - 59)

* => any
*/n => any that can divide by n (*/5 = every 5 min)
\`\`\`
`

const bot = Bot(config.token, [

	MessageCommand("ping", (message) => message.channel.send("pong")),

	MessageCommand("help", (message) => message.channel.send(help)),

	MessageCommand("add", (message) => {
		let args = getCommandArguments(message)
		var task = Task(args[0], args.slice(1, 6).join(" "), args.slice(6).join(" "))
		task.job = schedule.scheduleJob(task.time, () => message.channel.send(task.message))
		tasks.push(task)
		message.channel.send("added")
	}),

	MessageCommand("list", (message) => {
		message.channel.send("**--Tasks--**\n" + (tasks.map((t, i) => "#" + i + " " + t.toString()).join("\n")))
	}),

	MessageCommand("remove", (message) => {
		let index = getCommandArguments(message)[0]
		if(!isNumeric(index) || tasks[index] === void 0) return
		schedule.cancelJob(tasks[index].job)
		delete tasks[index]
		message.channel.send("removed")
	})
]).start()