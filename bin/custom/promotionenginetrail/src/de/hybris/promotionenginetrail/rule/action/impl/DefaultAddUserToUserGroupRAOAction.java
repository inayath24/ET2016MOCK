package de.hybris.promotionenginetrail.rule.action.impl;

import de.hybris.platform.ruleengineservices.rao.CartRAO;
import de.hybris.platform.ruleengineservices.rao.RuleEngineResultRAO;
import de.hybris.platform.ruleengineservices.rao.UserGroupRAO;
import de.hybris.platform.ruleengineservices.rao.UserRAO;
import de.hybris.platform.ruleengineservices.util.RaoUtils;
import de.hybris.promotionenginetrail.rule.action.AddUserToUserGroupRAOAction;

import org.drools.core.spi.KnowledgeHelper;


public class DefaultAddUserToUserGroupRAOAction extends AbstractCommerceRAOAction implements AddUserToUserGroupRAOAction
{

	@Override
	public ChangeUserGroupRAO addUserToUserGroup(final CartRAO cartRao, final String userGroupCode,
			final RuleEngineResultRAO result, final Object ruleContext)
	{
		final KnowledgeHelper context = checkAndGetRuleContext(ruleContext);
		validateRule(context);

		final ChangeUserGroupRAO changeUserGroupRAO = new ChangeUserGroupRAO();
		RaoUtils.addAction(cartRao, changeUserGroupRAO);
		changeUserGroupRAO.setUserGroupId(userGroupCode);
		result.getActions().add(changeUserGroupRAO);

		final UserGroupRAO userGroupRAO = new UserGroupRAO();
		userGroupRAO.setId(userGroupCode);
		final UserRAO user = cartRao.getUser();
		user.getGroups().add(userGroupRAO);

		setRAOMetaData(context, changeUserGroupRAO);
		insertFacts(context, changeUserGroupRAO, userGroupRAO);
		updateFacts(context, user);
		trackRuleGroupExecutions(context);
		trackRuleExecution(context);
		return changeUserGroupRAO;
	}
}