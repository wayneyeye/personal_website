// Gruntfile.js
// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),
    // all of our configuration will go here
    jshint: {
    options: {
        reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
      },
      // when this task is run, lint the Gruntfile and all js files in src
      build: ['Gruntfile.js', 'src/js/*.js']
    },
    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'dist/js/script.min.js': ['src/js/script.js']
        }
      }
    },
    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'dist/css/style.min.css': 'src/css/style.css'
        }
      }
    },
    //make hero img more responsive 
    responsive_images: {
      hero: {
        options: {
          engine: 'gm',
          sizes: [{
            /* Change these */
            width: 1200,
            height: 375,
            rename:false,
            aspectRatio:false,
            suffix: '',
            quality: 70
          }]
        },
        /*
        You don't need to change this part if you don't change
        the directory structure.
        */
        files: [{
          expand: true,
          aspectRatio:false,
          src: ['*.{gif,jpg,png}'],
          cwd: 'img/heros',
          dest: 'dist/img/heros'
        }]
      },

      placeholder: {
        options: {
          engine: 'gm',
          sizes: [{
            /* Change these */
            width: 480,
            height: 320,
            rename:false,
            aspectRatio:false,
            suffix: '',
            quality: 70
          }]
        },
        /*
        You don't need to change this part if you don't change
        the directory structure.
        */
        files: [{
          expand: true,
          aspectRatio:false,
          src: ['*.{gif,jpg,png}'],
          cwd: 'img/placeholder',
          dest: 'dist/img/placeholder'
        }]
      }
    },
    /* Clear out the images directory if it exists */
    clean: {
      hero: {
        src: ['dist/img/heros'],
      },
      placeholder: {
        src: ['dist/img/placeholder'],
      },
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      hero: {
        options: {
          create: ['dist/img/heros']
        },
      },
      placeholder: {
        options: {
          create: ['dist/img/heros']
        },
      },
    },
    /*watch file changes*/
    watch: {
    	scripts:{
	      files: ['src/js/*.js'],
	      tasks: ['jshint','uglify']
    	},
    	stylesheets:{
	      files: ['src/css/style.css'],
	      tasks: ['cssmin']    		
    	}
    }
  });

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
      // ============= // CREATE TASKS ========== //
  grunt.registerTask('default', ['jshint', 'uglify', 'cssmin']); 
  grunt.registerTask('gm', ['responsive_images']); 
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-responsive-images');
};