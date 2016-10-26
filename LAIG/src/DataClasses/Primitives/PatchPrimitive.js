function PatchPrimitive(id, orderU, orderV, partsU, partsV, controlPoints)
{
    Primitive.call(this, id);

    this.orderU = orderU;
    this.orderV = orderV;
    this.partsU = partsU;
    this.partsV = partsV;
    this.controlPoints = controlPoints;
}

PatchPrimitive.prototype = Object.create(Primitive.prototype);

PatchPrimitive.prototype.getOrderU = function()
{
    return this.orderU;
};

PatchPrimitive.prototype.getOrderV = function()
{
    return this.orderV;
};

PatchPrimitive.prototype.getPartsU = function()
{
    return this.partsU;
};

PatchPrimitive.prototype.getPartsV = function()
{
    return this.partsV;
};