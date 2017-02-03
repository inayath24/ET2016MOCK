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
ACC.removepayment = {

	bindAll: function ()
	{
		this.bindRemovePaymentDetails();
	},

	bindRemovePaymentDetails: function ()
	{
		$('.submitRemove').on("click", function ()
		{
			$('#removePaymentDetails' + $(this).attr('id')).submit();
		});
		$('.submitSetDefault').on("click", function ()
		{
			$('#setDefaultPaymentDetails' + $(this).attr('id')).submit();
		});
	}

};

$(document).ready(function ()
{
	ACC.removepayment.bindAll();
});
