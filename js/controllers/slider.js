function SliderController (options) {
	this.options = $.extend({}, options);

	this.init();
};


SliderController.prototype.init = function () {
	var self = this;

	$("#product, #product-modal").on("click", "#product-preview a", self.preview);
}

SliderController.prototype.preview = function () {
	var $this = $(this),
		$holder = $this.closest("li"),
		$wrap = $this.closest(".wrap"),
		idx = $holder.index();

	// update preview
	$holder.addClass("active").siblings().removeClass("active");
	$wrap.find("#product-image ul li:eq(" + idx + ")").addClass("active").siblings().removeClass("active");

	return false;
}



var sliderController = new SliderController();
