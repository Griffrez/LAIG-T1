function MyHexagon(scene, prim)
{
    CGFobject.call(this, scene);

    this.hexPrim = prim;

    this.initBuffers();
}

MyHexagon.prototype = Object.create(CGFobject.prototype);

MyHexagon.prototype.constructor = MyHexagon;

MyHexagon.prototype.initBuffers = function()
{
    let side = this.hexPrim.getSide();

    this.vertices =
        [
            0, 0, 0,
            side, 0, 0,
            side*Math.cos(Math.PI/3), side*Math.sin(Math.PI/3), 0,
            side*Math.cos(Math.PI*2/3), side*Math.sin(Math.PI*2/3), 0,
            -side, 0, 0,
            side*Math.cos(Math.PI*4/3), side*Math.sin(Math.PI*4/3), 0,
            side*Math.cos(Math.PI*5/3), side*Math.sin(Math.PI*5/3), 0,
            side, 0, 0,
        ];

    this.indices =
        [
            0, 1, 2,
            0, 2, 3,
            0, 3, 4,
            0, 4, 5,
            0, 5, 6,
            0, 6, 7
        ];

    this.normals =
        [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1
        ];

    this.texCoords =
        [
            0.5, 0.5,
            1, 0.5,
            0.5+0.5*Math.cos(Math.PI/3), 0.5-Math.sin(Math.PI/3),
            0.5+0.5*Math.cos(Math.PI*2/3), 0.5-Math.sin(Math.PI*2/3),
            0, 0.5,
            0.5+0.5*Math.cos(Math.PI*4/3), 0.5-Math.sin(Math.PI*4/3),
            0.5+0.5*Math.cos(Math.PI*5/3), 0.5-Math.sin(Math.PI*5/3),
            1, 0.5
        ];

    this.primitiveType = this.scene.gl.TRIANGLES;
    this.initGLBuffers();
};
