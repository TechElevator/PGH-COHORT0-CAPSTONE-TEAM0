<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<c:import url="/WEB-INF/jsp/header.jsp" />



<div id="userData" data-latitude="${currentUser.defaultLatitude }" data-longitude="${currentUser.defaultLongitude}" data-units="${currentUser.defaultUnits}"></div>


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
	<h2>Select weather properties: </h2>
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
	
	<div id="chartTypeSelectionContainter">
		<label id="dropdownLabel" for="chartTypeSelection">Select a chart style: </label>
		<select id="chartTypeSelection" name="chartTypeSelection">
	  		<option disabled selected value> -- select a chart type -- </option>
	  		<option value="column">Bar Chart</option>
	  		<option value="spline">Line Plot</option>
	  		<option value="areaspline">Filled Line Plot</option>
		</select>
	</div>
	
</div>

<!-- The below pulls in the forecast visualization -->
<div>
	<h2 class = "text-center">Forecast for Pittsburgh, PA</h2>
	<div class = "weatherviz img-fluid center-block" id="forecastChart" style="width:100%; height:500px;"></div>
</div>


<!-- The below pulls in the live weather radar -->
<div class = "weatherviz img-fluid center-block" id='liveRadar' style='width: 40vw; height: 50vh;'></div>	
<script type='text/javascript' src='https://www.bing.com/api/maps/mapcontrol?key=Auegz3e_DDJPknjYh5x9_mwrHLh28eGQT7eeR4SCm6cg5vllB7rqLaFGGp3Fznk_&callback=loadMapScenario' async defer></script>

<script src = "<c:url value = "/js/createMeteogram.js"/>"></script>
<script src = "<c:url value = "/js/dashboardRadar.js"/>"></script>
<script src = "<c:url value = "/js/dashboardForecast.js"/>"></script>	
<c:import url="/WEB-INF/jsp/footer.jsp" />   
        
    
    
       
    





