function CartView (options) {
	this.options = options | {};
};


CartView.prototype.button = function (cart) {
	$("#cart-button span").html("(" + cart.lineItemCount + ")");
};

CartView.prototype.page = function (data) {
	var html = "";

	// render cart	
	html = templates.cart(data);

	// palce in modal
	$("#cart .container .wrap").html(html);
};

CartView.prototype.modal = function (data) {
	var html = "";

	// render cart	
	html = templates.cart(data);

	// palce in modal
	$("#cart-modal .container .wrap").html(html);
};


var cartView = new CartView();

