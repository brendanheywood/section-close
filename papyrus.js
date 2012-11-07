;(function ( $, window, undefined ) {


var heading = 'h1';
var body = '.body';
var delay = 500;
var openClass = 'open';
var close = '<div>Close</div>';
var alwaysScroll = true;

	var $sections = $('section');

	//open from top
	$sections.find(heading).click(function topToggle(){
		var sec = $(this).closest('section');
		if (sec.hasClass(openClass)){
			sec.removeClass(openClass);
			sec.find(body).slideUp(delay);
		} else {
			sec.addClass(openClass);
			sec.find(body).slideDown(delay);
		}
	});

	// create close buttons
	var $close = $(close).click(function bottomClose(){

		var sec = $(this).closest('section');
		sec.removeClass(openClass);

		var scrollTop = $('body').scrollTop();
		var sectionTop    = sec.position().top;

		sec.find(body).slideUp(delay);

		// If the heading is visible then just let is slide up
		if (!alwaysScroll && sectionTop > scrollTop){ return; }
  
		// If the heading is not visible then slide the top down instead of the bottom up
		var sectionHeight = sec.find(body).outerHeight();

		// animate a mirror opening div
		var $cheat = $('<div> </div>')
			.prependTo('body')
			.css('height', 0)
			.animate({
				'height': sectionHeight
			}, delay, function(){
				// remove dummy
				$cheat.remove();
				window.scrollTo(0, scrollTop - sectionHeight); // TODO what about x dimension?
			});
	});


	$sections.find(body)
		.append( $close )
		.not( '.' + openClass )
		.hide();

}(jQuery, window));
