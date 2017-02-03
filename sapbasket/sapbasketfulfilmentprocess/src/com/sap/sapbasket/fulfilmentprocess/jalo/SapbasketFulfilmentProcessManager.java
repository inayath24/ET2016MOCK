/*
 * [y] hybris Platform
 *
 * Copyright (c) 2000-2016 SAP SE or an SAP affiliate company.
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of SAP
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with SAP.
 */
package com.sap.sapbasket.fulfilmentprocess.jalo;

import de.hybris.platform.jalo.JaloSession;
import de.hybris.platform.jalo.extension.ExtensionManager;
import com.sap.sapbasket.fulfilmentprocess.constants.SapbasketFulfilmentProcessConstants;

@SuppressWarnings("PMD")
public class SapbasketFulfilmentProcessManager extends GeneratedSapbasketFulfilmentProcessManager
{
	public static final SapbasketFulfilmentProcessManager getInstance()
	{
		ExtensionManager em = JaloSession.getCurrentSession().getExtensionManager();
		return (SapbasketFulfilmentProcessManager) em.getExtension(SapbasketFulfilmentProcessConstants.EXTENSIONNAME);
	}
	
}
