/**
 * Created by zhangcai on 2018/6/6.
 */
export class ThreejsTool {

    constructor() {

    }

    private scene;
    private camera;
    private renderer;
    private controls;
    private container;

    public init(container) {
        var s = this;
        this.scene = new THREE.Scene();
        this.scene.name = "scene";
        // this.scene.background = new THREE.Color(0xff0000);
        this.camera = new THREE.PerspectiveCamera(64, window.innerWidth / window.innerHeight, 1, 5000); // 创建摄影机
        // this.camera.position.set(-100, 25, 100);
        // this.camera.lookAt(0, 30, 0);
        this.camera.position.z = 150;
        this.camera.updateProjectionMatrix();
        this.renderer = new THREE.WebGLRenderer({antialias: true});
        this.renderer.setPixelRatio(2);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x0d176c, 1);
        this.renderer.shadowMap.enabled = true;
        this.renderer.localClippingEnabled = true;
        // var globalPlane = new THREE.Plane( new THREE.Vector3( 1, 0, 0 ), 1 );
        // this.renderer.clippingPlanes = [ globalPlane ];

        this.container = document.getElementById(container);
        this.container.appendChild(this.renderer.domElement);
        window["scene"] = this.scene;
        window["camera"] = this.camera;
        window["renderer"] = this.renderer;

        function animate() {
            requestAnimationFrame(animate);
            if (ThreejsTool.callbackArr.length > 0) {
                for (var i = 0; i < ThreejsTool.callbackArr.length; i++) {
                    ThreejsTool.callbackArr[i]();
                }
            }


            s.renderer.render(s.scene, s.camera);
            if (s.controls) {
                s.controls.update();
            }
        }

        animate();
        // window.addEventListener('resize', onWindowResize, false);

        window.addEventListener("resize", function () {
            setTimeout(function () {
                onWindowResize()
            }, 200);
        });

        function onWindowResize() {
            s.camera.aspect = window.innerWidth / window.innerHeight;
            s.camera.updateProjectionMatrix();
            s.renderer.setSize(window.innerWidth, window.innerHeight);
        }
    }

    public helpbox(pos) {
        var cubeGeo = new THREE.CubeGeometry(10, 10, 10);
        var cube = new THREE.Mesh(cubeGeo, new THREE.MeshBasicMaterial({
            color: 0xff0000,
        }));
        cube.position.set(pos.x, pos.y, pos.z);
        this.scene.add(cube);
        return cube;
    }

    public setCenter(mesh) {
        if (mesh.geometry) {
            mesh.geometry.computeBoundingBox();
            var a = mesh.geometry.boundingBox.max.clone().add(mesh.geometry.boundingBox.min);
            a.multiplyScalar(0.5);
            mesh.geometry.center();
        }
    }

    public computeObj3dBoundBox(container: THREE.Object3D): Object {

        var min1 = new THREE.Vector3();
        var max1 = new THREE.Vector3();
        for (var i in container.children) {
            var mesh = container.children[i];
            var geo = mesh["geometry"];
            if (geo) {
                geo.computeBoundingBox();
                console.log(mesh.position);
                var min = geo.boundingBox.min.clone().add(mesh.position);
                var max = geo.boundingBox.max.clone().add(mesh.position);
                min1.x = Math.min(min1.x, min.x);
                min1.y = Math.min(min1.y, min.y);
                min1.z = Math.min(min1.z, min.z);
                max1.x = Math.max(max1.x, max.x);
                max1.y = Math.max(max1.y, max.y);
                max1.z = Math.max(max1.z, max.z);
            }
        }

        return {
            min: min1,
            max: max1
        }
    }

    private static callbackArr = [];

    public static active(callBack) {
        this.callbackArr.push(callBack);
    }


    public createOrbitControls() {
        this.controls = new THREE.OrbitControls(this.camera, this.container);
        this.controls.minDistance = 120;
        this.controls.maxDistance = 150;
        this.controls.target = new THREE.Vector3(0, 40, 0);
        this.controls.enablePan = false;
        this.controls.enableRotate = false;
        this.controls.enableZoom = false;
        this.controls.minPolarAngle = Math.PI * 0.1;
        this.controls.maxPolarAngle = 1.69;
        // this.controls.maxPolarAngle = Math.PI * 0.499;
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.25;
        this.controls.rotateSpeed = 1;
        // this.controls.autoRotate = true;
        this.controls.autoRotateSpeed = 0.25;
        window["controls"] = this.controls;
        // var animationMixer = new THREE.AnimationMixer(camera);
        return this.controls;
    }

    public addAmbientLight(color, intensity): THREE.AmbientLight {
        var light = new THREE.AmbientLight(color, intensity);
        this.scene.add(light);
        return light;
    }

    public addSpotLight(color, intensity, angle, dist, shadow): THREE.SpotLight {
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

    public addPointLight(color, intensity, dist, shadow): THREE.PointLight {
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

    public addHemisphereLight(color1, color2, intensity): THREE.HemisphereLight {
        var light = new THREE.HemisphereLight(color1, color2, intensity);
        this.scene.add(light);
        return light;
    }


    //计算公式
    public static worldToScreenPosition(position, camera) {
        var vector = new THREE.Vector3();
        vector.copy(position);

        var widthHalf = 0.5 * window.innerWidth;
        var heightHalf = 0.5 * window.innerHeight;

        vector.project(camera);
        vector.x = (vector.x * widthHalf) + widthHalf;
        vector.y = -(vector.y * heightHalf) + heightHalf;
        return {
            x: vector.x,
            y: vector.y
        }
    }

    public static horizontalAngle(object1, object2) {
        var position1 = this.getWorldPosition(object1);
        position1.y = 0;
        position1.normalize();

        var position2 = this.getWorldPosition(object2);
        position2.y = 0;
        position2.normalize();
        return Math.acos(position1.dot(position2));
    }

    public static verticalAngle(object1, object2) {
        var position1 = this.getWorldPosition(object1);
        var position2 = this.getWorldPosition(object2);
        position1.x = position2.x;
        position1.z = position2.z;
        position1.normalize();
        position2.normalize();

        return Math.acos(position1.dot(position2));
    }

    public static getWorldPosition(object) {
        object.updateMatrixWorld(true);
        object.updateMatrix();
        var position = new THREE.Vector3();
        position.setFromMatrixPosition(object.matrixWorld);

        return position;
    }

    public static Math = {
        radians: function (degrees) {
            return degrees * Math.PI / 180;
        },
        degrees: function (radians) {
            return radians * 180 / Math.PI;
        },
        inverseLerp: function (a, b, value) {
            if (a < b) {
                if (value <= a)
                    return 0;
                else if (value >= b)
                    return 1;
                else
                    return (value - a) / (b - a);
            }
            else if (a > b) {
                if (value >= a)
                    return 0;
                else if (value <= b)
                    return 1;
                else
                    return (a - value) / (a - b);
            }
            return 0;
        }

    }


}