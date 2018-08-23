<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<c:import url="/WEB-INF/jsp/header.jsp" />

<div>
<h1 class = "text-center">My Dashboard</h1>
</div>

<!-- The below div and script tag pulls in the forecast visualization -->
<div>
	<h2 class = "text-center">Forecast for Pittsburgh, PA</h2>
	<div class = "weatherviz img-fluid center-block" id="forecastChart" style="width:100%; height:500px;"></div>
</div>
<script src = "<c:url value = "/js/dashboardForecast.js"/>"></script>	

<!-- The below div and script tags pull in the live weather radar -->
<div class = "weatherviz img-fluid center-block" id='liveRadar' style='width: 40vw; height: 50vh;'></div>	
<script src = "<c:url value = "/js/dashboardRadar.js"/>"></script>	
<script type='text/javascript' src='https://www.bing.com/api/maps/mapcontrol?key=Auegz3e_DDJPknjYh5x9_mwrHLh28eGQT7eeR4SCm6cg5vllB7rqLaFGGp3Fznk_&callback=loadMapScenario' async defer></script>

<c:import url="/WEB-INF/jsp/footer.jsp" />   
        
    
    
       
    





