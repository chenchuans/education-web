/**
 * webpack base config
 * @author wangheng
 * @since  2020/11/27
 */

const path = require('path');
const resolve = dir => path.resolve(__dirname, '../', dir);

module.exports = config => {
	config.resolve.alias
		.set('public', resolve('public'))
		.set('@', resolve('src'));

	config.plugins
		.delete('prefetch')
		.delete('preload');

	config.plugin('inline-source')
		.use(require('html-webpack-inline-source-plugin'))
		.after('html');

	config.plugin('html')
		.tap(args => {
			args[0].inlineSource = '.(app|chunk-vendors).*.(css|js)';
			args[0].minify = {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyCSS: true,
				minifyJS: true,
				minifyURLs: true
			}
			args[0].var = {
				isProd: process.env.NODE_ENV === 'production',
				isStage: process.env.BABEL_ENV === 'development'
			}
			return args;
		});

	config.optimization
		.splitChunks({
			minChunks: 3,
			chunks: 'all'
		})
};
