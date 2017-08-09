import { MessageCommand, Bot, channels } from "../src/bot"
import * as assert from 'assert'

let mockMessage = { content: "!command and other arguments", author: { bot: false } }
let config = {
	token: "",
	prefix: "!",
}

let mockChannels = [1, 2]

describe('Bot', () => {
	describe("Message Handler", () => {
		it("should execute handler when message event emit", done => {
			var bot = Bot(config, [
				MessageCommand("command", _ => done()),
				MessageCommand("fail", _ => { throw new Error("this should not be called") })
			])

			bot._client.emit("message", mockMessage)
		})
	})
	it("should set channels got from client", () => {
		var bot = Bot(config, [])
		bot._client.channels = mockChannels
		bot._client.emit("ready")
		assert.ok(channels !== undefined)
	})
})