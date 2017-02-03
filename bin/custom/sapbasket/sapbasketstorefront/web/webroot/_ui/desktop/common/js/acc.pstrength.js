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
ACC.pwdstrength = {

	bindAll: function ()
	{
		this.bindPStrength();
	},

	bindPStrength: function ()
	{
		$('.strength').pstrength({ verdicts: [ACC.pwdStrengthVeryWeak,
			ACC.pwdStrengthWeak,
			ACC.pwdStrengthMedium,
			ACC.pwdStrengthStrong,
			ACC.pwdStrengthVeryStrong],
			tooShort: ACC.pwdStrengthTooShortPwd,
			minCharText: ACC.pwdStrengthMinCharText });
	}

};

$(document).ready(function ()
{
	ACC.pwdstrength.bindAll();
});
