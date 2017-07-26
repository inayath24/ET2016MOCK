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
ACC.payment = {
		
		activateSavedPaymentButton: function(){

			$(document).on("click",".js-saved-payments",function(e){
				e.preventDefault();
				
				var title = $("#savedpaymentstitle").html();
				
				$.colorbox({
					href: "#savedpaymentsbody",
					inline:true,
					maxWidth:"100%",
					opacity:0.7,
					width:"320px",
					title: title,
					close:'<span class="glyphicon glyphicon-remove"></span>',
					onComplete: function(){
					}
				});
			})
		},
		bindPaymentCardTypeSelect: function ()
		{
			ACC.payment.filterCardInformationDisplayed();
			$("#card_cardType").change(function ()
			{
				var cardType = $(this).val();
				if (cardType == '024')
				{
					$('#startDate, #issueNum').show();
				}
				else
				{
					$('#startDate, #issueNum').hide();
				}
			});
		},
		filterCardInformationDisplayed: function ()
		{
			var cardType = $('#card_cardType').val();
			if (cardType == '024')
			{
				$('#startDate, #issueNum').show();
			}
			else
			{
				$('#startDate, #issueNum').hide();
			}
		}
}

$(document).ready(function () {
	with (ACC.payment) {
		activateSavedPaymentButton();
		bindPaymentCardTypeSelect();
	}
});
	
	
	
