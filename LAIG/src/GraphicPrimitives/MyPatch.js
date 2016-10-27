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

    let orderU = prim.getOrderU();
    let orderV = prim.getOrderV();
    let partsU = prim.getPartsU();
    let partsV = prim.getOrderV();
    let controlPoints = prim.getControlPoints();

    this.init(scene, orderU, orderV, partsU, partsV, controlPoints);
}

MyPatch.prototype = Object.create(CGFobject.prototype);
MyPatch.prototype.constructor = MyPatch;

MyPatch.prototype.init = function(scene, dimX, dimY, partsX, partsY)
{
    let knotsU = [];
    let knotsV = [];

    let knotAmount = (degree+1)*2;

    for(let i = 0; i < knotAmount; i++)
    {
        if(i < (knotAmount/2))
        {
            knotsU.push(0);
            knotsV.push(0);
        }
        else
        {
            knotsU.push(1);
            knotsV.push(1);
        }
    }

    let controlPoints = [];

    let halfDimX = dimX/2;
    let halfDimY = dimY/2;

    controlPoints.push([-halfDimX, -halfDimY, 0]);
    controlPoints.push([halfDimX, -halfDimY, 0]);
    controlPoints.push([-halfDimX, halfDimY, 0]);
    controlPoints.push([halfDimX, halfDimY, 0]);

    this.nurbsSurface = new CGFnurbsSurface(degree, degree, knotsU, knotsV, controlPoints);

    CGFnurbsObject.call(this, scene, this.nurbsSurface.getPoint, partsX, partsY);
};

MyPatch.prototype = Object.create(CGFnurbsObject.prototype);

