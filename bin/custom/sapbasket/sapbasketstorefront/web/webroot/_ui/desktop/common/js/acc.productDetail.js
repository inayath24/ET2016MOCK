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
ACC.productDetail = {

	
	initPageEvents: function ()
	{
		
		
		$('.productImageGallery .jcarousel-skin').jcarousel({
			vertical: true
		});
		
		
		$(document).on("click","#imageLink, .productImageZoomLink",function(e){
			e.preventDefault();
			
			$.colorbox({
				href:$(this).attr("href"),
				height:555,
				onComplete: function() {
				    ACC.common.refreshScreenReaderBuffer();
					
					$('#colorbox .productImageGallery .jcarousel-skin').jcarousel({
						vertical: true
					});
					
				},
				onClosed: function() {
					ACC.common.refreshScreenReaderBuffer();
				}
			});
		});
		
		
		
		$(".productImageGallery img").click(function(e) {
			$(".productImagePrimary img").attr("src", $(this).attr("data-primaryimagesrc"));
			$("#zoomLink, #imageLink").attr("href",$("#zoomLink").attr("data-href")+ "?galleryPosition="+$(this).attr("data-galleryposition"));
			$(".productImageGallery .thumb").removeClass("active");
			$(this).parent(".thumb").addClass("active");
		});


		$(document).on("click","#colorbox .productImageGallery img",function(e) {
			$("#colorbox  .productImagePrimary img").attr("src", $(this).attr("data-zoomurl"));
			$("#colorbox .productImageGallery .thumb").removeClass("active");
			$(this).parent(".thumb").addClass("active");
		});
		
		
		
		$("body").on("keyup", "input[name=qtyInput]", function(event) {
  			var input = $(event.target);
		  	var value = input.val();
		  	var qty_css = 'input[name=qty]';
  			while(input.parent()[0] != document) {
 				input = input.parent();
 				if(input.find(qty_css).length > 0) {
  					input.find(qty_css).val(value);
  					return;
 				}
  			}
		});
		
	


		$("#Size").change(function () {
			var url = "";
			var selectedIndex = 0;
			$("#Size option:selected").each(function () {
				url = $(this).attr('value');
				selectedIndex = $(this).attr("index");
			});
			if (selectedIndex != 0) {
				window.location.href=url;
			}
		});

		$("#variant").change(function () {
			var url = "";
			var selectedIndex = 0;

			$("#variant option:selected").each(function () {
				url = $(this).attr('value');
				selectedIndex = $(this).attr("index");
			});
			if (selectedIndex != 0) {
				window.location.href=url;
			}
		});

		$(".selectPriority").change(function () {
			var url = "";
			var selectedIndex = 0;

			url = $(this).attr('value');
			selectedIndex = $(this).attr("index");

			if (selectedIndex != 0) {
				window.location.href=url;
			}
		});

	}

};

$(document).ready(function ()
{

	with(ACC.productDetail)
	{
		initPageEvents();
	}
});

