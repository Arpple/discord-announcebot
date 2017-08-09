import { MessageCommand, Bot } from "../src/bot"

let mockMessage = { content: "!command and other arguments", author: { bot: false } }

describe('Bot', () => {
	describe("Message Handler", () => {
		it("should execute handler when message event emit", done => {
			var bot = Bot("", [
				MessageCommand("command", _ => done()),
				MessageCommand("fail", _ => { throw new Error("this should not be called") })
			])

			bot._client.emit("message", mockMessage)
		})
	})
})