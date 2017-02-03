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
ACC.carousel = {

	addthis_config: {
		ui_click: true
	},

	bindAll: function ()
	{
		this.bindJCarousel();
	},
	bindJCarousel: function ()
	{
		jQuery('.span-4 .jcarousel-skin').jcarousel({
			vertical: true
		});
		
		
		
	
	

		jQuery('.span-24 .scroller .jcarousel-skin').jcarousel({

		});


		$(".modal").colorbox({
			onComplete: function ()
			{
				ACC.common.refreshScreenReaderBuffer();
			},
			onClosed: function ()
			{
				ACC.common.refreshScreenReaderBuffer();
			}
		});
		$('#homepage_slider').waitForImages(function ()
		{
			$(this).slideView({toolTip: true, ttOpacity: 0.6, autoPlay: true, autoPlayTime: 8000});
		});
	}
};

$(document).ready(function ()
{
	ACC.carousel.bindAll();
});

