#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform vec2 uSelectedInitialTexCoord;
uniform vec2 uSelectedFinalTexCoord;

varying vec2 vTextureCoord;

void main()
{
    vec3 offset = vec3(0.0,0.0,0.0);

    if(uSelectedInitialTexCoord.s != -1.0)
    {
        if(aTextureCoord.s >= uSelectedInitialTexCoord.s &&
           aTextureCoord.t >= uSelectedInitialTexCoord.t &&
           aTextureCoord.s <= uSelectedFinalTexCoord.s &&
           aTextureCoord.t <= uSelectedFinalTexCoord.t)
        {
            offset.z = 1.0;
        }
    }

    vTextureCoord = aTextureCoord;

    gl_Position = uPMatrix*uMVMatrix*(vec4(aVertexPosition+offset, 1.0));
}
