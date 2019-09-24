/// <reference path="../web/dts/three-effectcomposer.d.ts" />
export declare class ComposerManager {
    constructor();
    private scene;
    private camera;
    private renderer;
    private composer;
    createComposer(passes: any): boolean;
    setComposerShader(_uniforms: any, _fragmentShader: any): Object;
}
