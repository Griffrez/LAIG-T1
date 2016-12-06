/**
 * Component
 * Data structure to store information about a component. Used directly by the Engine.
 *
 * @param {string} id Uniquely identifies this component
 * @param {Transformation} transformation Reference to the Transformation used
 * @param {Array} materials Array of references to Materials used
 * @param {Texture} texture Reference to the Texture used
 * @param {Array} childComponents Array of references to child components
 * @param {Array} childPrimitives Array of references to child primitives
 */
function Component(id, transformation, materials, aniCluster, texture, childComponents, childPrimitives)
{
	this.id               = id;
	this.transformation   = transformation;
	this.materials        = materials;
	this.animationCluster = aniCluster;
	this.texture          = texture;
	this.children         = {'components': childComponents, 'primitives': childPrimitives};
}

Component.prototype.constructor = Component;

Component.prototype.getID = function()
{
	return this.id;
};

Component.prototype.getTransformation = function()
{
	return this.transformation;
};

Component.prototype.getMaterials = function()
{
	return this.materials;
};

Component.prototype.getAnimationCluster = function()
{
	return this.animationCluster;
};

Component.prototype.getTexture = function()
{
	return this.texture;
};

Component.prototype.getChildren = function()
{
	return this.children;
};
