define([
  'jquery',
  'underscore',
  'backbone',
  'models/navigationMenuModel',
  'text!templates/includes/navigationTemplate.html'
], function($, _, Backbone, NavigationMenuModel, navigationTemplate){

  var NavigationView = Backbone.View.extend({
    el: $("nav"),

    events: {
      load: 'menu'
    },

    initialize: function() {
      _.bindAll(this,'menu');

      $('.menuToggle a').click(function() {
    		$(this).parent().parent('nav').toggleClass('expand');
    		var newValue = $(this).find('span').text() == '+' ? '-' : '+';
    	   $(this).find('span').text(newValue);
    	});

      window.onhashchange = function() {
        var scrollTop = $(window).scrollTop();
        $('html,body').animate({
            scrollTop: 0
        }, 700);
      };
    },

    render: function(){
      this.menu();
      return this;
    },

    menu: function() {
      var navHome = '',
        navAbout = '',
        navResume = '',
        navPortfolio = '',
        navPoetry = '',
        navConvictions = '';

      if (window.location.hash === '') {
        navHome = "Home";
      } else {
        navHome = "<a href=\"#\" title=\"MsDacia\">Home</a>";
      }

      if (window.location.hash === '#/about') {
        navAbout = "About";
      } else {
        navAbout = "<a href=\"#/about\" title=\"About MsDacia\">About</a>";
      }

      if (window.location.hash === '#/resume') {
        navResume = "Resume";
      } else {
        navResume = "<a href=\"#/resume\" title=\"Professional Resume\">Resume</a>";
      }

      if (window.location.hash === '#/portfolio') {
        navPortfolio = "Portfolio";
      } else {
        navPortfolio = "<a href=\"#/portfolio\" title=\"Digital Portfolio\">Portfolio</a>";
      }

      if (window.location.hash === '#/poetry') {
        navPoetry = "Poetry";
      } else {
        navPoetry = "<a href=\"#/poetry\" title=\"Creative Process: Poetry\">Poetry</a>";
      }

      if (window.location.hash === '#/convictions') {
        navConvictions = "Convictions";
      } else {
        navConvictions = "<a href=\"#/convictions\" title=\"Personal Convictions\">Convictions</a>";
      }

      console.log(1);

      this.$el.append('<div class="menuToggle"><a href="javascript:void(0)">menu <span>+</span></a></div><ul data-role="listview">' + '<li data-theme="a">' + navHome + '</li><li data-theme="a">' + navAbout + '</li><li data-theme="a">' + navResume + '</li><li data-theme="a">' + navPortfolio + '</li><li data-theme="a">' + navPoetry + '</li><li data-theme="a">' + navConvictions + '</li></ul>');

      return this;
    }

  });

  return NavigationView;

});
