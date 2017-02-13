<%@ page trimDirectiveWhitespaces="true" %>
<%@ taglib prefix="template" tagdir="/WEB-INF/tags/desktop/template" %>
<%@ taglib prefix="cms" uri="http://hybris.com/tld/cmstags" %>
<%@ taglib prefix="common" tagdir="/WEB-INF/tags/desktop/common" %>

<template:page pageTitle="${pageTitle}">
	<div id="globalMessages">
		<common:globalMessages/>
	</div>

<div class="section1">
<div class="section1div">
	<cms:pageSlot position="Section1" var="feature">
			<cms:component component="${feature}" element="div" class=""/>
	</cms:pageSlot></div>
</div>
	<div class="section2">
		<table>
		<tr>
		<td style="width:50%">
		<cms:pageSlot position="Section2A" var="feature" element="div" >
			<cms:component component="${feature}" />
		</cms:pageSlot>
		</td>
		<td style="width: 25%">
		<cms:pageSlot position="Section2C" var="feature" element="div" >
			<cms:component component="${feature}" element="div"/>
		</cms:pageSlot>
		</td>
		<td style="width: 25%">
		
		<cms:pageSlot position="Section2B" var="feature" element="div" >
			<cms:component component="${feature}" />
		</cms:pageSlot>
		</td>
		
		<tr>
		</table>
	</div>

	<cms:pageSlot position="Section3" var="feature" element="div" >
		<cms:component component="${feature}" />
	</cms:pageSlot>

	<cms:pageSlot position="Section4" var="feature" element="div" >
		<cms:component component="${feature}" element="div" />
	</cms:pageSlot>

	<cms:pageSlot position="Section5" var="feature" element="div" >
		<cms:component component="${feature}" />
	</cms:pageSlot>

</template:page>