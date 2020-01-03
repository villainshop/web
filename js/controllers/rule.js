function RuleController (options) {
	this.options = $.extend({}, options);

	// open/close modal nav
	$(".open-rule, .close-rule").on("click", this.toggle);
};


RuleController.prototype.toggle = function () {
	var $this = $(this);

	$("body").toggleClass("rule-open");

	return false;
}

var ruleController = new RuleController();
