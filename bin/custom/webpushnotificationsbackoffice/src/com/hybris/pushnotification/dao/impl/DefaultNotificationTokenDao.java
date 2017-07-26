/**
 *
 */
package com.hybris.pushnotification.dao.impl;

import de.hybris.platform.servicelayer.internal.dao.DefaultGenericDao;
import de.hybris.platform.servicelayer.search.FlexibleSearchQuery;
import de.hybris.platform.servicelayer.search.SearchResult;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.hybris.pushnotification.dao.NotificationTokenDao;
import com.sap.webpushnotifications.model.NotificationTokensModel;


/**
 * @author I329189
 *
 */
public class DefaultNotificationTokenDao extends DefaultGenericDao<NotificationTokensModel> implements NotificationTokenDao
{

	/*
	 * (non-Javadoc)
	 *
	 * @see com.hybris.pushnotification.dao.NotificationTokenDao#getAllTokens()
	 */

	/**
	 * @param typecode
	 */
	public DefaultNotificationTokenDao(final String typecode)
	{
		super(NotificationTokensModel._TYPECODE);
	}

	@Override

	public List<NotificationTokensModel> getAllTokens()
	{
		return find();
	}

	/*
	 * (non-Javadoc)
	 *
	 * @see com.hybris.pushnotification.dao.NotificationTokenDao#removeInvalidTokens(java.util.List)
	 */
	@Override
	public List<NotificationTokensModel> removeInvalidTokens(final List<String> tokens)
	{
		final Map<String, Object> params = new HashMap<String, Object>();
		final String query = "SELECT {p:pk} FROM {NotificationTokens AS p} WHERE {p:NOTIFICATIONTOKEN} IN (?code)";
		final FlexibleSearchQuery query1 = new FlexibleSearchQuery(query.toString());
		params.put("code", tokens);
		query1.addQueryParameters(params);
		final SearchResult<NotificationTokensModel> result = getFlexibleSearchService().search(query1);
		return result.getResult();
	}
}
