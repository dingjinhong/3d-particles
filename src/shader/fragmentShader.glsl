uniform vec3 uColor1;
uniform vec3 uColor2;
varying vec3 vPosition;

void main() {
 vec3 rgb = vec3(1.0, 1.0, 1.0);
 rgb = mix(uColor1, uColor2, vPosition.z);
 gl_FragColor = vec4(rgb, 0.8);
}