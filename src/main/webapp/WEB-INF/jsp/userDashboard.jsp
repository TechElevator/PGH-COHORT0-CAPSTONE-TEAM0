<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<c:import url="/WEB-INF/jsp/header.jsp" />

	<div>
	<h1>My Dashboard User:${currentUser.userName}</h1>
	</div>
	
	<div>
		<h2>Forecast for Pittsburgh, PA!</h2>
		<!--  <img src = "<c:url value = "/img/testChart3.png" />" alt = "Forecast visualization"> -->
	</div>
	
	<div id="testChart" style="width:100%; height:400px;"></div>


<script src = "<c:url value = "/js/dashboardForecast.js"/>"></script>

		
<c:import url="/WEB-INF/jsp/footer.jsp" />







    
        
    
    
       
    





