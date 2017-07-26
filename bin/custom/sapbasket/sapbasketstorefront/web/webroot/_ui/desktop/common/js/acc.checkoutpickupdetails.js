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
ACC.checkoutpickupdetails = {

	bindAll: function ()
	{
		this.bindPickupDetails();
	},

	bindPickupDetails: function ()
	{
		$(".pickupSummaryDetail").hide();

		$(".pickupSummaryDetailsButton").click(function (e)
		{
			e.preventDefault();
			$(this).parent().children(".pickupSummaryDetail").toggle();
			if ($(this).parent().children(".pickupSummaryDetail").is(":visible"))
			{
				$(this).html(hideText);
			}
			else
			{
				$(this).html(showText);
			}
		});
	}
};

$(document).ready(function ()
{
	ACC.checkoutpickupdetails.bindAll();
});
