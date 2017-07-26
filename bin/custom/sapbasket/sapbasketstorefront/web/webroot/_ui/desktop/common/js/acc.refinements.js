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
ACC.refinements = {

	bindAll: function ()
	{
		this.bindRefinementCategoryToggles();
		this.bindMoreLessToggles();
		this.bindMoreStoresToggles()
	},

	bindRefinementCategoryToggles: function ()
	{
		$('a.refinementToggle').each(function ()
		{
			$(this).attr('title', $(this).data('hideFacetText'));

			$(this).on("click", function ()
			{
				var content = $(this).parents('.facet').find('div.facetValues');
				$(this).attr('title', $(content).is(':visible') ? $(this).data('showFacetText') : $(this).data('hideFacetText'));
				$(this).toggleClass("close");
				$(content).slideToggle();
				return false;
			});

			$(this).next().click(function ()
			{
				$(this).prev().click();
			});
		});
	},
	
	bindMoreLessToggles: function ()
	{
		$("a.moreFacetValues").click(function(e){
			e.preventDefault();
				
			var eParent = $(this).parents(".facetValues");
			eParent.find(".topFacetValues").hide();
			eParent.find(".allFacetValues").show();
		})
		
		$("a.lessFacetValues").click(function(e){
			e.preventDefault();
				
			var eParent = $(this).parents(".facetValues");
			eParent.find(".topFacetValues").show();
			eParent.find(".allFacetValues").hide();
		})
	},
	
	bindMoreStoresToggles: function ()
	{
		$("a.moreStoresFacetValues").click(function(e){
			e.preventDefault();
				
			$(this).parents('div.allFacetValues').find('li.hidden').slice(0, 5).removeClass('hidden').first().find('input:[type=checkbox]').focus();
		})
		
	}
};

$(document).ready(function ()
{
	ACC.refinements.bindAll();
});
