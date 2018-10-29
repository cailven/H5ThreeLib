export class LightManager {

    constructor() {

        this.scene = window["scene"];
        this.camera = window["camera"];
        this.renderer = window["renderer"];
    }

    private scene;
    private camera;
    private renderer;


    public addAmbientLight(color = "#ffffff", intensity = 1.0): THREE.AmbientLight {
        var light = new THREE.AmbientLight(color, intensity);
        this.scene.add(light);
        return light;
    }

    public addSpotLight(color = "#ffffff", intensity = 1.0, angle = null, dist = 500, shadow = null): THREE.SpotLight {
        var light = new THREE.SpotLight(color, intensity, dist, angle);
        if (shadow) {
            light.castShadow = true;
            light.shadow.mapSize.width = 1024;
            light.shadow.mapSize.height = 1024;
            light.shadow.camera.near = 1;
            light.shadow.camera.far = 2000;
        }
        this.scene.add(light);
        return light;
    }

    public addPointLight(color = "#ffffff", intensity = 1.0, dist = 500, shadow = null): THREE.PointLight {
        var light = new THREE.PointLight(color, intensity, dist);
        if (shadow) {
            light.castShadow = true;
            light.shadow.mapSize.width = 1024;
            light.shadow.mapSize.height = 1024;
            light.shadow.camera.near = 1;
            light.shadow.camera.far = 2000;
        }
        this.scene.add(light);
        return light;
    }

    public addHemisphereLight(color1 = "#ff0000", color2 = "#0000ff", intensity = 1.0): THREE.HemisphereLight {
        var light = new THREE.HemisphereLight(color1, color2, intensity);
        this.scene.add(light);
        return light;
    }
}