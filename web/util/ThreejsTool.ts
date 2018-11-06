/**
 * Created by zhangcailven on 2018/6/6.
 */
export class ThreejsTool {

    constructor() {
        window["scene"] = this.scene;
        window["camera"] = this.camera;
        window["renderer"] = this.renderer;
    }

    private scene;
    private camera;
    private renderer;
    private controls;
    private container;
    private raycaster;
    private mouse;

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

        window.addEventListener("touchstart", function (evt: TouchEvent) {
            s.mouse.x = (evt.changedTouches[0].clientX / window.innerWidth) * 2 - 1;
            s.mouse.y = -(evt.changedTouches[0].clientY / window.innerHeight) * 2 + 1;
        })

        this.raycaster = new THREE.Raycaster();
        window["scene"] = this.scene;
        window["camera"] = this.camera;
        window["renderer"] = this.renderer;
        window["ThreejsTool"] = this;
        ThreejsTool.initEnd();
        // console.log("init");

        function animate() {
            requestAnimationFrame(animate);
            if (ThreejsTool.callbackArr.length > 0) {
                for (var i = 0; i < ThreejsTool.callbackArr.length; i++) {
                    ThreejsTool.callbackArr[i]();
                }
            }
            ray();
            s.renderer.render(s.scene, s.camera);
            if (s.controls) {
                s.controls.update();
            }
        }


        this.mouse = new THREE.Vector2(-1, -1);

        function ray() {
            s.raycaster.setFromCamera(s.mouse, s.camera);
            var intersects = s.raycaster.intersectObjects(s.scene.children);
            for (var i = 0; i < intersects.length; i++) {
                if (ThreejsTool.rayData.length > 0) {
                    for (var j = 0; j < ThreejsTool.rayData.length; j++) {
                        var _name;
                        if (typeof(ThreejsTool.rayData[j].name) == "string") {
                            _name = ThreejsTool.rayData[j].name;
                        } else {
                            _name = ThreejsTool.rayData[j].name.name;
                        }
                        if (intersects[i]) {
                            if (_name == intersects[i].object.name) {
                                ThreejsTool.rayData[j].func(intersects[i].object);
                            }
                        }

                    }
                }
            }
            s.mouse.x = -1;
            s.mouse.y = -1;
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


    public static initEnd;

    public static rayData: Array<any> = [];


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
        ThreejsTool.callbackArr.push(callBack);
    }

    public static setRayData(name, func) {
        var obj = {name: name, func: func};
        ThreejsTool.rayData.push(obj);
    };


    public createOrbitControls() {
        this.controls = new THREE.OrbitControls(this.camera, this.container);
        window["controls"] = this.controls;
        return this.controls;
    }


}