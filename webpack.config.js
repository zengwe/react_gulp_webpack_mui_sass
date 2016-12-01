var webpack = require('webpack');
//var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
module.exports = {
    //插件项
    //plugins: [commonsPlugin],
    //页面入口文件配置
    entry: {
        home: __dirname+'/jstemp',
        //scnd:'/demo/webpack_demo/tempjs'
    },
    //入口文件输出配置
    output: {
        path: __dirname+'/js',
        filename: '[name].jsx'
    },
    module: {
        //加载器配置
        loaders: [
            { test: /\.jsx$/, loader: 'babel-loader',query:{presets: ['es2015']}},//npm install babel-loader babel-core babel-preset-es2015 --save-dev          
        ]
    },
    //其它解决方案配置
    resolve: {
        //root: 'E:/github/flux-example/src', //绝对路径
        extensions: ['jsx'],
        // alias: {
        //     AppStore : 'js/stores/AppStores.js',
        //     ActionType : 'js/actions/ActionType.js',
        //     AppAction : 'js/actions/AppAction.js'
        // }
    }
};