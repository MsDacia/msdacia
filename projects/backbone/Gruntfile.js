/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    project: {
      app: 'app',
      assets: '<%= project.app %>/assets',
      css: [
        '<%= project.assets %>/scss/style.scss'
      ],
      js: [
        '<%= project.assets %>/js/*.js'
      ]
    },
    sass: {
      dev: {
        options: {
          style: 'expanded',
          compass: true
        },
        files: {
          '<%= project.assets %>/css/style.css': '<%= project.css %>'
        }
      },
      dist: {
        options: {
          style: 'compressed',
          compass: true
        },
        files: {
          '<%= project.assets %>/css/style.css': '<%= project.css %>'
        }
      }
    },
    watch: {
      sass: {
        files: '<%= project.assets %>/scss/{,*/}*.{scss,sass}',
        tasks: ['sass:dev']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['sass:dev', 'watch']);

};
