/**
 *
 */
package com.hybris.pushnotification.dao;

import de.hybris.platform.servicelayer.internal.dao.Dao;

import java.util.List;

import com.sap.webpushnotifications.model.NotificationTokensModel;


/**
 * @author I329189
 *
 */
public interface NotificationTokenDao extends Dao
{
	List<NotificationTokensModel> getAllTokens();

	List<NotificationTokensModel> removeInvalidTokens(List<String> tokens);

}
