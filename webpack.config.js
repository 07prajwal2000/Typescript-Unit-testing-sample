module.exports = {
	entry: "./build/index.js",
	target: "node",
  mode: 'production',
	output: {
		path: __dirname + "/dist/",
		filename: "bundle.js",
	},
};
