const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const webpack = require('webpack');
const pkg = require('./package.json');

const publicFolder = `${__dirname}/public`;
const distFolder = `${publicFolder}/dist`;

module.exports = {
	entry:  [`${publicFolder}/src/main.js`],
	output: {
		libraryTarget: 'var',
		library:       'LandsWar',
		path:          distFolder,
		filename:      'landswar-game.js',
	},
	module: {
		rules: [
			{
				test: /\.png$/,
				use:  [
					{
						loader: 'base64-image-loader',
					},
				],
			},
			{
				test:    /\.js$/,
				exclude: /(node_modules)/,
				use:     [
					{
						loader: 'babel-loader',
					},
				],
			},
		],
	},
	externals: {
		phaser: 'Phaser',
		io:     'io',
	},
	plugins: [
		new webpack.EnvironmentPlugin({
			TOKEN_PLAYER:   null,
			SHORTID_ROOM:   null,
			WEBSOCKETS_URL: 'http://127.0.0.1:3001',
		}),
		new webpack.DefinePlugin({
			VERSION: JSON.stringify(pkg.version),
		}),
		new HtmlWebpackPlugin({
			title: 'LandsWar - game',
		}),
		new HtmlWebpackIncludeAssetsPlugin({
			assets: [
				'styles.css',
				'phaser.min.js',
				'socket.io.min.js',
			],
			append: false,
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: true,
			},
			sourceMap: true,
		}),
		new CopyWebpackPlugin([
			{ from: './node_modules/phaser/build/phaser.min.js', to: `${distFolder}/phaser.min.js` },
			{ from: './node_modules/socket.io-client/dist/socket.io.min.js', to: `${distFolder}/socket.io.min.js` },
			{ from: `${publicFolder}/styles.css`, to: `${distFolder}/styles.css` },
			{ from: `${publicFolder}/track-webfont.woff`, to: `${distFolder}/track-webfont.woff` },
			{ from: `${publicFolder}/track-webfont.woff2`, to: `${distFolder}/track-webfont.woff2` },
		]),
	],
	devServer: {
		contentBase: distFolder,
		compress:    true,
		port:        process.env.WEBPACK_SERVER_PORT || 9000,
	},
	devtool: 'source-map',
};
