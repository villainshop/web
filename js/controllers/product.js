function ProductController (options) {
	this.options = $.extend({}, options);

	// open/close modal cart
	$("#index, #product-modal").on("click", ".open-product", this.open);
	$("#index, #product-modal").on("click", ".close-product", this.close);

	// quick add to cart
	$("#index").on("click", ".add-to-cart", this.create);

	// update variant
	$("#product, #product-modal").on("change", "#product-form  input", this.update);

	// submit add to cart
	$("#product, #product-modal").on("submit", "#product-form", this.submit);

	// items
	this.index();
};


ProductController.prototype.open = function () {
	var $this = $(this),
		id = $this.attr("data-id");

	shopifyData.single(id)
		.then(function (item) {
			console.log(item);

			// render modal
			productView.modal(item);

			// open cart modal
			$("body").addClass("product-open");
		});

	return false;
}

ProductController.prototype.close = function () {
	var $this = $(this);

	// open cart modal
	$("body").removeClass("product-open");

	return false;
}

ProductController.prototype.index = function () {
	shopifyData.index()
		.then(function (items) {
			// render items
			productView.index(items);
		});
};

ProductController.prototype.create = function () {
	var $this = $(this),
		id = parseInt($this.closest(".product").attr("data-id")),
		variant = parseInt($this.closest(".product").attr("data-variant")),
		quanitity = 1;

	// things already happening
	if($this.hasClass("loading")) return;

	// loader
	$this.addClass("loading");

	shopifyData.create(id, variant, quanitity)
		.then(function (cart) {
			console.log(cart);

			// render cart
			cartView.modal(cart);

			// render cart button
			cartView.button(cart);

			// remove loader
			$this.removeClass("loading")

			// open cart modal
			$("body").addClass("cart-open");
		})
	
	return false;
};

ProductController.prototype.submit = function () {
	var $form = $(this),
		data = $form.serializeObject(),
		quanitity = 1;

	console.log(data);

	// things already happening
	if($form.hasClass("loading")) return;

	// loader
	$form.addClass("loading");

	shopifyData.single(data.id)
		.then(function (item) {
			console.log(item);

			return productController.variant(item, data);
		})
		.then(function (variant) {
			return shopifyData.create(data.id, variant.id, 1);

			console.log(variant);
			// add to cart
		})	
		.then(function (cart) {
			// render cart
			cartView.modal(cart);

			// render cart button
			cartView.button(cart);

			// remove loader
			$form.removeClass("loading")

			// open cart modal
			$("body").addClass("cart-open");
		});
	
	return false;
};

ProductController.prototype.variant = function (item, data) {
	// find variant object from id and selected options
	for(var i = 0; i < item.variants.length; i++) {
		var variant = item.variants[i],
			valid = true;

		for(var k = 0; k < variant.optionValues.length; k++) {
			var option = variant.optionValues[k];

			if(option.value !== data[option.name]) {
				valid = false;

				break;
			}
		}

		if(valid) return item.variants[i];
	}

	return null;
};

ProductController.prototype.update = function () {
	var $input = $(this),
		$form = $input.closest("form"),
		data = $form.serializeObject();

	shopifyData.single(data.id)
		.then(function (item) {
			return productController.variant(item, data);
		})
		.then(function (variant) {
			// update price
			return productController.price($form, variant);

			// update image
			// ???
		});
};

ProductController.prototype.price = function ($form, variant) {
	$form.siblings(".price").find("span").text("$" + variant.price.split(".")[0]);
};


var productController = new ProductController();
