#ifdef GL_ES
precision highp float;
#endif

uniform vec4 c1;
uniform vec4 c2;
uniform vec4 cs;

uniform sampler2D uSampler;

varying vec2 vTextureCoord;
uniform vec2 uDivisionIncrement;
uniform vec2 uSelectedInitialTexCoord;
uniform vec2 uSelectedFinalTexCoord;

void main()
{
    vec4 colorFactor;
    vec4 colorTexture = texture2D(uSampler, vTextureCoord);
    bool isSelected = false;

    if(uSelectedInitialTexCoord.s != -1.0)
    {
        if(vTextureCoord.s >= uSelectedInitialTexCoord.s &&
           vTextureCoord.t >= uSelectedInitialTexCoord.t &&
           vTextureCoord.s <= uSelectedFinalTexCoord.s &&
           vTextureCoord.t <= uSelectedFinalTexCoord.t)
        {
            colorFactor = cs;
            isSelected = true;
        }
    }

    if(!isSelected)
    {
        bool isC1 = true;
        vec2 resultMod = mod(vTextureCoord, uDivisionIncrement*2.0);
        bvec2 resultLess = greaterThanEqual(resultMod, uDivisionIncrement);
        if(resultLess[0])
        {
            isC1 = !isC1;
        }
        if(resultLess[1])
        {
            isC1 = !isC1;
        }
        if(isC1)
        {
            colorFactor = c1;
        }
        else
        {
            colorFactor = c2;
        }
    }
    gl_FragColor = (colorFactor + colorTexture)*0.5;
}
