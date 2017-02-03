/*
 * [y] hybris Platform
 *
 * Copyright (c) 2000-2016 SAP SE or an SAP affiliate company.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
ACC.product = {
	
	initQuickviewLightbox:function(){
		this.enableAddToCartButton();
		this.bindToAddToCartForm();
	},
	
	
	enableAddToCartButton: function ()
	{
		$('#addToCartButton').removeAttr("disabled");
	},

	enableVariantSelectors: function ()
	{
		$('.variant-select').removeAttr("disabled");
	},
	
	bindToAddToCartForm: function ()
	{
		var addToCartForm = $('.add_to_cart_form');
		addToCartForm.ajaxForm({success: ACC.product.displayAddToCartPopup});
	},

	bindToAddToCartStorePickUpForm: function ()
	{
		var addToCartStorePickUpForm = $('#pickup_store_results .add_to_cart_storepickup_form');

		addToCartStorePickUpForm.ajaxForm({success: ACC.product.displayAddToCartPopup});
	},
	
	
	enableStorePickupButton: function ()
	{
		$('.pickupInStoreButton').removeAttr("disabled");
	},


	displayAddToCartPopup: function (cartResult, statusText, xhr, formElement)
	{
		$('#addToCartLayer').remove();
		
		if (typeof ACC.minicart.refreshMiniCartCount == 'function')
		{
			ACC.minicart.refreshMiniCartCount();
		}
		
		$("#header").append(cartResult.addToCartLayer);
		

		$('#addToCartLayer').fadeIn(function(){
			$.colorbox.close();
			if (typeof timeoutId != 'undefined')
			{
				clearTimeout(timeoutId);
			}
			timeoutId = setTimeout(function ()
			{
				$('#addToCartLayer').fadeOut(function(){
			 	   $('#addToCartLayer').remove();
					
				});
			}, 5000);
			
		});
		
		var productCode = $('[name=productCodePost]', formElement).val();
		var quantityField = $('[name=qty]', formElement).val();
		
		var quantity = 1;
		if (quantityField != undefined)
		{
			quantity = quantityField;
		}

		var cartAnalyticsData = cartResult.cartAnalyticsData;

		var cartData = {"cartCode": cartAnalyticsData.cartCode,
				"productCode": productCode, "quantity": quantity,
				"productPrice":cartAnalyticsData.productPostPrice,
				"productName":cartAnalyticsData.productName} ;

		ACC.track.trackAddToCart(productCode, quantity, cartData);
		
		// if it is orderForm, disable add to cart button in the end
		if($('#orderFormAddToCart').length > 0) {
			$('#addToCartBtn').attr('disabled','disabled');
		}
	}

};

$(document).ready(function ()
{
	with(ACC.product)
	{
		bindToAddToCartForm();
		bindToAddToCartStorePickUpForm();
		enableStorePickupButton();
		enableAddToCartButton();
		enableVariantSelectors();
	}
});

