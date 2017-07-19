package com.hybris.pushnotification.controllers;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hybris.pushnotification.facades.NotificationTokenFacade;


@Controller
@RequestMapping("/notification")
public class NotificationPopUpController
{



	private static final Logger LOG = Logger.getLogger(NotificationPopUpController.class);



	@Resource
	private NotificationTokenFacade defaultNotificationTokenFacade;


	@RequestMapping(value = "/gettoken", method = RequestMethod.POST)
	@ResponseBody
	public String setToken(@RequestParam("json") final String json)
	{

		defaultNotificationTokenFacade.setToken(json);

		return "success";

	}
}