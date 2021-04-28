import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import {DRACOLoader} from 'three/examples/jsm/loaders/DRACOLoader.js'

class Model{
    constructor(obj){
        console.log(obj)

        this.name = obj.name;
        this.file = obj.file;

        this.loader = new GLTFLoader();
        this.dracoLoader = new DRACOLoader();
        this.dracoLoader.setDecoderPath( './draco/' );
        this.loader.setDRACOLoader(this.dracoLoader );

        this.init()
    }
    init(){
        this.loader.load(
            // resource URL
            this.file,
            // called when the resource is loaded
            ( gltf ) => {
                console.log(gltf)
            })
    }
}
export default Model