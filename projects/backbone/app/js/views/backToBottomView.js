define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/includes/backToBottomTemplate.html'
], function($, _, Backbone, backToBottomTemplate){

  var BackToBottomView = Backbone.View.extend({
    el: $("#back-bottom"),

    render: function(){
      this.$el.html(backToBottomTemplate);

      if ($('#back-to-bottom').length) {
        var scrollTrigger = 10, // px
    	  backToBottom = function () {
          var scrollTop = $(window).scrollTop();
          var wrapperHeight = $('#wrapper').height();

          if (scrollTop <= wrapperHeight) {
            $('#back-to-bottom').addClass('show');
          } else {
            $('#back-to-bottom').removeClass('show');
          }
    	  };

    		backToBottom();

    		$(window).on('scroll', function () {
    	    backToBottom();
    	  });

    		$('#back-to-bottom').on('click', function (e) {
          e.preventDefault();
          var scrollBottom = $(document).height();
          $('html,body').animate({
              scrollTop: scrollBottom
          }, 700);
        });
    	}
    }

  });

  return BackToBottomView;

});
