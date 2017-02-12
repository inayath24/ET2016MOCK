/**
 *
 */
package com.sap.sapbasket.core.service;

import de.hybris.platform.commerceservices.customer.CustomerAccountService;
import de.hybris.platform.commerceservices.customer.DuplicateUidException;
import de.hybris.platform.core.model.user.CustomerModel;


/**
 * @author I328935
 *
 */
public interface CustomCustomerAccountService extends CustomerAccountService
{

	@Deprecated
	void updateProfile(CustomerModel customerModel, String titleCode, String name, String login, String email,
			String date_of_birth, String mobile_number, String landline_number) throws DuplicateUidException;

	/**
	 * Changes user password.
	 *
	 * @param userModel
	 *           the user to change the password for
	 * @param oldPassword
	 *           old password to confirm
	 * @param newPassword
	 *           new password to set
	 * @throws PasswordMismatchException
	 *            if the given old password does not match the one stored in the system
	 */
}
