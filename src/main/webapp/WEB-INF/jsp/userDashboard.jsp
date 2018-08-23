<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<c:import url="/WEB-INF/jsp/header.jsp" />

<div>
<h1 class = "text-center">My Dashboard</h1>
</div>

<div>
	<h2 class = "text-center">Forecast for Pittsburgh, PA</h2>
	<div class = "weatherviz img-fluid center-block" id="testChart" style="width:100%; height:400px;"></div>
</div>

<script src = "<c:url value = "/js/dashboardForecast.js"/>"></script>		
<c:import url="/WEB-INF/jsp/footer.jsp" />







    
        
    
    
       
    





