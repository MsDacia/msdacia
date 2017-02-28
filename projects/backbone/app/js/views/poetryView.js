define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/poetryTemplate.html'
], function($, _, Backbone, poetryTemplate){

  var PoetryView = Backbone.View.extend({
    el: $("#wrapper"),

    render: function(){
      this.$el.html(poetryTemplate);
    }

  });

  return PoetryView;

});
