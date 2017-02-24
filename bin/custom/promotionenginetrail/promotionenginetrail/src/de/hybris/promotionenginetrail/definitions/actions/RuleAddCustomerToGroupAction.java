package de.hybris.promotionenginetrail.definitions.actions;

import de.hybris.platform.ruleengineservices.rule.evaluation.RuleActionContext;
import de.hybris.platform.ruleengineservices.rule.evaluation.RuleEvaluationException;
import de.hybris.platform.ruleengineservices.rule.evaluation.RuleExecutableAction;
import de.hybris.promotionenginetrail.rule.action.impl.AddUserToUserGroupRAOAction;

import java.util.Map;

import org.springframework.beans.factory.annotation.Required;


public class RuleAddCustomerToGroupAction implements RuleExecutableAction
{
	public static final String CUSTOMER_GROUP_PARAM = "customer_group";
	private AddUserToUserGroupRAOAction addUserToUserGroupRAOAction;

	@Override
	public void executeAction(final RuleActionContext context, final Map<String, Object> parameters) throws RuleEvaluationException
	{
		//final RuleEngineResultRAO result = context.getValue(RuleEngineResultRAO.class);
		//final CartRAO cart = context.getValue(CartRAO.class);
		//final String customerGroup = (String) parameters.get(CUSTOMER_GROUP_PARAM);
		//	addUserToUserGroupRAOAction.addUserToUserGroup(cart, customerGroup, result, context.getDelegate());
		addUserToUserGroupRAOAction.performAction(context, parameters);
	}

	public AddUserToUserGroupRAOAction getAddUserToUserGroupRAOAction()
	{
		return addUserToUserGroupRAOAction;
	}

	@Required
	public void setAddUserToUserGroupRAOAction(final AddUserToUserGroupRAOAction addUserToUserGroupRAOAction)
	{
		this.addUserToUserGroupRAOAction = addUserToUserGroupRAOAction;
	}
}