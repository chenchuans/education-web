// const path = require('path');
// const name = 'education-web';

// const webpackBaseConfig = require('./build/webpack.base.config');
// const webpackDevConfig = require('./build/webpack.dev.config');
// const webpackProdConfig = require('./build/webpack.prod.config');

// const configure = {
//     development: config => webpackDevConfig(config),
//     production: config => webpackProdConfig(config)
// }


module.exports = {
    publicPath: './',
    // configureWebpack: config => configure[process.env.NODE_ENV](config),
    // chainWebpack: webpackBaseConfig,
    // lintOnSave: true,
    // pluginOptions: {
    //     'style-resources-loader': {
    //         preProcessor: 'scss',
    //         patterns: [
    //             path.resolve(__dirname, 'src/styles/variables.scss'),
    //             path.resolve(__dirname, 'src/styles/global.scss')
    //         ]
    //     }
    // }
}