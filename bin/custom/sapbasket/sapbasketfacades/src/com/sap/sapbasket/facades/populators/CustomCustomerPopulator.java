/**
 *
 */
package com.sap.sapbasket.facades.populators;

import de.hybris.platform.commercefacades.user.converters.populator.CustomerPopulator;
import de.hybris.platform.commercefacades.user.data.CustomerData;
import de.hybris.platform.core.model.user.CustomerModel;


/**
 * @author I328935
 *
 */
public class CustomCustomerPopulator extends CustomerPopulator
{
	@Override
	public void populate(final CustomerModel source, final CustomerData target)
	{
		super.populate(source, target);

		target.setDate_of_birth(source.getDate_of_birth());
		target.setEmail(source.getEmail());
		target.setMobile_number(source.getMobile_number());
		target.setLandline_number(source.getLandline_number());

		setUid(source, target);
	}
}
