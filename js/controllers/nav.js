function NavController (options) {
	this.options = $.extend({}, options);

	// open/close modal nav
	$(".open-nav, .close-nav").on("click", this.toggle);
};


NavController.prototype.toggle = function () {
	var $this = $(this);

	$("body").toggleClass("nav-open");

	return false;
}

var navController = new NavController();
