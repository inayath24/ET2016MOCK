/**
 *
 */
package com.hybris.pushnotification.service.impl;

import de.hybris.platform.servicelayer.model.ModelService;
import de.hybris.platform.servicelayer.search.FlexibleSearchService;

import javax.annotation.Resource;

import org.apache.log4j.Logger;

import com.hybris.pushnotification.service.NotificationService;
import com.sap.webpushnotifications.model.NotificationTokensModel;


/**
 * @author i329189
 *
 */
public class NotificationServiceImpl implements NotificationService
{

	private static final Logger LOG = Logger.getLogger(NotificationServiceImpl.class.getName());
	@Resource
	private ModelService modelService;

	@Resource
	private FlexibleSearchService flexibleSearchService;


	/**
	 * @return the modelService
	 */
	public ModelService getModelService()
	{
		return modelService;
	}


	/**
	 * @param modelService
	 *           the modelService to set
	 */
	public void setModelService(final ModelService modelService)
	{
		this.modelService = modelService;
	}


	/**
	 * @return the flexibleSearchService
	 */
	public FlexibleSearchService getFlexibleSearchService()
	{
		return flexibleSearchService;
	}


	/**
	 * @param flexibleSearchService
	 *           the flexibleSearchService to set
	 */
	public void setFlexibleSearchService(final FlexibleSearchService flexibleSearchService)
	{
		this.flexibleSearchService = flexibleSearchService;
	}


	/*
	 * (non-Javadoc)
	 *
	 * @see com.hybris.pushnotification.service.NotificationService#setToken(java.lang.String)
	 */
	@Override
	public void setToken(final String currentToken)
	{
		final NotificationTokensModel notificationToken = new NotificationTokensModel();
		notificationToken.setNotificationToken(currentToken);
		modelService.save(notificationToken);
	}
}
