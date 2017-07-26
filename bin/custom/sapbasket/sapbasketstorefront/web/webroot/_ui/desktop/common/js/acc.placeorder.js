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
ACC.placeorder = {

	bindAll: function ()
	{
		this.bindPlaceOrder();
		this.updatePlaceOrderButton();
		this.bindSecurityCodeWhatIs();
	},

	bindPlaceOrder: function ()
	{
		$(".placeOrderWithSecurityCode").on("click", function ()
		{
			ACC.common.blockFormAndShowProcessingMessage($(this));
			$(".securityCodeClass").val($("#SecurityCode").val());
			$("#placeOrderForm1").submit();
		});
	},

	updatePlaceOrderButton: function ()
	{
		
		$(".place-order").removeAttr("disabled");
		// need rewrite /  class changes
	},

	bindSecurityCodeWhatIs: function ()
	{
		$('.security_code_what').bt($("#checkout_summary_payment_div").data("securityWhatText"),
				{
					trigger: 'click',
					positions: 'bottom',
					fill: '#efefef',
					cssStyles: {
						fontSize: '11px'
					}
				});
	}
};

$(document).ready(function ()
{
	ACC.placeorder.bindAll();
});


