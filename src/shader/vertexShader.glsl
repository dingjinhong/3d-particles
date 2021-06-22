varying vec3 vPosition;
uniform float uTime;
uniform float uScale;
uniform float uSize;
attribute vec3 aRandom;

mat4 rotation3d(vec3 axis, float angle) {
  axis = normalize(axis);
  float s = sin(angle);
  float c = cos(angle);
  float oc = 1.0 - c;

  return mat4(
		oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
    oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
    oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
		0.0,                                0.0,                                0.0,                                1.0
	);
}

void main() {
  vPosition = position;

  vec3 pos = position*1.5;

  vec3 trans = aRandom*10.;
  
  pos += sin(aRandom*uTime)*0.01;

  // vec4 temp = vec4(pos.x,pos.y,pos.z,1.);
  // float curAngle = cos(uTime) * 6.28;
  // vec3 rotationAxis = vec3(1.,1.,1.);

  // mat4 curMat = rotation3d(rotationAxis, curAngle);
  // vec4 curVec4 = temp * curMat;
  // pos = curVec4.xyz;

  // vec4 result = temp * 

  //pos *= uScale+aRandom*(1.-uScale);

  pos.x += sin(uTime)*aRandom.x*(1.-uScale);
  pos.z += cos(uTime)*aRandom.z*(1.-uScale);
  pos.y += sin(uTime)*aRandom.x*(1.-uScale);

  pos *= uScale;
  

  vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );
  gl_Position = projectionMatrix * mvPosition;
  gl_PointSize = uSize / -mvPosition.z;
}