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
ACCMOB.messages = {

	createDialog: function (config)
	{
		$.mobile.easydialog(config);
	},

	bindGlobalMessages: function ()
	{
		var accErrorMsgs = $("#accErrorMsgs");
		if (accErrorMsgs.length > 0)
		{
			$.mobile.easydialog({
				content: accErrorMsgs.html(),
				header: accErrorMsgs.data('headertext'),
				type: 'error'
			});
		}

		var accInfoMsgs = $("#accInfoMsgs");
		if (accInfoMsgs.length > 0)
		{

			$.mobile.easydialog({
				content: accInfoMsgs.html(),
				header: accInfoMsgs.data('headertext'),
				type: 'info'
			});
			
		}

		var accConfMsgs = $("#accConfMsgs");
		if (accConfMsgs.length > 0)
		{
			$.mobile.easydialog({
				content: accConfMsgs.html(),
				header: accConfMsgs.data('headertext'),
				type: 'conf'
			});
			
		}
	},

	bindFormErrors: function ()
	{
		var errors = $("#form-errors");
		var accErrorMsgs = $("#accErrorMsgs");

		if (errors.length > 0)
		{
			$.mobile.easydialog({
				content: accErrorMsgs.html(),
				header: accErrorMsgs.data('headertext'),
				type: 'error'
			});
		}
	},

	initialize: function ()
	{
		with (ACCMOB.messages)
		{
			bindGlobalMessages();
			bindFormErrors();
		}
	}
};

$(document).ready(function ()
{
	ACCMOB.messages.initialize();
});
