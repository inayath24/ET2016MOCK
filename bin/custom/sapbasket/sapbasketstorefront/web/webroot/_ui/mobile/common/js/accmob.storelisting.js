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
ACCMOB.storelisting = {

	scrollingConfig: {offset: '100%'},

	bindShowMoreStores: function (showMoreStoresArea, showMoreStoresFunction)
	{
		this.showMoreStoresArea = showMoreStoresArea;
		this.showMoreFunction = showMoreStoresFunction;
		ACCMOB.storelisting.showMoreStoresArea.waypoint(ACCMOB.storelisting.scrollingHandler, ACCMOB.storelisting.scrollingConfig);
	},

	scrollingHandler: function (event, direction)
	{
		if (direction === 'down' && ACCMOB.storelisting.showMoreFunction !== 'undefined')
		{
			ACCMOB.storelisting.showMoreFunction();

			// do not refresh page unless waypoint was scrolled
			$.extend(ACCMOB.storelisting.scrollingConfig, {onlyOnScroll: true});
			// redefine waypoint
			ACCMOB.storelisting.showMoreStoresArea.waypoint('remove');
			ACCMOB.storelisting.showMoreStoresArea.waypoint(ACCMOB.storelisting.scrollingConfig);
		}
	}
}
