define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/includes/footerTemplate.html'
], function($, _, Backbone, footerTemplate){

  var FooterView = Backbone.View.extend({
    el: $("footer"),

    render: function(){
      this.$el.html(footerTemplate);

      // get current year
    	var currentYear = new Date().getFullYear();
      $("#currentYear").text(currentYear);
    }

  });

  return FooterView;

});
