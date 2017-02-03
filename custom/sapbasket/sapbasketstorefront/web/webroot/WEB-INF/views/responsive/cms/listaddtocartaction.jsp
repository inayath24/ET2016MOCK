<%@ page trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="ycommerce" uri="http://hybris.com/tld/ycommercetags"%>

<c:if test="${not product.multidimensional }">
	<c:url value="/cart/add" var="addToCartUrl"/>
    <c:url value="${product.url}/configuratorPage/${configuratorType}" var="configureProductUrl"/>

	<form:form id="addToCartForm${product.code}" action="${addToCartUrl}" method="post" class="add_to_cart_form">
		
		<ycommerce:testId code="addToCartButton">
			<input type="hidden" name="productCodePost" value="${product.code}"/>
			<input type="hidden" name="productNamePost" value="${product.name}"/>
			<input type="hidden" name="productPostPrice" value="${product.price.value}"/>

			<button type="submit" class="btn btn-primary btn-block glyphicon glyphicon-shopping-cart js-enable-btn"
	            <c:if test="${product.stock.stockLevelStatus.code eq 'outOfStock' }"> out-of-stock</c:if>
	            <c:if test="${product.stock.stockLevelStatus.code eq 'outOfStock' }">aria-disabled="true"</c:if> disabled="disabled"></button>
		</ycommerce:testId>
	</form:form>

	<form:form id="configureForm${product.code}" action="${configureProductUrl}" method="get" class="configure_form">
        <c:if test="${product.configurable}">
             <button id="configureProduct" type="button" class="btn btn-primary btn-block js-enable-btn"
	             <c:if test="${product.stock.stockLevelStatus.code eq 'outOfStock' }"> out-of-stock</c:if>
             disabled="disabled"
             onclick="location.href='${configureProductUrl}'">
                 <spring:theme code="basket.configure.product"/>
             </button>
        </c:if>
    </form:form>
</c:if>
