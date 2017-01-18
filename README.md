# CustomerAdminForDaxmall

基于angular + bootstrap + sass + gulp 售后管理系统

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.15.1.

## Build & development

`gulp serve` 自动打开开发环境项目（app目录下），监听保存自动刷新、bower依赖包自动引入、sass转css。

`gulp` 打包压缩程序到dist目录下，包括sass转CSS，去除console打印、debugger调试，文件合并、压缩。

`gulp serve:prod` 运行生产环境项目（dist目录下）.

Run `gulp` for building and `gulp serve` for preview.

###待完善

1.打包时bower_components目录指向根目录，开发时bower_components目录指向/app目录。

2.gulp-rev连index.html也处理了

## Testing（未使用过）

母鸡啊

Running `gulp test` will run the unit tests with karma.
