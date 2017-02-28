define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/includes/backToTopTemplate.html'
], function($, _, Backbone, backToTopTemplate){

  var BackToTopView = Backbone.View.extend({
    el: $("#back-top"),

    render: function(){
      this.$el.html(backToTopTemplate);

      if ($('#back-to-top').length) {
    	  var scrollTrigger = 100, // px
    	  backToTop = function () {
    	    var scrollTop = $(window).scrollTop();
          if (scrollTop > scrollTrigger) {
            $('#back-to-top').addClass('show');
          } else {
            $('#back-to-top').removeClass('show');
          }
    	  };

    		backToTop();

    		$(window).on('scroll', function () {
    	    backToTop();
    	  });

    		$('#back-to-top').on('click', function (e) {
          e.preventDefault();
          $('html,body').animate({
              scrollTop: 0
          }, 700);
        });
    	}
    }

  });

  return BackToTopView;

});
