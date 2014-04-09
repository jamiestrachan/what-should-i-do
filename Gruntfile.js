module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
    	all: ['Gruntfile.js', '*.js']
    },
    csslint: {
    	lax: {
    		src: ['*.css']
    	}
    },
    watch: {
    	src: {
    		files: ['*.js', '*.css'],
    		tasks: ['default']
    	}	
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'csslint']);

};