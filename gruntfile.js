module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jasmine: {
			all: {
				src: ['PureJSWebSite/Scripts/*.js'],
				options: {
					specs: ['Tests/Tests/*.js' ],
					template: require('grunt-template-jasmine-requirejs'),
			        templateOptions: {
						requireConfigFile: 'PureJSWebSite/Scripts/main.js',
						requireConfig: {
				            baseUrl: 'PureJSWebSite/Scripts/app'
				      	}
			        }
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.registerTask('test',['jasmine']);
	grunt.registerTask('default',['test']);
};