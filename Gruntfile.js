/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      dist: {
        src: ['lib/js/<%= pkg.name %>.js'],
        dest: 'js/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'js/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      options: {
        devel: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: false,
        boss: true,
        eqnull: true,
        browser: true,
        jquery: true,
        globals: {
          jQuery: true,
          require: true,
          ajaxurl: true,
          wp: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js']
      }
    },
    sass: {
      dev: {
        options: {
          debugInfo: true,
          banner: '<%= banner %>'
        },
        files: [{
          expand: true,
          cwd: 'lib/scss',
          src: '**/*.scss',
          dest: 'css',
          ext: '.css'
        }]
      }
    },
    autoprefixer: {
      options: {
        diff: true
      },
      all: {
        src: 'css/**/*.css'
      }
    },
    copy: {
      js: {
        expand: true,
        src: ['js/**/*.js'],
        dest: '<%= pkg.theme.name %>'
      },
      css: {
        expand: true,
        src: ['css/**/*.css'],
        dest: '<%= pkg.theme.name %>'
      },
      themeRemote: {
        expand: true,
        src: '<%= pkg.theme.name %>/**/*',
        dest: '../wped/wp-content/themes'
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
     js: {
        files: ['<%= jshint.lib_test.src %>'],
        tasks: ['jshint:lib_test', 'concat', 'copy']
      },
      sass: {
        files: ['lib/scss/**/*.scss', 'plugins/**/*.scss'],
        tasks: ['sass', 'autoprefixer', 'copy']
      },
      php: {
        files: '**/*.php',
        tasks: ['copy']
      },
      html: {
        files: '**/*.html'
      },
      options: {
        livereload: true
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  // Default task.
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

};
