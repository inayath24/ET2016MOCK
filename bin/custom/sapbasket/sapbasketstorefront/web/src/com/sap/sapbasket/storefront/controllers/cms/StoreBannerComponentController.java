/**
 *
 */
package com.sap.sapbasket.storefront.controllers.cms;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.sap.sapbasket.core.model.StoreBannerComponentModel;
import com.sap.sapbasket.storefront.controllers.ControllerConstants;


/*
 * @Controller("StorebannerComponentController")
 *
 * @RequestMapping(value = ControllerConstants.Actions.Cms.MiniCartComponent)
 */
@Controller("StoreBannerComponentController")
@RequestMapping(value = ControllerConstants.Actions.Cms.StoreBannerComponent)
public class StoreBannerComponentController extends AbstractAcceleratorCMSComponentController<StoreBannerComponentModel>
{

	/*
	 * (non-Javadoc)
	 *
	 * @see
	 * de.hybris.platform.acceleratorstorefrontcommons.controllers.cms.AbstractCMSComponentController#fillModel(javax.
	 * servlet.http.HttpServletRequest, org.springframework.ui.Model,
	 * de.hybris.platform.cms2.model.contents.components.AbstractCMSComponentModel)
	 */
	@Override
	protected void fillModel(final HttpServletRequest request, final Model model, final StoreBannerComponentModel component)
	{
		// YTODO Auto-generated method stub
		model.addAttribute("storebannerset", component.getStorebannerset());

	}

}
