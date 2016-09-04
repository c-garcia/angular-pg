'use strict';

module.exports = function(grunt){

  grunt.initConfig({
    karma:{
      unit: {
        configFile: 'karma.conf.js',
        autoWatch: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default',['karma:unit']);

}
