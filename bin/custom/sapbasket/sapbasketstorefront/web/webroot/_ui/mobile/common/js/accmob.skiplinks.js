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
ACCMOB.skiplinks = {

	bindAll: function ()
	{
		this.bindLinks();
	},

	bindLinks: function ()
	{
		$("a[href^='#']").not("a[href='#']").click(function ()
		{
			var target = $(this).attr("href");
			$(target).attr("tabIndex", -1).focus();
		});
	}
};

$(document).ready(function ()
{
	if ($.browser.webkit)
	{
		ACCMOB.skiplinks.bindAll();
	}
});
