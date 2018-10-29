export declare class ThreejsTool {
    constructor();
    private scene;
    private camera;
    private renderer;
    private controls;
    private container;
    init(container: any): void;
    helpbox(pos: any): THREE.Mesh;
    setCenter(mesh: any): void;
    computeObj3dBoundBox(container: THREE.Object3D): Object;
    private static callbackArr;
    static active(callBack: any): void;
    createOrbitControls(): any;
    addAmbientLight(color: any, intensity: any): THREE.AmbientLight;
    addSpotLight(color: any, intensity: any, angle: any, dist: any, shadow: any): THREE.SpotLight;
    addPointLight(color: any, intensity: any, dist: any, shadow: any): THREE.PointLight;
    addHemisphereLight(color1: any, color2: any, intensity: any): THREE.HemisphereLight;
    static worldToScreenPosition(position: any, camera: any): {
        x: number;
        y: number;
    };
    static horizontalAngle(object1: any, object2: any): number;
    static verticalAngle(object1: any, object2: any): number;
    static getWorldPosition(object: any): THREE.Vector3;
    static Math: {
        radians: (degrees: any) => number;
        degrees: (radians: any) => number;
        inverseLerp: (a: any, b: any, value: any) => number;
    };
}
