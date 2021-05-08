import * as THREE from 'three'
import {gsap} from 'gsap'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader.js'
import {MeshSurfaceSampler} from 'three/examples/jsm/math/MeshSurfaceSampler.js'
import vertex from './shader/vertexShader.glsl'
import fragment from './shader/fragmentShader.glsl'

class Model{
    constructor(obj){

        this.name = obj.name;
        this.file = obj.file;
        this.scene = obj.scene;
        this.placeOnLoad = obj.placeOnLoad;
        this.color1 = obj.color1;
        this.color2 = obj.color2;
        this.isActive = false;

        this.loader = new GLTFLoader();
        this.dracoLoader = new DRACOLoader();
        this.dracoLoader.setDecoderPath( './draco/' );
        this.loader.setDRACOLoader(this.dracoLoader );

        this.init()
    }
    init(){
        this.loader.load(this.file,( gltf ) => {
            
            /**======================
             *    original mesh
             *========================**/
            this.mesh = gltf.scene.children[0]

            /**======================
             *    material mesh
             *========================**/
            this.material = new THREE.MeshBasicMaterial( { 
                color: 0xffff00, 
                wireframe: true 
            } );
            this.mesh.material = this.material;

            /**======================
             *    geometry mesh
             *========================**/
            this.geometry = this.mesh.geometry

            /**======================
             *    particle geometry
             *========================**/
            const sampler = new MeshSurfaceSampler(this.mesh).build()
            this.particleGeometry = new THREE.BufferGeometry()
            const particleNum = 20000
            const particlePosition = new Float32Array(particleNum * 3)
            const particleRandomness = new Float32Array(particleNum*3)

            for (let i = 0; i < particleNum; i++){
                const newPosition = new THREE.Vector3()
                sampler.sample(newPosition)
                particlePosition.set([
                    newPosition.x,
                    newPosition.y,
                    newPosition.z
                ], i*3)

                particleRandomness.set([
                    Math.random()*2-1,
                    Math.random()*2-1,
                    Math.random()*2-1
                ], i*3)
            }
            
            this.particleGeometry.setAttribute( 
                'position', 
                new THREE.BufferAttribute( particlePosition, 3 ) 
            );
            this.particleGeometry.setAttribute( 
                'aRandom', 
                new THREE.BufferAttribute( particleRandomness, 3 ) 
            );
            console.log(this.particleGeometry);

            /**======================
             *    material
             *========================**/
            this.material = new THREE.PointsMaterial( { 
                color: 0x888888, 
                size: 0.01
            } );

            /**======================
             *    partical material
             *========================**/
            this.particalMaterial = new THREE.ShaderMaterial( {
                uniforms: {
                    uColor1: {value: new THREE.Color(this.color1)},
                    uColor2: {value: new THREE.Color(this.color2)},
                    uTime: {value: 0},
                    uScale: {value: 0}
                },
                vertexShader: vertex,
                fragmentShader: fragment
            
            } );
    

            /**======================
             *    particles
             *========================**/
            this.particles = new THREE.Points(this.particleGeometry, this.particalMaterial)

            /**======================
             *    place on load
             *========================**/
            if (this.placeOnLoad) this.add()
        })
    }
    add(){
        this.scene.add(this.particles);
        this.isActive = true;
        gsap.to(this.particalMaterial.uniforms.uScale, {
            value: 1,
            duration: 1.2,
            delay: 1.2,
            ease: "power2.out",
        })
    }
    remove(){
        gsap.to(this.particalMaterial.uniforms.uScale, {
            value: 0,
            duration: 1.2,
            ease: "power2.in",
            onComplete: ()=>{
                this.scene.remove(this.particles);
                this.isActive = false;
            }
        })
    }
}
export default Model