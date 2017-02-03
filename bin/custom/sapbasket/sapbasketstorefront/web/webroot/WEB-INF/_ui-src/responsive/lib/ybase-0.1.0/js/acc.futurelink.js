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
ACC.futurelink = {
	
	_autoload: [
			"bindFutureStockLink"
		],

	bindFutureStockLink: function() {
		$(document).on("click",".futureStockLink", function(e) {
			e.preventDefault();
			var url = $(this).attr("href");
			var title = $(this).attr("title");

			ACC.colorbox.open(title,{
				href: url,
				maxWidth:"100%",
				width:"320px",
				height:"320px",
				initialWidth :"320px"
			});
		})
	}
};