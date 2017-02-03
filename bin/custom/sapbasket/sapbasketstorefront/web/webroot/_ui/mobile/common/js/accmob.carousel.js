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
ACCMOB.carousel = {

	initialize: function ()
	{
		this.bindJCarousel();
	},
	bindJCarousel: function ()
	{
		
	}
}

$(window).load(function ()
{
	 $(".owl-carousel").owlCarousel({
		navigation : true, 
		slideSpeed : 300,
		paginationSpeed : 400,
		singleItem:true,
		pagination:true
	 
	});
});

