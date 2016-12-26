function ScoreboardPrimitive(id)
{
	Primitive.call(this, id);
}

ScoreboardPrimitive.prototype = Object.create(Primitive.prototype);

ScoreboardPrimitive.prototype.constructor = ScoreboardPrimitive;
