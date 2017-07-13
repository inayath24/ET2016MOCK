/**
 *
 */
package com.hybris.pushnotification.dao.impl;

import de.hybris.platform.servicelayer.internal.dao.DefaultGenericDao;
import de.hybris.platform.servicelayer.search.FlexibleSearchQuery;
import de.hybris.platform.servicelayer.search.SearchResult;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.hybris.pushnotification.dao.NotificationTokenDao;
import com.sap.webpushnotifications.model.NotificationTokensModel;
/*import com.sap.sapbasket.core.model.NotificationTokensModel;
*/


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
		// YTODO Auto-generated method stub

		final Map<String, Object> params = new HashMap<String, Object>();
		final String query = "SELECT {p:pk} FROM {NotificationTokens AS p} WHERE {p:NOTIFCATIONTOKEN} IN (?code)";
		final FlexibleSearchQuery query1 = new FlexibleSearchQuery(query.toString());
		final List<String> temp = new ArrayList<String>();
		temp.add("athira");
		params.put("code", tokens);
		query1.addQueryParameters(params);
		/*
		 * final SearchResult<NotificationTokensModel> searchResult =
		 */ final SearchResult<NotificationTokensModel> result = getFlexibleSearchService().search(query1);




		/*
		 * (non-Javadoc)
		 *
		 * @see com.hybris.pushnotification.dao.NotificationTokenDao#removeInvalidTokens(java.util.List)
		 */
		/*
		 * final Map<String, Object> map = new HashMap<String, Object>();
		 * map.put(NotificationTokensModel.NOTIFCATIONTOKEN, tokens);
		 *
		 * final String FIND_ORDERS_BY_CUSTOMER_CODE_STORE_QUERY = "SELECT {" + NotificationTokensModel.PK + "} FROM {" +
		 * NotificationTokensModel._TYPECODE + "} WHERE {" + NotificationTokensModel.NOTIFCATIONTOKEN + "} IN ('?athira')"
		 * ; final Map<String, Object> params = new HashMap<String, Object>();
		 *
		 * params.put("athira", tokens); final FlexibleSearchQuery query = new
		 * FlexibleSearchQuery(FIND_ORDERS_BY_CUSTOMER_CODE_STORE_QUERY);
		 *
		 * query.addQueryParameters(params); final SearchResult<NotificationTokensModel> result =
		 * getFlexibleSearchService().search(query);
		 */

		/* + OrderModel.STORE + "} = ?store"; final List<NotificationTokensModel> notificationTokensModel = find(map); */
		return result.getResult();

	}
}
