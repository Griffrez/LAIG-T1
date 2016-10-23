//From https://github.com/EvanHahn/ScriptInclude
include=function(){function f(){var a=this.readyState;(!a||/ded|te/.test(a))&&(c--,!c&&e&&d())}var a=arguments,b=document,c=a.length,d=a[c-1],e=d.call;e&&c--;for(var g,h=0;c>h;h++)g=b.createElement("script"),g.src=arguments[h],g.async=!0,g.onload=g.onerror=g.onreadystatechange=f,(b.head||b.getElementsByTagName("head")[0]).appendChild(g)};
serialInclude=function(a){var b=console,c=serialInclude.l;if(a.length>0)c.splice(0,0,a);else b.log("Done!");if(c.length>0){if(c[0].length>1){var d=c[0].splice(0,1);b.log("Loading "+d+"...");include(d,function(){serialInclude([]);});}else{var e=c[0][0];c.splice(0,1);e.call();};}else b.log("Finished.");};serialInclude.l=new Array();

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
        function(m,key,value) {
            vars[decodeURIComponent(key)] = decodeURIComponent(value);
        });
    return vars;
}

serialInclude([
	'../lib/CGF.js',
	'Engine.js',
	'Interface.js',
	'Parser.js',
	'DataClasses/Color.js',
	'DataClasses/Scene.js',
	'DataClasses/Perspective.js',
	'DataClasses/Illumination.js',
	'DataClasses/Light.js',
	'DataClasses/SpotLight.js',
	'DataClasses/OmniLight.js',
	'DataClasses/TextureData.js',
	'DataClasses/Material.js',
	'DataClasses/Transformation.js',
	'DataClasses/Primitives/Primitive.js',
	'DataClasses/Primitives/RectanglePrimitive.js',
	'DataClasses/Primitives/TrianglePrimitive.js',
	'DataClasses/Primitives/CylinderPrimitive.js',
	'DataClasses/Primitives/SpherePrimitive.js',
	'DataClasses/Primitives/TorusPrimitive.js',
	'DataClasses/ComponentData.js',
	'DataClasses/Elements.js',
	'EngineDataClasses/Texture.js',
	'EngineDataClasses/Component.js',
	'GraphicPrimitives/MyRectangle.js',
	'GraphicPrimitives/MyTriangle.js',
	'GraphicPrimitives/MyCylinder.js',
	'GraphicPrimitives/MySphere.js',
	'GraphicPrimitives/MyTorus.js',
               main = function()
               {
	               // Standard application, scene and interface setup
	               let app           = new CGFapplication(document.body);
	               let engine        = new Engine();
	               let userInterface = new Interface();

	               engine.interface = userInterface;

	               app.init();

	               app.setScene(engine);
	               app.setInterface(userInterface);

	               userInterface.setActiveCamera(engine.camera);

	               let filename = getUrlVars()['file'] || "scene.dsx";

	               let myGraph = new Parser(filename, engine);

	               app.run();
               }

]);