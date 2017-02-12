/**
 *
 */
package com.sap.sapbasket.storefront.forms;

import de.hybris.platform.acceleratorstorefrontcommons.forms.UpdateProfileForm;


/**
 * @author I328935
 *
 */
public class ExtendedUpdateProfileForm extends UpdateProfileForm
{
	private String email;
	private String date_of_birth;
	private String mobile_number;
	private String landline_number;

	/**
	 * @return the email
	 */
	public String getEmail()
	{
		return email;
	}

	/**
	 * @param email
	 *           the email to set
	 */
	public void setEmail(final String email)
	{
		this.email = email;
	}

	/**
	 * @return the date_of_birth
	 */
	public String getDate_of_birth()
	{
		return date_of_birth;
	}

	/**
	 * @param date_of_birth
	 *           the date_of_birth to set
	 */
	public void setDate_of_birth(final String date_of_birth)
	{
		this.date_of_birth = date_of_birth;
	}

	/**
	 * @return the mobile_number
	 */
	public String getMobile_number()
	{
		return mobile_number;
	}

	/**
	 * @param mobile_number
	 *           the mobile_number to set
	 */
	public void setMobile_number(final String mobile_number)
	{
		this.mobile_number = mobile_number;
	}

	/**
	 * @return the landline_number
	 */
	public String getLandline_number()
	{
		return landline_number;
	}

	/**
	 * @param landline_number
	 *           the landline_number to set
	 */
	public void setLandline_number(final String landline_number)
	{
		this.landline_number = landline_number;
	}
}
