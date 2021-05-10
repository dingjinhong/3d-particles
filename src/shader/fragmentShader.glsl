uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float uTime;
varying vec3 vPosition;

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
 vec3 rgb = vec3(1., 1., 1.);
 vec3 hsv = vec3(cos(uTime*0.01), .4, 1.0);


 //hsv = mix(uColor1, hsv, vPosition.x);

 rgb = hsv2rgb(hsv);
 rgb = mix(uColor1, rgb, vPosition.y);
 gl_FragColor = vec4(rgb, 0.8);
}

