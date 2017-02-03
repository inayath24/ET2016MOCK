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
ACC.refresh = {
	refreshCartTotals: function (checkoutCartData)
	{
		$('#ajaxCart').html($('#cartTotalsTemplate').tmpl(checkoutCartData));
	},

	refreshPage: function (checkoutCartData)
	{
		//update delivery address, delivery method and payment sections, and cart totals section
		ACC.address.refreshDeliveryAddressSection(checkoutCartData);
		ACC.payment.refreshPaymentDetailsSection(checkoutCartData);
		ACC.refresh.refreshCartTotals(checkoutCartData);
		ACC.placeorder.updatePlaceOrderButton();
	},
	getCheckoutCartDataAndRefreshPage: function ()
	{
		$.getJSON(getCheckoutCartUrl, function (checkoutCartData)
		{
			ACC.refresh.refreshPage(checkoutCartData);
		});
	}
}

$.blockUI.defaults.overlayCSS = {};
$.blockUI.defaults.css = {};
