function TabController (options) {
	this.options = $.extend({}, options);

	this.init();
};


TabController.prototype.init = function () {
	var self = this;

	// tabs
	$(".tab-nav a").click(function() {
		var holder = $(this).attr("data-holder");

		if(typeof(holder) !== "undefined") self.set(holder, $(this).parent().index());
		else self.move(this);

		return false
	});

	$(".tab-next").click(function() {
		self.next(this);

		return false
	});

	$(".tab-previus").click(function() {
		self.prev(this);

		return false;
	});
}

TabController.prototype.move = function (button) {
	var $this = $(button),
		index = $this.parent().index(),
		holder = $this.closest(".tabs");

	if($this.parent().hasClass("disabled")) return;

	holder.find("> .tab-nav > ul > li").removeClass("active");
	holder.find("> .tab-content > .tab").removeClass("active");

	holder.find("> .tab-nav > ul > li:eq(" + index + ")").addClass("active");
	holder.find("> .tab-content > .tab:eq(" + index + ")").addClass("active");
}


TabController.prototype.set = function (holder, index) {
	var holder = $(holder);

	holder.find(".tab-nav li").removeClass("active");
	holder.find(".tab-content .tab").removeClass("active");

	holder.find(".tab-nav li:eq(" + index + ")").addClass("active").removeClass("disabled"); // remvoe also disabled
	holder.find(".tab-content .tab:eq(" + index + ")").addClass("active");
}


TabController.prototype.mark = function (holder, index) {
	var holder = $(holder);

	holder.find(".tab-nav li:eq(" + index + ")").addClass("done");
	holder.find(".tab-content .tab:eq(" + index + ")").addClass("done");
}


TabController.prototype.next = function (button) {
	var $this = $(button),
		index = $this.closest(".tab").index(),
		holder = $this.closest(".tabs");

	if($this.closest(".tab").siblings().length == index) index = -1;

	holder.find(".tab-nav li").removeClass("active");
	holder.find(".tab-content .tab").removeClass("active");

	holder.find(".tab-nav li:eq(" + (index + 1) + ")").addClass("active").removeClass("disabled"); // remvoe also disabled
	holder.find(".tab-content " + ".tab:eq(" + (index + 1) + ")").addClass("active");
}


TabController.prototype.prev = function (button) {
	var $this = $(button),
		index = $this.closest(".tab").index(),
		holder = $this.closest(".tabs");

	holder.find(".tab-nav li").removeClass("active");
	holder.find(".tab-content .tab").removeClass("active");

	holder.find(".tab-nav li:eq(" + (index - 1) + ")").addClass("active").removeClass("disabled"); // remvoe also disabled
	holder.find(".tab-content " + ".tab:eq(" + (index - 1) + ")").addClass("active");
}


var tabController = new TabController();
