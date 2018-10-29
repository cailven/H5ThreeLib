export declare class Math3d {
    constructor();
    private scene;
    private camera;
    private renderer;
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
