// Filename: main.js
require.config({
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'lazyload': {
      deps: ['jquery']
    }
  },
  paths: {
    jquery: 'libs/jquery-min',
    underscore: 'libs/underscore-min',
    backbone: 'libs/backbone-min',
    lazyload: 'scripts/shared/jquery-lazyload',
    templates: '../templates'
  }
});

require(['app'], function(App){
  App.initialize();
});
