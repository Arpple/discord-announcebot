import * as Discord from 'discord.js'

let prefix = "!"

/**
 * bot command execute on user message
 * @param {string} command 
 * @param {MessageCommandCallback} callback 
 */
export const MessageCommand = (command, callback) => {
	return {
		command: command,
		callback: callback
	}
}

/**
 * 
 * @param {Discord.Message} message 
 * @param {array} msgCommands
 */
export const Bot = (token, msgCommands) => {

	const _token = token
	const _client = new Discord.Client()

	/**
	 * 
	 * @param {Discord.Message} message 
	 */
	const MsgHandler = (message) => {
		if(message.author.bot || !message.content.startsWith(prefix)) return 0

		const isCmd = (cmd) => message.content.startsWith(prefix + cmd)

		const runCmd = (msgCmd) => {
			if(isCmd(msgCmd.command)) msgCmd.callback(message)
		}

		msgCommands.forEach((cmd) => runCmd(cmd))
	}

	_client.on('message', MsgHandler)
	_client.on('ready', () => {
		console.log("Ready")
	})

	return {
		_client: _client,
		start: () => _client.login(_token)
	}
}

/**
 * @callback MessageCommandCallback
 * @param {Discord.Message} message
 */