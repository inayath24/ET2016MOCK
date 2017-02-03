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
ACC.checkoutaddress = {

	spinner: $("<img src='" + ACC.config.commonResourcePath + "/images/spinner.gif' />"),
	addressID: '',

	showAddressBook: function ()
	{
		$(document).on("click", "#viewAddressBook", function ()
		{
			var data = $("#savedAddressListHolder").html();
			$.colorbox({

				height: false,
				html: data,
				onComplete: function ()
				{

					$(this).colorbox.resize();
				}
			});

		})
	},

	showRemoveAddressConfirmation: function ()
	{
		$(document).on("click", ".removeAddressButton", function ()
		{
			var addressId = $(this).data("addressId");
			$.colorbox({
				inline: true,
				height: false,
				href: "#popup_confirm_address_removal_" + addressId,
				onComplete: function ()
				{

					$(this).colorbox.resize();
				}
			});

		})
	}
}

// Address Verification
$(document).ready(function ()
{
	with (ACC.checkoutaddress)
	{

		showAddressBook();
		showRemoveAddressConfirmation();
	}
});


