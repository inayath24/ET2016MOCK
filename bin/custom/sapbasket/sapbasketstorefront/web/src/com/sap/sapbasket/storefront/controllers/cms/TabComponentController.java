/**
 *
 */
package com.sap.sapbasket.storefront.controllers.cms;

import de.hybris.platform.yacceleratorcore.model.cms2.components.TabComponentModel;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.sap.sapbasket.storefront.controllers.ControllerConstants;


/*
 * @Controller("StorebannerComponentController")
 *
 * @RequestMapping(value = ControllerConstants.Actions.Cms.MiniCartComponent)
 */
@Controller("TabComponentController")
@RequestMapping(value = ControllerConstants.Actions.Cms.TabComponent)
public class TabComponentController extends AbstractAcceleratorCMSComponentController<TabComponentModel>
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
	protected void fillModel(final HttpServletRequest request, final Model model, final TabComponentModel component)
	{
		// YTODO Auto-generated method stub
		model.addAttribute("media", component.getMedia());
	}

}
