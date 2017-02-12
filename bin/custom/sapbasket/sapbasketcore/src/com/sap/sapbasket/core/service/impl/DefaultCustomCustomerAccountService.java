/**
 *
 */
package com.sap.sapbasket.core.service.impl;

import static de.hybris.platform.servicelayer.util.ServicesUtil.validateParameterNotNullStandardMessage;

import de.hybris.platform.commerceservices.customer.DuplicateUidException;
import de.hybris.platform.commerceservices.customer.impl.DefaultCustomerAccountService;
import de.hybris.platform.core.model.user.CustomerModel;

import org.apache.commons.lang.StringUtils;

import com.sap.sapbasket.core.service.CustomCustomerAccountService;


/**
 * @author I328935
 *
 */
public class DefaultCustomCustomerAccountService extends DefaultCustomerAccountService implements CustomCustomerAccountService
{

	/*
	 * (non-Javadoc)
	 *
	 * @see com.sap.sapbasket.core.service.CustomCustomerAccountService#updateProfile(de.hybris.platform.core.model.user.
	 * CustomerModel, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String,
	 * java.lang.String, java.lang.String)
	 */
	@Override
	public void updateProfile(final CustomerModel customerModel, final String titleCode, final String name, final String login,
			final String email, final String date_of_birth, final String mobile_number, final String landline_number)
					throws DuplicateUidException
	{
		validateParameterNotNullStandardMessage("customerModel", customerModel);

		customerModel.setUid(login);
		customerModel.setName(name);
		customerModel.setEmail(email);
		customerModel.setDate_of_birth(date_of_birth);
		customerModel.setMobile_number(mobile_number);
		customerModel.setLandline_number(landline_number);
		if (StringUtils.isNotBlank(titleCode))
		{
			customerModel.setTitle(getUserService().getTitleForCode(titleCode));
		}
		else
		{
			customerModel.setTitle(null);
		}
		internalSaveCustomer(customerModel);

	}





}
