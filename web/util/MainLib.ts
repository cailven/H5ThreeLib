import {ThreejsTool} from "./ThreejsTool";
import {LightManager} from "./LightManager";
import {Math3d} from "./Math3d";
import {GeoManager} from "./GeoManager";
import {ComposerManager} from "./ComposerManager";

export let init3D = new ThreejsTool();
export let lights;
export let math;
export let geos;
export let composer;

export let active = ThreejsTool.active;

export let setRayData = ThreejsTool.setRayData;

ThreejsTool.initEnd = function () {
    lights = new LightManager();
    math = new Math3d();
    geos = new GeoManager();
    composer = new ComposerManager();
}



