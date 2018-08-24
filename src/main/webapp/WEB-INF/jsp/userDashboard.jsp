<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<c:import url="/WEB-INF/jsp/header.jsp" />

<div>
<p>${currentUser.userName }</p>
<p>${currentUser.defaultLatitude }</p>
<p>${currentUser.defaultLongitude }</p>
<p>${currentUser.defaultVisualization }</p>
<p>${currentUser.defaultRegion }</p>
<p>${currentUser.defaultCity }</p>
<p>${currentUser.defaultTimezone }</p>
<p>${currentUser.defaultPopulation }</p>
<p>${currentUser.defaultUnits }</p>
</div>

<div>
<h1 class = "text-center">My Dashboard</h1>
</div>

<div id="currentConditionsContainer">
	<span id="weatherIconContainer">
		<img id="weatherIconImage" src = "<c:url value = "/img/weatherIcons/png/clouds-and-sun.png"/>">
	</span>
	<span>
		<ul class="list-unstyled">
			<li id="temperatureLI"></li>
			<li id="precipChanceLI"></li>
			<li id="humidityLI"></li>
			<li id="windLI"></li>
			<li id="windDirectionLI"></li>
			<li id="cloudCoverLI"></li>
		</ul>
	</span>
	



</div>

<div id="checkboxFormContainer">
	<form>
		<div>
  			<input class="checkbox" type="checkbox" id = "hiTemp" checked="checked">
  			High Temperature
		</div>
		<div>
  			<input class="checkbox" type="checkbox" id = "loTemp" checked="checked">
  			Low Temperature
		</div>
		<div>
  			<input class="checkbox" type="checkbox" id = "dewPoint" >
  			Dew Point
		</div>
		<div>
  			<input class="checkbox" type="checkbox" id = "precipChance">
  			Precipitation Chance
		</div>
		<!--  
		<div>
  			<input class="checkbox" type="checkbox" id = "precipType">
  			Precipitation Type
		</div>
		-->
		<div>
  			<input class="checkbox" type="checkbox" id = "humidity">
  			Humidity
		</div>
		<div>
  			<input class="checkbox" type="checkbox" id = "cloudCover">
  			Cloud Cover
		</div>
		<div>
  			<input class="checkbox" type="checkbox" id = "meanWind">
  			Mean Wind Speed
		</div>
		<div>
  			<input class="checkbox" type="checkbox" id = "windGust">
  			Peak Wind Gust
		</div>
		<!--
		<div>
  			<input class="checkbox" type="checkbox" id = "windDirection">
  			Wind Direction
		</div>
		-->
		<div>
  			<input class="checkbox" type="checkbox" id = "pressure">
  			Pressure
		</div>
		<!-- 
		<div>
  			<input class="checkbox" type="checkbox" id = "visibility">
  			Visibility
		</div>
		<div>
  			<input class="checkbox" type="checkbox" id = "UV">
  			UV Index
		</div>
		<div>
  			<input class="checkbox" type="checkbox" id = "ozone">
  			Ozone
		</div>
		<div>
  			<input class="checkbox" type="checkbox" id = "moonPhase">
  			Moon Phase
		</div>
		-->
	</form>
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
        
    
    
       
    





