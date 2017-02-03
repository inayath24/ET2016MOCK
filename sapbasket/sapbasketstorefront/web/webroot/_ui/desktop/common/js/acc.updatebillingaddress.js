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
ACC.updatebillingaddress = {
	bindCycleFocusEvent: function ()
	{
		$('#lastInTheForm').blur(function ()
		{
			$('#paymentDetailsForm [tabindex$="10"]').focus();
		})
	},

	updateBillingAddressForm: function ()
	{
		var newAddress = $('#differentAddress').attr("checked");
		if (newAddress)
		{
			$("#newBillingAddressFields :input").removeAttr('disabled');
		}
		else
		{
			$("#newBillingAddressFields :input").attr('disabled', 'disabled');
		}
	}
}

$(document).ready(function ()
{
	ACC.updatebillingaddress.updateBillingAddressForm();
	ACC.silentorderpost.displayStartDateIssueNum();

	if ($("#differentAddress").length > 0)
	{
		$("#differentAddress").click(function ()
		{
			ACC.updatebillingaddress.updateBillingAddressForm();
		})
	}
	else
	{
		$("#newBillingAddressFields :input").removeAttr('disabled');
	}

	$('#paymentDetailsForm [tabindex="1"]').change(function ()
	{
		ACC.silentorderpost.displayStartDateIssueNum();
	});

	ACC.updatebillingaddress.bindCycleFocusEvent();
});
