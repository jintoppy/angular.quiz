module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
      },
      lazyload: {
        src: ['public/js/**/*.js'],
        dest: 'dist/app.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! Created by <%= pkg.author %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      lazyload: {
        files: {
          'dist/app.min.js': ['<%= concat.lazyload.dest %>']
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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['jshint', 'concat:lazyload','concat:widget', 'uglify']);

};