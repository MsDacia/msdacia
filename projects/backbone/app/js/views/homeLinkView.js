define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/includes/homeLinkTemplate.html'
], function($, _, Backbone, homeLinkTemplate){

  var HomeLinkView = Backbone.View.extend({
    el: $("#home-link"),

    render: function(){
      this.$el.html(homeLinkTemplate);
    }

  });

  return HomeLinkView;

});
