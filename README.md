# H5ThreeLib

[three.js](https://github.com/mrdoob/three.js)是一套基于js开发的很著名的webgl类库，但正如它的[文档](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene)所示，
它的基础项目部署以及点击事件创建对象等方法都相对麻烦，我写这个项目我根据自己常用的功能进行封装，力图使得基于three.js的H5项目的使用上变得更方便。

## 项目初始化

在HTML文件中引入three.js和H5Threelib.js类库

```php
<script src="lib/three.min.js"></script>
<script src="../dist/H5ThreeLib.js"></script>
```

在自己的js文件里进行初始化，init的参数你在html中设置的div容器。

```php
H5ThreeLib.init3D.init("divIdName");
```
在初始化后，在全局window对象中就存在了window.scene;window.camera;window.renderer;这是整个引擎初始化里的场景、渲染器、摄像机。你可以在window级直接控制他们。


### 自定义函数添加进渲染函数

初始化后，你可以分模块对自己的项目进行构建，但如果需要把某个参数放到three.js关于渲染的requestAnimationFrame项目时候，请使用下面的方式会把你的函数在渲染函数中执行。

```php
H5ThreeLib.active(function);
```
### 点击事件
在three.js中点击事件使用Raycaster从屏幕对应的坐标向里进行穿透检测从而实现点击效果，但这样的方式非常麻烦，因此使用下面的代码可以轻松实现点击。但必须别忘记命名。

```php
H5ThreeLib.setRayData("objName", function);
```

## 光线
H5ThreeLib.lights

```php
addAmbientLight(color = "#ffffff", intensity = 1.0): THREE.AmbientLight
```

```php
addSpotLight(color = "#ffffff", intensity = 1.0, angle = null, dist = 500, shadow = null): THREE.SpotLight
```

 ```php
addPointLight(color = "#ffffff", intensity = 1.0, dist = 500, shadow = null): THREE.PointLight
```

```php
addHemisphereLight(color1 = "#ff0000", color2 = "#0000ff", intensity = 1.0): THREE.HemisphereLight
```



### Orbit控件

```php
H5ThreeLib.init3D.createOrbitControls();
```

### postprocessing

createComposer 方法支持多个不同的pass叠加

自定义shader

```php
 var uniforms = {
            "tDiffuse": {value: null},
            "tSize": {value: new THREE.Vector2(256, 256)},
            "center": {value: new THREE.Vector2(0.5, 0.5)},
            "angle": {value: 1.57},
            "scale": {value: 4.0}

        }

function shader(){
    return `glsl code`
}

 var eff = H5ThreeLib.composer.setComposerShader(uniforms, shader());
 H5ThreeLib.composer.createComposer([new THREE.ShaderPass(eff)]);
```

使用Three自带Pass

```php

 var bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
        bloomPass.threshold = 0;
        bloomPass.strength = 1.5;
        bloomPass.radius = 0;

H5ThreeLib.composer.createComposer([bloomPass]);  

```