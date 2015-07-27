'use strict';

var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');
var PictureFillSourcePath = require.resolve('picturefill/dist/picturefill.min.js');;
var PictureFillPolyfillOutput = path.resolve('polyfills/Picture');

// this is not really a grunt task, but a function that is suppose
// to be sync, and receive access to grunt instance for convenience.
module.exports = function(grunt) {
	var configSource = require(path.join(PictureFillPolyfillOutput, 'config.json'));

	// deleting existing files
	if (grunt.file.exists(PictureFillPolyfillOutput + 'polyfill.js')) {
		try {
			// Actually delete. Or not.
			rimraf.sync(PictureFillPolyfillOutput + 'polyfill.js');
		} catch (e) {/* ignore */}
    }

	// customizing the config to add Picture as a dependency
	configSource.dependencies.push('Picture');
	var configFileSource = JSON.stringify(configSource, null, 4);

	grunt.log.writeln('Importing Picture polyfill from ' + PictureFillSourcePath);

	var PictureFillPolyfillSource = fs.readFileSync(PictureFillSourcePath);
	grunt.file.write(path.join(PictureFillPolyfillOutput, 'polyfill.js'), PictureFillPolyfillSource);

	grunt.log.writeln('Picture polyfill imported successfully');

};