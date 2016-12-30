/**
 * Stack
 * @class
 * @this Stack
 * @augments Array
 * @classdesc Simple stack type data structure
 */
function Stack()
{
	Array.call(this);
}

Stack.prototype = Object.create(Array.prototype);

Stack.prototype.constructor = Stack;

/**
 * Returns the element on top of the stack
 * @function
 * @returns Top element of the stack
 */
Stack.prototype.top = function()
{
	let length = this.length;

	return this[length - 1];
};