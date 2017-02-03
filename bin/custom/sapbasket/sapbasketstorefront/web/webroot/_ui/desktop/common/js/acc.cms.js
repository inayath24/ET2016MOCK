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
ACC.cms = {

	bindAll: function()
	{
		this.bindNavigationBarMenu();
	},

	bindNavigationBarMenu: function()
	{
		$('li.La ul ul a').each(function ()
		{
			$(this).focus(function ()
			{
				$(this).addClass('focused');
				var menuParent = $(this).closest('ul').parent().closest('ul');
				$(menuParent).addClass('dropdown-visible');
			});

			$(this).blur(function ()
			{
				$(this).removeClass('focused');
				var menuParent = $(this).closest('ul').parent().closest('ul');
				if (!$('.focused', menuParent).length)
				{
					$(menuParent).removeClass('dropdown-visible');
				}
			});
		});
	},
	
	loadComponent: function(id, type, target, onSuccess, onError) {
		var self = this;
		if(id) {
			$.ajax({
				url: ACC.config.contextPath +  '/cms/component?componentUid=' + id,
				cache: false,
				type: 'GET',
				success: function (result) {
					if(target) {
						$(target).html(result);
					}
					if(onSuccess) {
						onSuccess(result, id, type, target);
					}
				},
				error: function (result) {
					if(onError) {
						onError(result, id, type, target);
					}
				}
			});
		}
	}
};

$(document).ready(function()
{
	ACC.cms.bindAll();
});
