function GamePrimitive(id)
{
	Primitive.call(this, id);
}

GamePrimitive.prototype = Object.create(Primitive.prototype);

GamePrimitive.prototype.constructor = GamePrimitive;