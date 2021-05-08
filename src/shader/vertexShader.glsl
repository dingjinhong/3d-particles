varying vec3 vPosition;
uniform float uTime;
uniform float uScale;
attribute vec3 aRandom;

void main() {
  vPosition = position;

  vec3 pos = position*1.5;

  vec3 trans = aRandom*10.;

  
  pos += sin(aRandom*uTime)*0.01;
  pos *= uScale+aRandom*(1.-uScale);

  pos *= uScale;
  

  vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = 6.0 / -mvPosition.z;
}