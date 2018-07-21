const webpack = require('webpack')

module.exports = {
	configureWebpack: {
		devtool: process.env.NODE_ENV === 'production' ? false : 'cheap-module-eval-source-map',
		plugins: [
			new webpack.ProvidePlugin({
				'$': 'jquery',
				'jquery': 'jquery',
				'jQuery': 'jquery',
				'window.jQuery': 'jquery'
			}),
		],
	},
	devServer: {
		port: 5155
	},
	runtimeCompiler: true,
}
