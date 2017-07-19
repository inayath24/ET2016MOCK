/*
 * [y] hybris Platform
 *
 * Copyright (c) 2000-2016 SAP SE
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of hybris
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with hybris.
 */
package com.sap.webpushnotifications.widgets;

import org.zkoss.zk.ui.WrongValueException;
import org.zkoss.zk.ui.event.Events;
import org.zkoss.zk.ui.select.annotation.WireVariable;
import org.zkoss.zul.Textbox;

import com.hybris.cockpitng.annotations.ViewEvent;
import com.hybris.cockpitng.util.DefaultWidgetController;
import com.sap.webpushnotifications.services.WebpushnotificationsbackofficeService;


public class WebpushnotificationsbackofficeController extends DefaultWidgetController
{
	private static final long serialVersionUID = 1L;

	private Textbox title;
	private Textbox body;
	private Textbox link;


	@WireVariable
	private WebpushnotificationsbackofficeService webpushnotificationsbackofficeService;

	/*
	 * @Override public void initialize(final Component comp) { super.initialize(comp);
	 * label.setValue(webpushnotificationsbackofficeService.getHello() + " WebpushnotificationsbackofficeController"); }
	 */
	@ViewEvent(componentID = "send", eventName = Events.ON_CLICK)
	public void doSearch() throws WrongValueException, Exception
	{
		webpushnotificationsbackofficeService.send(title.getText(), body.getText(), link.getText());

	}
}
