<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<c:import url="/WEB-INF/jsp/header.jsp" />

<div>
<h1 class = "text-center">My Dashboard</h1>
</div>

<div>
	<h2 class = "text-center">Forecast for Pittsburgh, PA</h2>
	<img class = "weatherviz img-fluid center-block"src = "<c:url value = "/img/testChart3.png" />" alt = "Forecast visualization">
</div>























		
<c:import url="/WEB-INF/jsp/footer.jsp" />