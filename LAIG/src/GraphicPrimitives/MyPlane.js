/**
 * MyPlane
 * Class to represent a graphical representation of a plane.
 *
 * @param {Engine} scene Reference to the scene/engine used
 * @param {PlanePrimitive} prim Reference to the primitive data
 */
function MyPlane(scene, prim)
{
    CGFobject.call(this, scene);

    let dimX = prim.getDimX();
    let dimY = prim.getDimY();
    let partsX = prim.getPartsX();
    let partsY = prim.getPartsY();

    this.init(scene, dimX, dimY, partsX, partsY);
}

MyPlane.prototype = Object.create(CGFobject.prototype);
MyPlane.prototype.constructor = MyPlane;

MyPlane.prototype.init = function(scene, dimX, dimY, partsX, partsY)
{
    let degree = 1;

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

MyPlane.prototype = Object.create(CGFnurbsObject.prototype);

