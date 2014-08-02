module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
      },
      main: {
        src: ['public/js/**/*.js'],
        dest: 'dist/app.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! Created by <%= pkg.author %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      main: {
        files: {
          'dist/app.min.js': ['<%= concat.main.dest %>']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'public/js/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true,
          angular: true,
          browser: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint']
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('build', ['jshint', 'concat','uglify']);
  grunt.registerTask('test', ['jshint', 'karma:unit']);

};