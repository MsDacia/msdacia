define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/homeTemplate.html'
], function($, _, Backbone, homeTemplate){

  var HomeView = Backbone.View.extend({
    el: $("#wrapper"),

    initalize: function() {
      // Replacing font for windows
      if (navigator.platform.indexOf("Win") != -1) {
        $('html').addClass('pc');
      }
    },

    render: function(){
      this.$el.html(homeTemplate);
    }

  });

  return HomeView;

});
