;(function ( $, window, undefined ) {

	var pluginName = 'papyrus';
	var defaults = {
		body: '.body',
		close: '<div>Close</div>',
		delay: 500,
		heading: 'h1',
		openClass: 'open',
		alwaysScroll: true
	}

	function Papyrus(elements, options) {
		this.elements = elements;
		this.options = $.extend( {}, defaults, options);
		this.init();
	}

	Papyrus.prototype.init = function(){

		var opt = this.options;
		var body = opt.body;
		var close = opt.close;
		var delay = opt.delay;
		var heading = opt.heading;
		var openClass = opt.openClass;
		var alwaysScroll = opt.alwaysScroll;

		var $sections = $('section');

		//open from top
		$sections.find(this.options.heading).click(function topToggle() {
			var sec = $(this).closest('section');
			if (sec.hasClass(openClass)) {
				sec.removeClass(openClass);
				sec.find(body).slideUp(delay);
			} else {
				sec.addClass(openClass);
				sec.find(body).slideDown(delay);
			}
		});

		// create close buttons
		var $close = $(close).click(function bottomClose() {

			var sec = $(this).closest('section');
			sec.removeClass(openClass);

			var scrollTop = $('body').scrollTop();
			var sectionTop    = sec.position().top;

			sec.find(body).slideUp(delay);

			// If the heading is visible then just let it slide up
			if (!alwaysScroll && sectionTop > scrollTop) return;
  
			// If the heading is not visible then slide the top down instead of the bottom up
			var sectionHeight = sec.find(body).outerHeight();

			// animate a mirror opening div
			var $cheat = $('<div> </div>')
				.prependTo('body')
				.css('height', 0)
				.animate({
					'height': sectionHeight
				}, delay, function () {
					// remove dummy
					$cheat.remove();
					window.scrollTo(0, scrollTop - sectionHeight); // TODO what about x dimension?
				});
		});


		$sections.find(body)
			.append( $close )
			.not( '.' + openClass )
			.hide();
	}
	$.fn.papyrus = function( options ) {
		return this.data('plugin_papyrus', new Papyrus( this, options ) );
	} 

}(jQuery, window));
