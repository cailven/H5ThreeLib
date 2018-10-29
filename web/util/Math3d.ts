export class Math3d {

    constructor() {

        this.scene = window["scene"];
        this.camera = window["camera"];
        this.renderer = window["renderer"];
    }

    private scene;
    private camera;
    private renderer;

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