package de.hybris.promotionenginetrail.rule.action;

import de.hybris.platform.ruleengineservices.rao.CartRAO;
import de.hybris.platform.ruleengineservices.rao.RuleEngineResultRAO;


public interface AddUserToUserGroupRAOAction
{
	public ChangeUserGroupRAO addUserToUserGroup(final CartRAO cartRao, final String userGroupCode,
			final RuleEngineResultRAO result, final Object ruleContext);
}