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

export let channels = undefined

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

		const isCmd = (cmd) => {
			return message.content.startsWith(_config.prefix + cmd)
				&& (!_config.cmdFixedChannel || message.channel.id == _config.cmdChannelId)
		}

		const runCmd = (msgCmd) => {
			if(isCmd(msgCmd.command)) msgCmd.callback(message)
		}

		msgCommands.forEach((cmd) => runCmd(cmd))
	}

	_client.on('message', MsgHandler)
	_client.on('ready', () => {
		channels = _client.channels
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