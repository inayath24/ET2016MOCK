/**
 *
 */
package com.sap.sapbasket.sapbasketfacades;

import de.hybris.platform.commercefacades.customer.CustomerFacade;
import de.hybris.platform.commercefacades.user.data.CustomerData;
import de.hybris.platform.commerceservices.customer.DuplicateUidException;


/**
 * @author I328935
 *
 */
public interface CustomCustomerFacade extends CustomerFacade
{
	@Override
	void updateProfile(CustomerData customerData) throws DuplicateUidException;

	/**
	 * Updates current customer's profile with given parameters
	 *
	 * @param customerData
	 *           the updated customer data
	 * @throws DuplicateUidException
	 *            if the login is not unique
	 */
}
