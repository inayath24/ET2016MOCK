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
ACCMOB.liveEdit = {

	bindAll: function ()
	{
		this.bindGlobalClick();
	},

	bindGlobalClick: function ()
	{
		// Hook click event on body element to load CMS Component editor
		$('body').click(function (event)
		{
			var cmsComponent = ACCMOB.liveEdit.findNearestCMSComponent(event);
			var cmsComponentUid = cmsComponent.data('cmsComponent');
			var cmsContentSlotUid = cmsComponent.data('cmsContentSlot');

			ACCMOB.liveEdit.displayCMSComponentEditor(cmsComponentUid, cmsContentSlotUid);
			return false;
		});
	},

	findNearestCMSComponent: function (event)
	{
		return $(event.target).closest('.yCmsComponent');
	},

	displayCMSComponentEditor: function (cmsComponentUid, cmsContentSlotUid)
	{
		if (undefined != cmsComponentUid && cmsComponentUid != "")
		{
            parent.postMessage({eventName:'notifyIframeZkComponent', data: [cmsComponentUid, cmsContentSlotUid]},'*');
		}
	}
};

$(document).ready(function ()
{
	ACCMOB.liveEdit.bindAll();
});
