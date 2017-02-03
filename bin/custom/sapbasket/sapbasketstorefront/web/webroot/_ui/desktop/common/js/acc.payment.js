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

	bindUseThisSavedCardButton: function ()
	{
		$(document).on("click",'.use_this_saved_card_button', function ()
		{
			var paymentId = $(this).attr('data-payment');
			$.postJSON(setPaymentDetailsUrl, {paymentId: paymentId}, ACC.payment.handleSelectSavedCardSuccess);
			return false;
		});
	},

	handleSelectSavedCardSuccess: function (data)
	{
		if (data != null)
		{
			ACC.refresh.refreshPage(data);

			parent.$.colorbox.close();
		}
		else
		{
			alert("Failed to set payment details");
		}
	},

	refreshPaymentDetailsSection: function (data)
	{
		$('.summaryPayment').replaceWith($('#paymentSummaryTemplate').tmpl(data));

		//bind edit payment details button
		if (!typeof bindSecurityCodeWhatIs == 'undefined')
			bindSecurityCodeWhatIs();
	},
	
	showSavedPayments: function ()
	{
		$(document).on("click","#viewSavedPayments",function(){
			var data = $("#savedPaymentListHolder").html();
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

	bindPaymentCardTypeSelect: function ()
	{
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
	}
}


$(document).ready(function ()
{
	ACC.payment.bindPaymentCardTypeSelect();
	ACC.payment.showSavedPayments();
	if (!typeof bindSecurityCodeWhatIs == 'undefined')
	{
		bindSecurityCodeWhatIs();
	}
});
	
	
	
	
