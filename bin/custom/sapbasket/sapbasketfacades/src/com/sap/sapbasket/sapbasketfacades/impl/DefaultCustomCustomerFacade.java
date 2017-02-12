/**
 *
 */
package com.sap.sapbasket.sapbasketfacades.impl;

import de.hybris.platform.commercefacades.customer.impl.DefaultCustomerFacade;
import de.hybris.platform.commercefacades.user.data.CustomerData;
import de.hybris.platform.commerceservices.customer.DuplicateUidException;
import de.hybris.platform.core.model.user.CustomerModel;

import javax.annotation.Resource;

import com.sap.sapbasket.core.service.CustomCustomerAccountService;
import com.sap.sapbasket.sapbasketfacades.CustomCustomerFacade;


/**
 * @author I328935
 *
 */
public class DefaultCustomCustomerFacade extends DefaultCustomerFacade implements CustomCustomerFacade
{
	@Resource(name = "customCustomerAccountService")
	private CustomCustomerAccountService customCustomerAccountService;

	/**
	 * @return the customCustomerAccountService
	 */
	public CustomCustomerAccountService getCustomCustomerAccountService()
	{
		return customCustomerAccountService;
	}

	@Override
	public void updateProfile(final CustomerData customerData) throws DuplicateUidException
	{
		validateDataBeforeUpdate(customerData);

		final String name = getCustomerNameStrategy().getName(customerData.getFirstName(), customerData.getLastName());
		final CustomerModel customer = getCurrentSessionCustomer();
		customer.setOriginalUid(customerData.getDisplayUid());
		getCustomCustomerAccountService().updateProfile(customer, customerData.getTitleCode(), name, customerData.getUid(),
				customerData.getEmail(), customerData.getDate_of_birth(), customerData.getMobile_number(),
				customerData.getLandline_number());
	}


}
