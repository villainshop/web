function ProductView (options) {
	this.options = options | {};

	// initialize masonry (isotope)
	this.$grid = $("#index .wrap").isotope();
};


ProductView.prototype.index = function (items) {
	var html = [];

	// render cart	
	for(var i = 0; i < items.length; i++) {
		html.push($(templates.index(items[i]))[0]);
	}

	// palce in modal
	this.$grid.isotope("insert", html);
};

ProductView.prototype.modal = function (item) {
	var html = "";

	// render cart	
	html += templates.product(item);

	// palce in modal
	$("#product-modal .wrap").html(html);
};


var productView = new ProductView();

