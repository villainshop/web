function ShopifyData (options) {
	this.options = $.extend({}, options);

	this.client = null;
	this.cart = null;

	this.init();
};


ShopifyData.prototype.init = function () {
	var self = this;

	// create client
	self.client = ShopifyBuy.buildClient({
		accessToken: "b7feffcb07de30ecde1a5c8535ab65d5",
		domain: "villainshop.myshopify.com/",
		appId: 6
	});

	// create cart
	self.client.createCart()
		.then(function (cart) {
			console.log(cart);
			self.cart = cart;
		})
		.catch(function (error) {
			console.log(error);
			console.log("Sorry! Something went wrong.");
		});
};

ShopifyData.prototype.index = function () {
	var self = this;

	return this.client.fetchAllProducts()
		.catch(function (error) {
			console.log(error);
			console.log("Sorry! Something went wrong.");
		});
};

ShopifyData.prototype.single = function (id) {
	return this.client.fetchProduct(id);
};

ShopifyData.prototype.variant = function (id, variant) {
	return this.client.fetchProduct(id, variant)
		.then(function (product) {
			for(var i = 0; i < product.variants.length; i++) {
				if(variant === product.variants[i].id) return product.variants[i];
			};

			return null;
		});
}

ShopifyData.prototype.create = function (id, variant, quantity) {
	var self = this;

	return this.variant(id, variant)
		.then(function (item) {
			return self.cart.createLineItemsFromVariants({
				variant: item, 
				quantity: quantity
			});
		});
};

ShopifyData.prototype.update = function (id, quantity) {
	return this.cart.updateLineItem(id, quantity);
};


var shopifyData = new ShopifyData();
