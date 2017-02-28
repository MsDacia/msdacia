define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/aboutTemplate.html'
], function($, _, Backbone, aboutTemplate){

  var AboutView = Backbone.View.extend({
    el: $("#wrapper"),

    render: function(){
      this.$el.html(aboutTemplate);
    }

  });

  return AboutView;

});
