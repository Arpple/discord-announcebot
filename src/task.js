const messageShowLength = 20

export function Task(name, time, message){
	return {
		name: name,
		time: time,
		message: message,
		job: undefined,
		toString: () => "**" + name + "** : " + time + " => " + message.substring(0, messageShowLength)
	}
}