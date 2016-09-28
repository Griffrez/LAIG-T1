function Components()
{
	this.components = [];
}

Components.prototype.addComponent = function (id)
{
	var elements_amount = this.components.length;
	for (var index = 0; index < elements_amount; index++)
	{
		if (id === this.components[index].id)
		{
			return "id already registered."
		}
	}

	this.components.push(new Component(id));
	return null;
};

