/**
 *
 */
package com.hybris.pushnotification.facades.impl;

import javax.annotation.Resource;

import org.apache.log4j.Logger;

import com.hybris.pushnotification.facades.NotificationTokenFacade;
import com.hybris.pushnotification.service.NotificationService;


/**
 * @author i329189
 *
 */
public class DefaultNotificationTokenFacade implements NotificationTokenFacade
{
	private static final Logger LOG = Logger.getLogger(DefaultNotificationTokenFacade.class);

	@Resource
	private NotificationService notificationService;

	/*
	 * (non-Javadoc)
	 *
	 * @see com.hybris.pushnotification.facades.NotificationTokenFacade#setToken(java.lang.String)
	 */
	@Override
	public void setToken(final String currentToken)
	{
		LOG.info("Notification token facade");
		notificationService.setToken(currentToken);
		// YTODO Auto-generated method stub
		//return null;
	}

}
