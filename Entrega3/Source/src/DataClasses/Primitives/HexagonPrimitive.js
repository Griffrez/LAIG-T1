function HexagonPrimitive(id, side)
{
    Primitive.call(this, id);

    this.side = side;
}

HexagonPrimitive.prototype = Object.create(Primitive.prototype);

HexagonPrimitive.prototype.constructor = HexagonPrimitive;

HexagonPrimitive.prototype.graphicConstructor = MyHexagon;

HexagonPrimitive.prototype.getSide = function()
{
    return this.side;
};