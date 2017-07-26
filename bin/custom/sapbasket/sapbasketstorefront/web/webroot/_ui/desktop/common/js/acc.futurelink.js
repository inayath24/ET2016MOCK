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
	bindAll: function() {
		this.bindFutureStockLink();
	},
	
	bindFutureStockLink: function() {
		$(document).on("click",".futureStockLink", function(e) {
			e.preventDefault();
			$.colorbox({
				href:       $(this).attr("href"),
				width:      440,
				height:     250,
				onComplete: function() {
					$.colorbox.resize();
				}
			});
		})
	}

};

$(document).ready(function() {
	ACC.futurelink.bindAll();
});
