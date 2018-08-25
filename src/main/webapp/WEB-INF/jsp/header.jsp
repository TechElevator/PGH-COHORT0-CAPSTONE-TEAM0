<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html>
<html>
	<head>
		<title>Weather Viz</title>
		<link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
	    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
	    <script src="http://cdn.jsdelivr.net/jquery.validation/1.15.0/jquery.validate.min.js"></script>
	    <script src="http://cdn.jsdelivr.net/jquery.validation/1.15.0/additional-methods.js "></script>
	    <script src="https://cdn.jsdelivr.net/jquery.timeago/1.4.1/jquery.timeago.min.js"></script>
	    <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
	    <script src="https://code.highcharts.com/highcharts.js"></script>
		<link rel="stylesheet" type="text/css" href="<c:url value="/css/site.css"/>">
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
		
		
		<script type="text/javascript">
			$(document).ready(function() {
				/* $("time.timeago").timeago(); */
				
				$("#logoutLink").click(function(event){
					$("#logoutForm").submit();
				});
				
				var pathname = window.location.pathname;
				$("nav a[href='"+pathname+"']").parent().addClass("active");
				
			});
			
			
		</script>
		
	</head>
	<body>
		<header>
			<c:url var="homePageHref" value="/" />
			<c:url var="imgSrc" value="/img/logo.png" />
			<a href="${homePageHref}"><img src="${imgSrc}" class="img-responsive" /></a>
		</header>
		<nav class="navbar navbar-default">
			<div class="container-fluid">
				<ul class="nav navbar-nav">
					<c:url var="homePageHref" value="/" />
					<li><a href="${homePageHref}"><i class="fas fa-home"></i> Home</a></li>
					<c:if test="${not empty currentUser}">
						<c:url var="dashboardHref" value="/users/${currentUser.userName}" />
						<li><a href="${dashboardHref}"><i class="fas fa-bolt"></i> My Dashboard</a></li>
					
					</c:if>
				</ul>
				<ul class="nav navbar-nav navbar-right">
					<c:choose>
						<c:when test="${empty currentUser}">
							<c:url var="newUserHref" value="/users/new" />
							<li><a href="${newUserHref}"><i class="fas fa-user-plus"></i> Sign Up</a></li>
							<c:url var="loginHref" value="/login" />
							<li><a href="${loginHref}"> <i class="fas fa-sign-in-alt"></i> Log In</a></li>
						</c:when>
						<c:otherwise>
							<c:url var="logoutAction" value="/logout" />
							<form id="logoutForm" action="${logoutAction}" method="POST">
							<input type="hidden" name="CSRF_TOKEN" value="${CSRF_TOKEN}"/>
							</form>
							<c:url var = "settingsHref" value = "/users/${currentUser.userName}/settings"/>
							<li><a id = "settingsLink" href = "${settingsHref}"><i class="fas fa-sliders-h"></i> Settings</a><li>
							<li><a id="logoutLink" href="#"><i class="fas fa-sign-out-alt"></i> Log Out</a></li>
						</c:otherwise>
					</c:choose>
				</ul>
			</div>
		</nav>
		<c:if test="${not empty currentUser}">
			<p id="currentUser text-center">Current User: ${currentUser.userName}</p>
		</c:if>		
		<div class="container">