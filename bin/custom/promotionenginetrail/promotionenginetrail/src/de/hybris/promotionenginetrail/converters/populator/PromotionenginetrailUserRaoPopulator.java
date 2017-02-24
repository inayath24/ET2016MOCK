package de.hybris.promotionenginetrail.converters.populator;

import de.hybris.platform.converters.Converters;
import de.hybris.platform.converters.Populator;
import de.hybris.platform.core.model.user.UserModel;
import de.hybris.platform.customerreview.model.CustomerReviewModel;
import de.hybris.platform.ruleengineservices.rao.CustomerReviewRAO;
import de.hybris.platform.ruleengineservices.rao.UserRAO;
import de.hybris.platform.servicelayer.dto.converter.ConversionException;
import de.hybris.platform.servicelayer.dto.converter.Converter;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Required;


public class PromotionenginetrailUserRaoPopulator implements Populator<UserModel, UserRAO>
{
	private Converter<CustomerReviewModel, CustomerReviewRAO> customerReviewConverter;

	@Override
	public void populate(final UserModel source, final UserRAO target) throws ConversionException
	{
		target.setCustomerReviews(
				new ArrayList<CustomerReviewRAO>(Converters.convertAll(source.getCustomerReviews(), getCustomerReviewConverter())));
	}

	public Converter<CustomerReviewModel, CustomerReviewRAO> getCustomerReviewConverter()
	{
		return customerReviewConverter;
	}

	@Required
	public void setCustomerReviewConverter(final Converter<CustomerReviewModel, CustomerReviewRAO> customerReviewConverter)
	{
		this.customerReviewConverter = customerReviewConverter;
	}
}