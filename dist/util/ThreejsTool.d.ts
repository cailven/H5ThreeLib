export declare class ThreejsTool {
    constructor();
    private scene;
    private camera;
    private renderer;
    private controls;
    private container;
    private raycaster;
    private mouse;
    private composer;
    init(container: any): void;
    static initEnd: any;
    static rayData: Array<any>;
    helpbox(pos: any): THREE.Mesh;
    setCenter(mesh: any): void;
    computeObj3dBoundBox(container: THREE.Object3D): Object;
    private static callbackArr;
    static active(callBack: any): void;
    static setRayData(name: any, func: any): void;
    createOrbitControls(): any;
}
