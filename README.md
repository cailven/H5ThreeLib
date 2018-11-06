# H5ThreeLib

three.js常用功能的封装，使得three.js项目使用更方便。

## 初始化

```php
H5ThreeLib.init3D.init("divIdName");
```
### 自定义函数添加进渲染函数

```php
H5ThreeLib.active(function);
```
### 点击事件

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

