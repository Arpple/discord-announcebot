import assert from 'assert'
import { Task } from '../src/task'

describe('Task', () => {
	describe('toString()', () => {
		it('should be in format `**name** time => msg', () => {
			let t = Task("name", "* * * * * *", "message")
			assert.equal(t.toString(), "**name** : * * * * * * => message")
		})
		it('should not show all of too long message', () => {
			var longMsg = "this is very very very long message that it shouldn't be shown in full length"
			let t = Task("name", "* * * * * *", longMsg)
			assert.ok(t.toString().length < "**name** : * * * * * * => this is very very very long message that it shouldn't be shown in full length".length)
		})
  	})
})