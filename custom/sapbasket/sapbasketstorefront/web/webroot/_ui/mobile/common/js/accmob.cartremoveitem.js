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
ACCMOB.cartremoveitem = {

	bindAll: function ()
	{
		this.bindCartRemoveProduct();
	},
	bindCartRemoveProduct: function ()
	{
		$('.submitRemoveProduct').click(function ()
		{
			var form = $('#updateCartForm' + $(this).attr('id'));
			var productCode = form.get(0).productCode.value;
			var initialCartQuantity = $('#quantity' + $(this).attr('id')).val();
			var cartData = form.data("cart");
			ACCMOB.cartremoveitem.trackRemoveFromCart(productCode, initialCartQuantity,cartData);

			$('#quantity' + $(this).attr('id')).attr('value', '0');
			$('#updateCartForm' + $(this).attr('id')).submit();
		});
	},

	trackRemoveFromCart: function(productCode, initialCartQuantity, data)
	{
		window.mediator.publish('trackRemoveFromCart',{
			productCode: productCode,
			initialCartQuantity: initialCartQuantity,
			cartData:data
		});
	}
};

$(document).ready(function ()
{
	ACCMOB.cartremoveitem.bindAll();
});
