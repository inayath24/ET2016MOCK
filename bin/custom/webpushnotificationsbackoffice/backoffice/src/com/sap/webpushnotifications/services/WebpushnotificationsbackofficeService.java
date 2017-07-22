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
package com.sap.webpushnotifications.services;

import de.hybris.platform.servicelayer.model.ModelService;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.client.RestTemplate;

import com.hybris.pushnotification.dao.NotificationTokenDao;
import com.sap.webpushnotifications.model.NotificationTokensModel;


public class WebpushnotificationsbackofficeService
{

	private static final Logger LOG = Logger.getLogger(WebpushnotificationsbackofficeService.class);


	private NotificationTokenDao notificationTokenDao;

	@Resource
	private ModelService modelService;

	private RestTemplate restTemplate;


	public String send(final String title, final String body, final String link) throws Exception
	{
		final String reqUrl = "https://fcm.googleapis.com/fcm/send";

		final List<String> removeTokens = new ArrayList<String>();


		final List<NotificationTokensModel> notificationTokensModel = notificationTokenDao.getAllTokens();


		final ArrayList<String> tokens = new ArrayList<String>();
		/*
		 * final List<NotificationTokensModel> notificationTokensModel = notificationTokenDao.getAllTokens(); final
		 * ArrayList<String> tokens = new ArrayList<String>();
		 */

		for (final NotificationTokensModel n : notificationTokensModel)
		{

			tokens.add(n.getNotificationToken());
		}

		final JSONObject notificationObj = new JSONObject();
		notificationObj.put("title", title);
		notificationObj.put("body", body);
		notificationObj.put("click_action", link);
		notificationObj.put("icon", "https://upload.wikimedia.org/wikipedia/en/c/ca/Hybris_company_%28SAP%29_logo.jpg");
		notificationObj.put("image", "https://upload.wikimedia.org/wikipedia/en/c/ca/Hybris_company_%28SAP%29_logo.jpg");

		//"https://localhost:9002/sapbasketstorefront/_ui/addons/sapbasketstorefrontAddOn/responsive/common/images/firebase.png"
		/*
		 * final String s =
		 * WebpushnotificationsbackofficeService.class.getClassLoader().getResource("firebase.png").toString(); final File
		 * file = new File(s);
		 * //FileUtils.copyURLToFile(WebpushnotificationsbackofficeService.class.getClassLoader().getResource(
		 * "firebase.png"), file); notificationObj.put("icon", file);
		 */
		/*
		 * notificationObj.put("icon",
		 * "file:///C:/SAPBasket/hybris/bin/custom/pushnotificationaddon/acceleratoraddon/web/webroot/_ui/responsive/common/images/firebase.png"
		 * );
		 */
		for (int k = 0; k < tokens.size(); k++)
		{
			String response = null;
			try
			{
				final DataOutputStream[] printout = new DataOutputStream[1];

				final URL url = new URL(reqUrl);
				final HttpURLConnection conn = (HttpURLConnection) url.openConnection();

				conn.setConnectTimeout(10000);
				//urlc.setReadTimeout(10000);//?

				conn.setDoInput(true);
				conn.setDoOutput(true);

				/*
				 * Customer Sprcific firebase API key
				 */
				conn.setRequestProperty("AUTHORIZATION",
						"key=AAAA5dKG7Q4:APA91bGgHwpxhdLcafISaylMnZjx8H4mudwfkY9VK5zxmWALeOFY7Z1bMlIavKHNYZMnfE-XPUpSWPHezd9npcwnxyREvVh1o6pjryj9XpTDs6aT_qNwmQI_1NxXRnW-gVisWBoevMJS");
				conn.setRequestProperty("Content-type", "application/json");

				conn.setRequestMethod("POST");

				conn.connect();

				// Send POST output.
				printout[0] = new DataOutputStream(conn.getOutputStream());

				final JSONObject message = new JSONObject();
				message.put("data", notificationObj);

				LOG.info(tokens + "" + k + "the tokens are");

				message.put("to", tokens.get(k));//try with registration_ids...

				printout[0].writeBytes(message.toString());
				printout[0].flush();
				printout[0].close();

				final InputStream in = new BufferedInputStream(conn.getInputStream());
				response = convertStreamToString(in);
			}
			catch (final MalformedURLException e)
			{
				LOG.info(e);
			}
			catch (final ProtocolException e)

			{
				LOG.info(e);
			}
			catch (final IOException e)
			{
				LOG.info(e);
			}
			catch (final Exception e)
			{
				LOG.info(e);
			}

			LOG.info(response + "response");
			if (response != null)
			{
				final JSONObject removeInvalidToken = new JSONObject(response);
				final JSONArray invalidTokens = removeInvalidToken.getJSONArray("results");
				final JSONObject temp = invalidTokens.getJSONObject(0);
				if (temp.has("error"))//
				{
					removeTokens.add(tokens.get(k));//messaging.deleteToken(token) in unload.js...?

				}
			}
		}

		if (!removeTokens.isEmpty())

		{
			final List<NotificationTokensModel> invalidTokensModel = notificationTokenDao.removeInvalidTokens(removeTokens);
			modelService.removeAll(invalidTokensModel);

		}
		return "Notification SENT";
	}

	public RestTemplate getRestTemplate()
	{
		return restTemplate;

	public void setRestTemplate(final RestTemplate restTemplate)
	{
		this.restTemplate = restTemplate;
	}

	/**
	 * @return the notificationTokenDao
	 */
	public NotificationTokenDao getNotificationTokenDao()
	{
		return notificationTokenDao;
	}

	/**
	 * @param notificationTokenDao
	 *           the notificationTokenDao to set
	 */
	public void setNotificationTokenDao(final NotificationTokenDao notificationTokenDao)
	{
		this.notificationTokenDao = notificationTokenDao;
	}

	private String convertStreamToString(final InputStream is)
	{
		final BufferedReader reader = new BufferedReader(new InputStreamReader(is));
		final StringBuilder sb = new StringBuilder();

		String line;
		try
		{
			while ((line = reader.readLine()) != null)
			{
				sb.append(line).append('\n');
			}
		}
		catch (final IOException e)
		{
			e.printStackTrace();
		}
		finally
		{
			try
			{
				is.close();
			}
			catch (final IOException e)
			{
				e.printStackTrace();
			}
		}
		return sb.toString();
	}
}
