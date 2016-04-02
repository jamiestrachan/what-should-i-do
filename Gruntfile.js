module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
		options: {
			"esnext": true
		},
    	all: ['Gruntfile.js', 'src/*.js']
    },
    browserify: {
		dist: {
			options: {
				transform: [
					["babelify", { "presets": ["es2015"] }]
				]
			},
			files: {
				"./js/whatshouldido.js": ["./src/whatshouldido.js"]
			}
		}
	},
    csslint: {
    	lax: {
    		src: ['*.css']
    	}
    },
    watch: {
    	src: {
    		files: ['src/*.js', '*.css'],
    		tasks: ['default']
    	}	
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'browserify', 'csslint']);

};
