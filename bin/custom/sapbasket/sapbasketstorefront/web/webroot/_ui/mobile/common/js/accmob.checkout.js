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
ACCMOB.checkout = {
	bindAll: function ()
	{
		this.bindCheck();
	},

	bindCheck: function ()
	{
		$('#checkoutButton').click(function ()
		{
				var expressCheckoutObject = $('.doExpressCheckout');
				if(expressCheckoutObject.is(":checked"))
				{
					$("#checkoutButton").attr("href", expressCheckoutObject.data("expressCheckoutUrl"))
				}
			return true;
		});
	}
};

$(document).ready(function ()
{
	ACCMOB.checkout.bindAll();
});
