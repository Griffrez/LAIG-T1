function VehiclePrimitive(id)
{
	Primitive.call(this, id);
}

VehiclePrimitive.prototype = Object.create(Primitive.prototype);

VehiclePrimitive.prototype.constructor = VehiclePrimitive;

VehiclePrimitive.prototype.graphicConstructor = MyVehicle;