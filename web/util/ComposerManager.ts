///<reference path="../dts/three-effectcomposer.d.ts"/>

export class ComposerManager {
    constructor() {
        this.scene = window["scene"];
        this.camera = window["camera"];
        this.renderer = window["renderer"];
        this.composer = window["composer"];
    }

    private scene;
    private camera;
    private renderer;
    private composer;

    public createComposer(passes) {
        if (this.composer) {
            return false;
        }
        this.composer = new THREE.EffectComposer(this.renderer);
        var renderPass = new THREE.RenderPass(this.scene, this.camera);
        this.composer.addPass(renderPass);
        for (var i = 0; i < passes.length; i++) {
            var pass = passes[i];
            pass.renderToScreen = (i === passes.length - 1);
            this.composer.addPass(pass);
        }
        window["composer"] = this.composer;
    }

    public setComposerShader(_uniforms, _fragmentShader): Object {
        var shader = {
            uniforms: _uniforms,
            vertexShader: [
                "varying vec2 vUv;",
                "void main() {",
                "vUv = uv;",
                "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
                "}"

            ].join("\n"),
            fragmentShader: _fragmentShader
        };
        return shader;
    }

}