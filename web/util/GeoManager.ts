export class GeoManager {
    constructor() {
        this.scene = window["scene"];
        this.camera = window["camera"];
        this.renderer = window["renderer"];
    }

    private scene;
    private camera;
    private renderer;

    public createCube(_width = 10, _hight = 10, _depth = 10, pos = new THREE.Vector3(0, 0, 0)) {
        var cubeGeo = new THREE.CubeGeometry(_width, _hight, _depth);
        var cube = new THREE.Mesh(cubeGeo, new THREE.MeshNormalMaterial());
        cube.position.set(pos.x, pos.y, pos.z);
        this.scene.add(cube);
        return cube;
    }

}