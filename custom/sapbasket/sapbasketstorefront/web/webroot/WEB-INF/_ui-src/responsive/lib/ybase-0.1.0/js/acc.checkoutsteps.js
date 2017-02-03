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
ACC.checkoutsteps = {

	_autoload: [
		"permeateLinks"
	],
			
	permeateLinks: function() {
	
		$(document).on("click",".js-checkout-step",function(e){
			e.preventDefault();
			window.location=$(this).closest("a").attr("href")
		})		
	}


};