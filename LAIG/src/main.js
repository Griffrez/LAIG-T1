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
	'AuxiliarClasses/Stack.js',
	'EngineDataClasses/Animations/Animation.js',
	'DataClasses/Animations/AnimationData.js',
	'EngineDataClasses/Animations/CircularAnimation.js',
	'DataClasses/Animations/CircularAnimationData.js',
	'EngineDataClasses/Animations/EllipticAnimation.js',
	'DataClasses/Animations/EllipticAnimationData.js',
	'EngineDataClasses/Animations/LinearAnimation.js',
	'DataClasses/Animations/LinearAnimationData.js',
	'DataClasses/Primitives/Primitive.js',
	'GraphicPrimitives/MyChessboard.js',
	'DataClasses/Primitives/ChessboardPrimitive.js',
	'GraphicPrimitives/MyCylinder.js',
	'DataClasses/Primitives/CylinderPrimitive.js',
	'DataClasses/Primitives/GamePrimitive.js',
    'GraphicPrimitives/MyHexagon.js',
    'DataClasses/Primitives/HexagonPrimitive.js',
	'GraphicPrimitives/MyPatch.js',
	'DataClasses/Primitives/PatchPrimitive.js',
	'GraphicPrimitives/MyPlane.js',
	'DataClasses/Primitives/PlanePrimitive.js',
	'GraphicPrimitives/MyRectangle.js',
	'DataClasses/Primitives/RectanglePrimitive.js',
	'DataClasses/Primitives/ScoreboardPrimitive.js',
	'GraphicPrimitives/MySphere.js',
	'DataClasses/Primitives/SpherePrimitive.js',
	'GraphicPrimitives/MyTorus.js',
	'DataClasses/Primitives/TorusPrimitive.js',
	'GraphicPrimitives/MyTriangle.js',
	'DataClasses/Primitives/TrianglePrimitive.js',
	'GraphicPrimitives/MyVehicle.js',
	'DataClasses/Primitives/VehiclePrimitive.js',
	'DataClasses/Color.js',
	'DataClasses/ComponentData.js',
	'DataClasses/Elements.js',
	'DataClasses/Illumination.js',
	'DataClasses/Light.js',
	'DataClasses/Material.js',
	'DataClasses/OmniLight.js',
	'DataClasses/Perspective.js',
	'DataClasses/Scene.js',
	'DataClasses/SpotLight.js',
	'DataClasses/TextureData.js',
	'DataClasses/Transformation.js',
	'EngineDataClasses/Animations/AnimationCluster.js',
	'EngineDataClasses/Texture.js',
	'EngineDataClasses/Component.js',
	'GameClasses/Game.js',
	'GameClasses/GameBoard.js',
	'GameClasses/Piece.js',
	'GameClasses/PieceHolder.js',
	'GameClasses/Play.js',
	'GameClasses/PlaySequence.js',
	'GameClasses/Scoreboard.js',
	'GameClasses/Tile.js',
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

	               app.run();
               }

]);