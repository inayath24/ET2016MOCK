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
ACC.checkoutcartdetails = {

	bindAll: function ()
	{
		this.bindCheckCartDetails();
	},

	bindCheckCartDetails: function ()
	{
		$("#checkout-cart-details").hide();

		$("#checkout-cart-details-btn").click(function (e)
		{
			e.preventDefault();
			$("#checkout-cart-details").toggle();
			if ($("#checkout-cart-details").is(":visible"))
			{
				$("#checkout-cart-details-btn").html(hideText);
			}
			else
			{
				$("#checkout-cart-details-btn").html(showText);
			}
		});
	}
};

$(document).ready(function ()
{
	ACC.checkoutcartdetails.bindAll();
});
