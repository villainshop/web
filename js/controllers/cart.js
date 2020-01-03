function CartController (options) {
	this.options = $.extend({}, options);

	// open/close modal cart
	$(".open-cart, .close-cart").on("click", this.toggle);

	// close modal cart
	$("#cart-modal").on("click", ".back-to-shop", this.toggle);

	// increase cart item
	$("#cart, #cart-modal").on("click", ".increase", this.increase);

	// decrease cart item
	$("#cart, #cart-modal").on("click", ".decrease", this.decrease);
};


CartController.prototype.toggle = function () {
	var $this = $(this);

	// render cart
	cartView.modal(shopifyData.cart);

	// render cart button
	cartView.button(shopifyData.cart);

	// open cart modal
	$("body").toggleClass("cart-open");

	return false;
}

CartController.prototype.submit = function () {
	
}

CartController.prototype.increase = function () {
	var $this = $(this),
		form = $this.closest("form"),
		id = $this.closest(".item").attr("data-id"),
		count = parseInt($this.siblings("span").text());

	// things already happening
	if($this.closest("form").hasClass("loading")) return;

	// loader
	form.addClass("loading");

	// increase
	count = ++count;

	// ajax
	shopifyData.update(id, count)
		.then(function () {
			// render cart
			cartView.modal(shopifyData.cart);

			// render cart button
			cartView.button(shopifyData.cart);
		});

	return false;
};

CartController.prototype.decrease = function () {
	var $this = $(this),
		form = $this.closest("form"),
		id = $this.closest(".item").attr("data-id"),
		count = parseInt($this.siblings("span").text());

	// things already happening
	if($this.closest("form").hasClass("loading")) return;

	// loader
	form.addClass("loading");

	// decrease
	count = --count;

	// ajax
	shopifyData.update(id, count)
		.then(function () {
			// render cart
			cartView.modal(shopifyData.cart);

			// render cart button
			cartView.button(shopifyData.cart);
		});

	return false;
};


var cartController = new CartController();
