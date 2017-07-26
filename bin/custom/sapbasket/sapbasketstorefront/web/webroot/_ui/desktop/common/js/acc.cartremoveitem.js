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
ACC.cartremoveitem = {

	bindAll: function ()
	{
		this.bindCartRemoveProduct();
	},
	bindCartRemoveProduct: function ()
	{

		$('.submitRemoveProduct').on("click", function ()
		{
			var prodid = $(this).attr('id').split("_")
			var form = $('#updateCartForm' + prodid[1]);
			var productCode = form.find('input[name=productCode]').val(); 
			var initialCartQuantity = form.find('input[name=initialQuantity]');
			var cartQuantity = form.find('input[name=quantity]');
			var cartData = form.data("cart");
			ACC.track.trackRemoveFromCart(productCode, initialCartQuantity.val(),cartData);
			
			cartQuantity.val(0);
			initialCartQuantity.val(0);
			form.submit();
		});

		$('.updateQuantityProduct').on("click", function ()
		{
			var prodid = $(this).attr('id').split("_")
			var form = $('#updateCartForm' + prodid[1]);
			var productCode = form.find('input[name=productCode]').val(); 
			var initialCartQuantity = form.find('input[name=initialQuantity]').val();
			var newCartQuantity = form.find('input[name=quantity]').val();
			var cartData = form.data("cart");

			if(initialCartQuantity != newCartQuantity)
			{
				ACC.track.trackUpdateCart(productCode, initialCartQuantity, newCartQuantity,cartData);
				form.submit();
			}

		});
	}
}

$(document).ready(function ()
{
	ACC.cartremoveitem.bindAll();
});
