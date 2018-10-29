var gulp = require('gulp');

const rollup = require('rollup');
const rollupTypescript = require('rollup-plugin-typescript2');
const rollupUglify = require('rollup-plugin-uglify');


//全局源文件和目标位置
var dist_path = "./dist/";
var dev_path = "./web";

gulp.task('default', ['rollupLib']);

//清除指定文件
gulp.task("clean", function (callback) {
    var clean = require('gulp-clean');
    gulp.src(dist_path).pipe(clean());
});


//全局调用的自己写的类库util.js，单独运行
const date = new Date();
var version = date.getMonth() + "月" + date.getDate() + "日" + date.getHours() + ":" + date.getMinutes();
gulp.task('rollupLib', () => {
    return rollup.rollup({
        input: dev_path + '/util/MainLib.ts',
        plugins: [
            rollupTypescript({
                declaration: true,

            }),
            // rollupUglify.uglify(),
        ]
    }).then(bundle => {
        return bundle.write({
            file: dist_path + '/H5ThreeLib.js',
            format: 'umd',
            name: 'H5ThreeLib',
            sourcemap: true,
            banner: '/* util.js 版本号' + version + ' */',
            footer: '/* util.js 版本号' + version + ' */'
        })
    })
});


