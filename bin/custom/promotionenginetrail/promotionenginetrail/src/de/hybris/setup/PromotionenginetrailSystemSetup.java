/*
 * [y] hybris Platform
 * 
 * Copyright (c) 2000-2016 SAP SE
 * All rights reserved.
 * 
 * This software is the confidential and proprietary information of SAP 
 * Hybris ("Confidential Information"). You shall not disclose such 
 * Confidential Information and shall use it only in accordance with the 
 * terms of the license agreement you entered into with SAP Hybris.
 */
package de.hybris.setup;

import static de.hybris.constants.PromotionenginetrailConstants.PLATFORM_LOGO_CODE;

import de.hybris.platform.core.initialization.SystemSetup;

import java.io.InputStream;

import de.hybris.constants.PromotionenginetrailConstants;
import de.hybris.service.PromotionenginetrailService;


@SystemSetup(extension = PromotionenginetrailConstants.EXTENSIONNAME)
public class PromotionenginetrailSystemSetup
{
	private final PromotionenginetrailService promotionenginetrailService;

	public PromotionenginetrailSystemSetup(final PromotionenginetrailService promotionenginetrailService)
	{
		this.promotionenginetrailService = promotionenginetrailService;
	}

	@SystemSetup(process = SystemSetup.Process.INIT, type = SystemSetup.Type.ESSENTIAL)
	public void createEssentialData()
	{
		promotionenginetrailService.createLogo(PLATFORM_LOGO_CODE);
	}

	private InputStream getImageStream()
	{
		return PromotionenginetrailSystemSetup.class.getResourceAsStream("/promotionenginetrail/sap-hybris-platform.png");
	}
}
