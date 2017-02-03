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
ACC.termsandconditions = {

	bindTermsAndConditionsLink: function() {
		$(document).on("click",".termsAndConditionsLink",function(e) {
			e.preventDefault();
			$.colorbox({
				maxWidth:"100%",
				maxHeight:"80%",
				width:"870px",
				scrolling:true,
				href: $(this).attr("href"),
				close:'<span class="glyphicon glyphicon-remove"></span>',
				title:'<div class="headline"><span class="headline-text">Terms and Conditions</span></div>',
				onComplete: function() {
					ACC.common.refreshScreenReaderBuffer();
				},
				onClosed: function() {
					ACC.common.refreshScreenReaderBuffer();
				}
			});
		});
	}
}

$(function(){
	with(ACC.termsandconditions) {
		bindTermsAndConditionsLink();
	}
});
