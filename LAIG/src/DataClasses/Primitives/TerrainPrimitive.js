function TerrainPrimitive(id, texture, heightmap)
{
    Primitive.call(this, id);

    this.texture = texture;
    this.heightmap = heightmap;
}

TerrainPrimitive.prototype = Object.create(Primitive.prototype);

TerrainPrimitive.prototype.getTexture = function()
{
    return this.texture;
};

TerrainPrimitive.prototype.getHeightMap = function()
{
    return this.heightmap;
};