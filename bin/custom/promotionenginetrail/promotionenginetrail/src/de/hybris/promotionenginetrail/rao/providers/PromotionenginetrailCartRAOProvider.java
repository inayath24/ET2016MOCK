package de.hybris.promotionenginetrail.rao.providers;

import de.hybris.platform.core.model.order.CartModel;
import de.hybris.platform.ruleengineservices.rao.CartRAO;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Set;
import de.hybris.platform.ruleengineservices.rao.providers.impl.DefaultCartRAOProvider;

public class PromotionenginetrailCartRAOProvider extends DefaultCartRAOProvider
{
	public static final String EXPAND_CUSTOMER_REVIEWS = "EXPAND_CUSTOMER_REVIEWS";

	@Override
	public Set<?> expandFactModel(final CartModel modelFact)
	{
		return expandFactModel(modelFact, getOptions());
	}

	@Override
	public Collection<String> getValidOptions()
	{
		return getOptions();
	}

	@Override
	protected Set<Object> expandRAO(final CartRAO cart, final Collection<String> options)
	{
		final Set<Object> facts = super.expandRAO(cart, options);
		for (final String option : options)
		{
			switch (option)
			{
				case EXPAND_CUSTOMER_REVIEWS:
					if (cart.getUser() != null)
					{
						facts.addAll(cart.getUser().getCustomerReviews());
					}
					break;
			}
		}
		return facts;
	}

	public Collection<String> getOptions()
	{
		final List<String> defaultOptions = new ArrayList<String>(getDefaultOptions());
		defaultOptions.add(EXPAND_CUSTOMER_REVIEWS);
		return defaultOptions;
	}
}