define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/convictionsTemplate.html'
], function($, _, Backbone, convictionsTemplate){

  var ConvictionsView = Backbone.View.extend({
    el: $("#wrapper"),

    render: function(){
      this.$el.html(convictionsTemplate);
    }

  });

  return ConvictionsView;

});
