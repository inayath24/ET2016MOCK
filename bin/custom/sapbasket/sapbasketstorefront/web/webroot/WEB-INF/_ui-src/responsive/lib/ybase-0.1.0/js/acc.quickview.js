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
ACC.quickview = {

	_autoload: [
		"bindToUiCarouselLink",
	],
		
		
	initQuickviewLightbox:function(){
		ACC.product.enableAddToCartButton();
		ACC.product.bindToAddToCartForm();
		ACC.product.enableStorePickupButton();
	},
		
	refreshScreenReaderBuffer: function ()
	{
		// changes a value in a hidden form field in order
		// to trigger a buffer update in a screen reader
		$('#accesibility_refreshScreenReaderBufferField').attr('value', new Date().getTime());
	},
	


	bindToUiCarouselLink: function ()
	{
		var titleHeader = $('#quickViewTitle').html();
		$(".js-owl-carousel-reference .js-reference-item").colorbox({
			close:'<span class="glyphicon glyphicon-remove"></span>',
			title: titleHeader,
			maxWidth:"100%",
			onComplete: function ()
			{
				ACC.quickview.refreshScreenReaderBuffer();
				ACC.quickview.initQuickviewLightbox();
				ACC.ratingstars.bindRatingStars($(".quick-view-stars"));
			},

			onClosed: function ()
			{
				ACC.quickview.refreshScreenReaderBuffer();
			}
		});
	}
	
};