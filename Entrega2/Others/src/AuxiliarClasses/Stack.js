/**
 * Stack
 * Simple stack type data structure
 */
function Stack()
{
	Array.call(this);
}

Stack.prototype = Object.create(Array.prototype);

Stack.prototype.constructor = Stack;

Stack.prototype.top = function()
{
	let length = this.length;

	return this[length - 1];
};