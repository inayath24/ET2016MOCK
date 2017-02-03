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
	loadComponent: function(id, type, target, onSuccess, onError) {
		var self = this;
		if(id) {
			$.ajax({
				url: ACC.config.contextPath +  '/cms/component?componentUid=' + id,
				cache: false,
				type: 'GET',
				success: function (result) {
					reprocess = result.indexOf('js-responsive-image') > -1;
					self.insertHtml(result, target, reprocess);
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
	},
	
	insertHtml: function(html, target, reprocess) {
		if(target) {
			$(target).html(html);
			if(reprocess) {
				ACC.global.reprocessImages();
			}
		}
	}
}