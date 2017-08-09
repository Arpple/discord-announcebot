// you can define all config value here or get it from process.env

export let config = {

	// bot access token
	token: "TOKEN",

	// bot command prefix
	prefix: "!",

	// auto delete bot command message time (millisec)
	cmdExpire: 30000,

	// only accept command from target channel
	// if true, you need to specify id in `cmdChannelId`
	cmdFixedChannel: false,
	cmdChannelId: "",

	// auto delete bot announce message time (millisec)
	msgExpire: 1800000,

	// only send message to target channel
	// if true, you need to specify id in `msgChannelId`
	msgFixedChannel: false,
	msgChannelId: "",
}