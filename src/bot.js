import * as Discord from 'discord.js'

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
export const Bot = (config, msgCommands) => {

	const _config = config
	const _client = new Discord.Client()

	/**
	 * 
	 * @param {Discord.Message} message 
	 */
	const MsgHandler = (message) => {
		if(message.author.bot || !message.content.startsWith(_config.prefix)) return 0

		const isCmd = (cmd) => message.content.startsWith(_config.prefix + cmd)

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
		start: () => _client.login(_config.token)
	}
}

/**
 * @callback MessageCommandCallback
 * @param {Discord.Message} message
 */