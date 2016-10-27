/**
 * MyPatch
 * Class to represent a graphical representation of a plane.
 *
 * @param {Engine} scene Reference to the scene/engine used
 * @param {PatchPrimitive} prim Reference to the primitive data
 */
function MyPatch(scene, prim)
{
	CGFobject.call(this, scene);

	let orderU        = prim.getOrderU();
	let orderV        = prim.getOrderV();
	let partsU        = prim.getPartsU();
	let partsV        = prim.getOrderV();
	let controlPoints = prim.getControlPoints();

	this.init(scene, orderU, orderV, partsU, partsV, controlPoints);
}

MyPatch.prototype = Object.create(CGFnurbsObject.prototype);
MyPatch.prototype.constructor = MyPatch;

MyPatch.prototype.init = function(scene, orderU, orderV, partsU, partsV, controlPoints)
{
	let knotsU = [];
	let knotsV = [];

	let knotAmountU = (orderU + 1) * 2;

	for (let i = 0; i < knotAmountU; i++)
	{
		if (i < (knotAmountU / 2))
		{
			knotsU.push(0);
		}
		else
		{
			knotsU.push(1);
		}
	}

	let knotAmountV = (orderV + 1) * 2;

	for (let i = 0; i < knotAmountV; i++)
	{
		if (i < (knotAmountV / 2))
		{
			knotsV.push(0);
		}
		else
		{
			knotsV.push(1);
		}
	}

	this.nurbsSurface = new CGFnurbsSurface(orderU, orderV, knotsU, knotsV, controlPoints);
    this.getPoint = function(u, v)
    {
        return this.nurbsSurface.getPoint(u, v);
    };

	CGFnurbsObject.call(this, scene, this.getPoint, partsU, partsV);
};
