import { Task } from "./src/task"
import { Bot, MessageCommand, channels } from './src/bot'
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

const sendCmdReply = (message, str) => message.channel.send(str).then(msg => msg.delete(config.cmdExpire))
const sendAnnouncement = (message, str) => {
	let channel
	if(config.cmdFixedChannel)
		channel = channels.get(config.msgChannelId)
	else
		channel = message.channel
	channel.send(str).then(msg => msg.delete(config.msgExpire))
}

const bot = Bot(config, [

	MessageCommand("ping", (message) => sendCmdReply(message, "pong")),

	MessageCommand("help", (message) => sendCmdReply(message, help)),

	MessageCommand("add", (message) => {
		let args = getCommandArguments(message)
		var task = Task(args[0], args.slice(1, 6).join(" "), args.slice(6).join(" "))
		task.job = schedule.scheduleJob(task.time, () => sendAnnouncement(message, task.message))
		tasks.push(task)
		sendCmdReply(message, "added")
	}),

	MessageCommand("list", (message) => {
		sendCmdReply(message, "**--Tasks--**\n" + (tasks.map((t, i) => "#" + i + " " + t.toString()).join("\n")))
	}),

	MessageCommand("remove", (message) => {
		let index = getCommandArguments(message)[0]
		if(!isNumeric(index) || tasks[index] === void 0) return
		schedule.cancelJob(tasks[index].job)
		tasks.splice(index, 1)
		sendCmdReply(message, "removed")
	})
]).start()