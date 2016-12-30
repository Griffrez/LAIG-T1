function MyBoard(scene, prim)
{
    CGFobject.call(this, scene);
    prim = null;
    this.init();
}

MyBoard.prototype = Object.create(CGFobject.prototype);

MyBoard.prototype.constructor = MyBoard;

MyBoard.prototype.init = function()
{
    this.cells = [];
    let hexPrim = new HexagonPrimitive("", 1);
    for(let i = 0; i < 61; i++)
    {
        this.cells.push(new MyHexagon(this.scene, hexPrim));
    }
};
