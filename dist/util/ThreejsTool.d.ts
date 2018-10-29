export declare class ThreejsTool {
    constructor();
    private scene;
    private camera;
    private renderer;
    private controls;
    private container;
    init(container: any): void;
    static initEnd: any;
    helpbox(pos: any): THREE.Mesh;
    setCenter(mesh: any): void;
    computeObj3dBoundBox(container: THREE.Object3D): Object;
    private static callbackArr;
    static active(callBack: any): void;
    createOrbitControls(): any;
}
