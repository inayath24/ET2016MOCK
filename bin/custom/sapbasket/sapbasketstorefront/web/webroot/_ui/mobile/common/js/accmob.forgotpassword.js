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
ACCMOB.forgotpassword = {

	bindAll: function()
	{
		this.bindForgotPasswordLink($('.password-forgotten'));
		this.bindBackToLoginLink('.registerNewCustomerLinkHolderBack');
	},

	bindForgotPasswordLink: function(link)
	{
		var self = this;
		var globalMsgs = $('#globalMessages');
		var forgottenPwd;
		var forgottenPwdForm;

		link.click(function()
		{
			$.mobile.loading('show');
			$.get(link.data('url')).done(function(data) {
				if (typeof forgottenPwd === 'undefined')
				{
					$('body').append(data);
				}
				else
				{
					forgottenPwd.replaceWith(data);
				}

				forgottenPwd = $('#forgottenPwd');
				forgottenPwdForm = $('#forgottenPwdForm');

				$.mobile.changePage(forgottenPwd);
				$.mobile.loading('hide');

				forgottenPwdForm.ajaxForm({
					success: function(data)
					{
						$.mobile.loading('hide');
						globalMsgs.html('');

						if ($(data).closest('#accConfMsgs').length)
						{
							$('#globalMessages').html($(data));
							self.backToLoginPage();
						}
						else
						{
							forgottenPwdForm.find('.mFormList').replaceWith($(data).find('#forgottenPwdForm .mFormList'));
							forgottenPwdForm.find('[data-role=fieldcontain]').fieldcontain();
							forgottenPwdForm.find('[type=text]').textinput();
							forgottenPwdForm.find('[type=submit]').button();

							$('#globalMessages').html($(data).find('#forgottenPwdForm #form-errors'));
						}
						// call this directly, cannot refresh page inside a dialog
						ACCMOB.messages.initialize();
					}
				});
			});
		});
	},

	bindBackToLoginLink: function(link)
	{
		var self = this;
		$(document).on('click', link, function(){
			self.backToLoginPage();
		})
	},

	backToLoginPage: function()
	{
		$.mobile.changePage($('#body'));
	}
};

$(document).ready(function()
{
	ACCMOB.forgotpassword.bindAll();
});