/*
--------------------------------------------------
standard.js
Dacia Rodrigue [msdessin@gmail.com]
Copyright © 2020 msdacia.com
--------------------------------------------------
*/

$(document).ready(function() {

	/// Replacing font for windows
	if (navigator.platform.indexOf("Win") != -1) {
		$('html').addClass('pc');
	}

	// get current year
	var currentYear = new Date().getFullYear();
	$("#currentYear").html(currentYear);

	// navigation menu
	$('.menuToggle a').click(function() {
		$(this).parent().parent('nav').toggleClass('expand');
		var newValue = $(this).find('span').text() == '+' ? '-' : '+';
		$(this).find('span').text(newValue);
	});

	if ($('#back-to-bottom').length) {
		var scrollTrigger = 10, // px
		backToBottom = function () {
			var scrollTop = $(window).scrollTop();
			var wrapperHeight = $('#wrapper').height();

			if (scrollTop < wrapperHeight) {
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

	$("#masonry img").lazyload({
		effect : "fadeIn"
	});

	initMasonry();

});

var initMasonry = function() {
	// masonry
	var $container = $('#masonry');
	var $dl = $container.children('dl');
	var $overlay = $('<div class="overlay"></div>');

	$container.find('dl').each(function() {
		$(this).hover(function() {
			$overlay.appendTo(this).siblings('dd').show();
		},function(){
			$overlay.siblings('dd').hide();
			$overlay.remove();
		});

		// Bind the tapHandler callback function to the tap event
		$(this).on('taphold', function(){
			$overlay.siblings('dd').hide();
			$overlay.remove();
			$overlay.appendTo(this).siblings('dd').show();
		});
	}).imagesLoaded(function(){
		$container.masonry({
			itemSelector: 'dl'
		});
	});
};
