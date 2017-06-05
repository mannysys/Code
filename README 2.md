# react-simple-o2o-demo

代码尚在开发中


代码中NODE_ENV=dev代表当前是开发环境下，这里的"dev"可被 js 代码中的process.env.NODE_ENV得到并做一些其他处理。


发布系统时，就需要考虑发布之后的系统的性能，包括加载速度、缓存等。下面介绍发布用配置代码和开发用的不一样的地方。
# webpack.production.config.js  是发布系统配置文件
npm start和npm run build分别是运行代码和打包项目
#vendor
将第三方依赖单独打包。即将 node_modules 文件夹中的代码打包为 vendor.js 将我们自己写的业务代码打包为 app.js。这样有助于缓存，因为在项目维护过程中，第三方依赖不经常变化，而业务代码会经常变化。
#md5后缀
为每个打包出来的文件都加md5后缀，例如"/js/[name].[chunkhash:8].js"，可使文件强缓存。
#分目录
打包出来的不同类型的文件，放在不同目录下，例如图片文件将放在img/目录下
#Copyright
自动为打包出来的代码增加 copyright 内容
#分模块
new webpack.optimize.OccurenceOrderPlugin(),
#压缩代码
使用 Uglify 压缩代码，其中warnings: false是去掉代码中的 warning
#分离 css 和 js 文件
开发环境下，css 代码是放在整个打包出来的那个 bundle.js 文件中的，发布环境下当然不能混淆在一起，使用new ExtractTextPlugin('/css/[name].[chunkhash:8].css'),将 css 代码分离出来。
