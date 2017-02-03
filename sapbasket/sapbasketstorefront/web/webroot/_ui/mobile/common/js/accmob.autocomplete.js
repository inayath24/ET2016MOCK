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
ACCMOB.autocomplete = {

	suggestionClicked: false,

	bindOnSuggestionClick: function (suggestion, search)
	{
		$(document).on('tap', suggestion, function ()
		{
			$(search).val($(this).text());
		});
	},

	createSuggestionsContainer: function ()
	{
		$('<div id="suggestions_container"><ul id="suggestions" data-ajax="false" data-role="listview" data-inset="true" data-theme="g" data-content-theme="g"></ul></div>').insertAfter('#bottomHeader');
	},

	setUp: function (searchField)
	{
		ACCMOB.autocomplete.suggestionClicked = false;
		$('div#suggestions_container ul').empty();
		$('div#suggestions_container ul').listview();

		var option = searchField.data('options');
		var value = searchField.val();

		$('div#suggestions_container ul').listview('refresh');

		searchField.autocomplete({
			target: $('#suggestions'),
			source: option.autocompleteUrl,
			link: ACCMOB.config.contextPath + '/search?text=',
			minLength: option.minCharactersBeforeRequest,
			waitTime: option.waitTimeBeforeRequest,
			displayProductImages: option.displayProductImages
		});
	},

	clearSuggestions: function ()
	{
		$("div#suggestions_container ul").empty();
	},

	initialize: function ()
	{
		var searchField = $("#search");

		ACCMOB.autocomplete.createSuggestionsContainer();

		searchField.live("focusout", function (e)
		{
			if (!ACCMOB.autocomplete.suggestionClicked)
			{
				ACCMOB.autocomplete.clearSuggestions();
			}
		});

		searchField.live("focusin", function ()
		{
			ACCMOB.autocomplete.setUp($("#search"));
		});


		$("div#suggestions_container ul > li a").live("mousedown", function ()
		{
			ACCMOB.autocomplete.suggestionClicked = true;
		});

		ACCMOB.autocomplete.bindOnSuggestionClick('#suggestions > li', '#search');
	}
};

$(document).ready(function ()
{
	ACCMOB.autocomplete.initialize();
});
