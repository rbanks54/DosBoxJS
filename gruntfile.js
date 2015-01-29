module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jasmine: {
			all: {
				src: ['PureJsWebSite/Scripts/*.js' ],
				options: {
					'vendor': ['PureJsWebSite/Scripts/lib/*.js','Tests/Script/*.js'],
					'specs': ['Tests/Tests/*.js' ]
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.registerTask('test',['jasmine']);
	grunt.registerTask('default',['test']);
};