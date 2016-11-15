uniform vec4 c1;
uniform vec4 c2;
uniform vec4 cs;

uniform sampler2D uSampler;

varying vec2 vTextureCoord;
uniform ivec2 uSelected;
uniform ivec2 uDivisions;
uniform vec2 uSelectedSInterval;
uniform vec2 uSelectedTInterval;
uniform vec2 uDivisionIncrement;

void main()
{
    vec4 colorFactor;
    bool isSelected = false;

    if(uSelectedSInterval.x != -1)
    {
        if(vTextureCoord.s >= uSelectedSInterval[0],
           vTextureCoord.s <= uSelectedSInterval[1],
           vTextureCoord.t >= uSelectedTInterval[0],
           vTextureCoord.t <= uSelectedTInterval[1])
        {
            colorFactor = cs;
            isSelected = true;
        }
    }

    if(!isSelected)
    {
        
    }
}
