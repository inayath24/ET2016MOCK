<%@ page trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="template" tagdir="/WEB-INF/tags/responsive/template"%>
<%@ taglib prefix="cms" uri="http://hybris.com/tld/cmstags"%>

<template:page pageTitle="${pageTitle}">
	<cms:pageSlot position="Section1" var="feature">
		<cms:component component="${feature}" />
	</cms:pageSlot>
	<table class="section2">
		<tr>
			<td style="width: 50%;">
				<cms:pageSlot position="Section2A" var="feature" element="div" class="row no-margin">
					<cms:component component="${feature}" element="div"
						class="col-xs-12 col-sm-6 no-space yComponentWrapper" />
				</cms:pageSlot>
			</td>
			<td style="width: 25%;">
				<cms:pageSlot position="Section2B" var="feature" element="div" class="row no-margin">
					<cms:component component="${feature}" element="div"
						class="" />
				</cms:pageSlot>
			</td >
			<td style="width: 25%;"><cms:pageSlot position="Section2C" var="feature"
					element="div" class="landingLayout2PageSection2C">
					<cms:component component="${feature}" element="div"
						class="yComponentWrapper" />
				</cms:pageSlot></td>
		</tr>
	</table>

	<cms:pageSlot position="Section3" var="feature" element="div">
		<cms:component component="${feature}" element="div"
			class="" />
	</cms:pageSlot>

	<cms:pageSlot position="Section4" var="feature" element="div"
	>
		<cms:component component="${feature}" element="div"
			/>
	</cms:pageSlot>

	<cms:pageSlot position="Section5" var="feature" element="div">
		<cms:component component="${feature}" element="div"
			class="yComponentWrapper" />
	</cms:pageSlot>

</template:page>
