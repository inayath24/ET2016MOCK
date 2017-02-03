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
ACCMOB.termsandconditions = {

	bindTermsAndConditionsLink: function(link) {
		link.on('tap', function(event) {
			$.colorbox({
				href: getTermsAndConditionsUrl,
				width: '100%',
				onComplete: function() {
					$('#cboxContent .content a').click(function(e) {
						// Hash links do not work within a mobile popup
						// So instead a jQuery.animate with a scrollTop attribute was used
						e.preventDefault();
						$('#cboxLoadedContent').animate({scrollTop:0}, 'slow');
					});
				}
			});

			$(this).parents('label').prev().prop('checked', 'false');
		});
	},

	initialize: function() {
		with(ACCMOB.termsandconditions) {
			bindTermsAndConditionsLink($('.termsCheck a'));
		}
	}
};

$(document).ready(function ()
{
	ACCMOB.termsandconditions.initialize();
});