package de.hybris.promotionenginetrail.definitions.conditions;

import de.hybris.platform.ruleengineservices.compiler.RuleCompilerContext;
import de.hybris.platform.ruleengineservices.compiler.RuleCompilerException;
import de.hybris.platform.ruleengineservices.compiler.RuleConditionTranslator;
import de.hybris.platform.ruleengineservices.compiler.RuleIrAttributeCondition;
import de.hybris.platform.ruleengineservices.compiler.RuleIrAttributeOperator;
import de.hybris.platform.ruleengineservices.compiler.RuleIrAttributeRelCondition;
import de.hybris.platform.ruleengineservices.compiler.RuleIrCondition;
import de.hybris.platform.ruleengineservices.compiler.RuleIrGroupCondition;
import de.hybris.platform.ruleengineservices.compiler.RuleIrGroupOperator;
import de.hybris.platform.ruleengineservices.compiler.RuleIrTypeCondition;
import de.hybris.platform.ruleengineservices.rao.CartRAO;
import de.hybris.platform.ruleengineservices.rao.CustomerReviewRAO;
import de.hybris.platform.ruleengineservices.rao.OrderEntryRAO;
import de.hybris.platform.ruleengineservices.rao.ProductRAO;
import de.hybris.platform.ruleengineservices.rao.UserRAO;
import de.hybris.platform.ruleengineservices.rule.data.RuleConditionData;
import de.hybris.platform.ruleengineservices.rule.data.RuleConditionDefinitionData;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


public class RuleCustomerReviewTranslator implements RuleConditionTranslator
{
	public static final String ANONYMOUS_USER = "anonymous";
	public static final String CART_RAO_ENTRIES_ATTRIBUTE = "entries";
	public static final String CART_RAO_USER_ATTRIBUTE = "user";
	public static final String PRODUCT_RAO_CODE_ATTRIBUTE = "code";
	public static final String ORDER_ENTRY_RAO_PRODUCT_ATTRIBUTE = "product";
	public static final String CUSTOMER_REVIEW_RAO_PRODUCT_ATTRIBUTE = "product";
	public static final String USER_RAO_CUSTOMER_REVIEWS_ATTRIBUTE = "customerReviews";
	public static final String USER_RAO_ID_ATTRIBUTE = "id";

	@Override
	public RuleIrCondition translate(final RuleCompilerContext context, final RuleConditionData condition,
			final RuleConditionDefinitionData conditionDefinition) throws RuleCompilerException
	{
		final String productRaoVariable = context.generateVariable(ProductRAO.class);
		final String orderEntryRaoVariable = context.generateVariable(OrderEntryRAO.class);
		final String cartRaoVariable = context.generateVariable(CartRAO.class);
		final String customerReviewRaoVariable = context.generateVariable(CustomerReviewRAO.class);
		final String userRaoVariable = context.generateVariable(UserRAO.class);
		final List<RuleIrCondition> irConditions = new ArrayList<>();
		final RuleIrTypeCondition irProductCondition = new RuleIrTypeCondition();
		irProductCondition.setVariable(productRaoVariable);
		final RuleIrAttributeRelCondition irCartOrderEntryRel = new RuleIrAttributeRelCondition();
		irCartOrderEntryRel.setVariable(cartRaoVariable);
		irCartOrderEntryRel.setAttribute(CART_RAO_ENTRIES_ATTRIBUTE);
		irCartOrderEntryRel.setOperator(RuleIrAttributeOperator.CONTAINS);
		irCartOrderEntryRel.setTargetVariable(orderEntryRaoVariable);
		final RuleIrAttributeRelCondition irOrderEntryProductRel = new RuleIrAttributeRelCondition();
		irOrderEntryProductRel.setVariable(orderEntryRaoVariable);
		irOrderEntryProductRel.setAttribute(ORDER_ENTRY_RAO_PRODUCT_ATTRIBUTE);
		irOrderEntryProductRel.setOperator(RuleIrAttributeOperator.EQUAL);
		irOrderEntryProductRel.setTargetVariable(productRaoVariable);
		final RuleIrAttributeRelCondition irCustomerReviewProductRel = new RuleIrAttributeRelCondition();
		irCustomerReviewProductRel.setVariable(customerReviewRaoVariable);
		irCustomerReviewProductRel.setAttribute(CUSTOMER_REVIEW_RAO_PRODUCT_ATTRIBUTE);
		irCustomerReviewProductRel.setOperator(RuleIrAttributeOperator.EQUAL);
		irCustomerReviewProductRel.setTargetVariable(productRaoVariable);
		final RuleIrAttributeRelCondition irUserCustomerReviewRel = new RuleIrAttributeRelCondition();
		irUserCustomerReviewRel.setVariable(userRaoVariable);
		irUserCustomerReviewRel.setAttribute(USER_RAO_CUSTOMER_REVIEWS_ATTRIBUTE);
		irUserCustomerReviewRel.setOperator(RuleIrAttributeOperator.CONTAINS);
		irUserCustomerReviewRel.setTargetVariable(customerReviewRaoVariable);
		final RuleIrAttributeRelCondition irCartUserRel = new RuleIrAttributeRelCondition();
		irCartUserRel.setVariable(cartRaoVariable);
		irCartUserRel.setAttribute(CART_RAO_USER_ATTRIBUTE);
		irCartUserRel.setOperator(RuleIrAttributeOperator.EQUAL);
		irCartUserRel.setTargetVariable(userRaoVariable);
		final RuleIrAttributeCondition irExcludedCustomersCondition = new RuleIrAttributeCondition();
		irExcludedCustomersCondition.setVariable(userRaoVariable);
		irExcludedCustomersCondition.setAttribute(USER_RAO_ID_ATTRIBUTE);
		irExcludedCustomersCondition.setOperator(RuleIrAttributeOperator.NOT_IN);
		irExcludedCustomersCondition.setValue(Collections.singletonList(ANONYMOUS_USER));
		irConditions.add(irProductCondition);
		irConditions.add(irCartOrderEntryRel);
		irConditions.add(irOrderEntryProductRel);
		irConditions.add(irCustomerReviewProductRel);
		irConditions.add(irUserCustomerReviewRel);
		irConditions.add(irCartUserRel);
		irConditions.add(irExcludedCustomersCondition);
		final RuleIrGroupCondition irCustomerReviewCondition = new RuleIrGroupCondition();
		irCustomerReviewCondition.setOperator(RuleIrGroupOperator.AND);
		irCustomerReviewCondition.setChildren(irConditions);
		return irCustomerReviewCondition;
	}
}