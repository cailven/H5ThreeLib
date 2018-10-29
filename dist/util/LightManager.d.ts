export declare class LightManager {
    constructor();
    private scene;
    private camera;
    private renderer;
    addAmbientLight(color?: string, intensity?: number): THREE.AmbientLight;
    addSpotLight(color?: string, intensity?: number, angle?: any, dist?: number, shadow?: any): THREE.SpotLight;
    addPointLight(color?: string, intensity?: number, dist?: number, shadow?: any): THREE.PointLight;
    addHemisphereLight(color1?: string, color2?: string, intensity?: number): THREE.HemisphereLight;
}
