define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/resumeTemplate.html'
], function($, _, Backbone, resumeTemplate){

  var ResumeView = Backbone.View.extend({
    el: $("#wrapper"),

    render: function(){
      this.$el.html(resumeTemplate);

      // get last modified date
      var modifiedDate = document.lastModified;
      $("#modifiedDate").text(modifiedDate);
    }

  });

  return ResumeView;

});
