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
ACCMOB.placeorder = {

	initialize: function ()
	{
		with (ACCMOB.placeorder)
		{
			bindTermsAndConditions($('#Terms1'), $('#Terms2'));
			bindTermsAndConditions($('#Terms2'), $('#Terms1'));
		}
	},

	bindTermsAndConditions: function (checkbox1, checkbox2)
	{
		checkbox1.change(function ()
		{
			$(this).prop('checked', function (i, val)
			{
				checkbox2.prop('checked', val);
				checkbox2.checkboxradio('refresh');
			});
		});
	}
};

$(document).ready(function ()
{
	ACCMOB.placeorder.initialize();
});
