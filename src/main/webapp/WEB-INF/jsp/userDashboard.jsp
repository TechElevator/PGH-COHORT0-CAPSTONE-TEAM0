<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<c:import url="/WEB-INF/jsp/header.jsp" />
<link rel="stylesheet" type="text/css" href="<c:url value="/css/dashboard.css"/>">


<div id="userData" data-latitude="${currentUser.defaultLatitude }" data-longitude="${currentUser.defaultLongitude}" data-units="${currentUser.defaultUnits}" data-city="${currentUser.defaultCity }" data-region="${currentUser.defaultRegion }" data-defaultviz="${currentUser.defaultVisualization}"></div>


<%-- <div>
<p >${currentUser.userName }</p>
<p>${currentUser.defaultLatitude }</p>
<p>${currentUser.defaultLongitude }</p>
<p>${currentUser.defaultVisualization }</p>
<p>${currentUser.defaultRegion }</p>
<p>${currentUser.defaultCity }</p>
<p>${currentUser.defaultTimezone }</p>
<p>${currentUser.defaultPopulation }</p>
<p>${currentUser.defaultUnits }</p>
</div>
 --%>
 
 




 
 
<div>
<h1 class = "text-center" id = "mydashboard">My Dashboard</h1>
</div>

 <div class="container py-3" id="currentConditionsContainer">
    <div class="card currentConditionsCard col-sm-8">
    		<h1 id = "currentConditionsHeader" class = "text-center"></h1>
      <div class="row currentConditionsRow">
        <div class="col-md-6">
            <img id="dailyWeatherIcon" class = "rounded mx-auto d-block align-middle" src = "">
          </div>
          <div class="col-md-5 px-3 mx-auto d-block align-middle" >	
             <ul class="list-unstyled align-middle" id = "weatherDetails">
			<li><span class = "heavier">Temperature: </span><span id="temperatureLI"></span></li>
			<li><span class = "heavier">Precipitation: </span><span id="precipChanceLI"></span></li>
			<li><span class = "heavier">Humidity: </span><span id="humidityLI"></span></li>
			<li><span class = "heavier">Wind Speed: </span><span id="windLI"></span></li>
			<li><span class = "heavier">Wind Gusts: </span><span id="windLI2"></span></li>
			<li><span class = "heavier">Wind Direction: </span><span id="windDirectionLI"></span></li>
			<li><span class = "heavier">Cloud Cover: </span><span id="cloudCoverLI"></span></li>
			</ul>
            </div>
          </div>

        </div>
      </div>
    
<h1 id = "forecastHeader" class = "text-center">Forecast for Your Location</h1>
<div id="checkboxFormContainer">
	<form class = "d-flex justify-content-center" id = "weatherPropertiesForm">
	<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" id="hiTemp" value="option1" checked>
  <label class="form-check-label" for="hiTemp">High Temperature</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" id="loTemp" value="option2" checked>
  <label class="form-check-label" for="loTemp">Low Temperature</label>
</div>
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" id="dewPoint" value="option3" >
  <label class="form-check-label" for="dewPoint">Dew Point</label>
</div>

<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" id="precipChance" value="option3" >
  <label class="form-check-label" for="precipChance">Precipitation Chance</label>
</div>	
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" id="humidity" value="option3" >
  <label class="form-check-label" for="humidity">Humidity</label>
</div>	
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" id="cloudCover" value="option3" >
  <label class="form-check-label" for="cloudCover">Cloud Cover</label>
</div>	
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" id="meanWind" value="option3" >
  <label class="form-check-label" for="meanWind">Mean Wind Speed</label>
</div>	
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" id="windGust" value="option3" >
  <label class="form-check-label" for="windGust">Peak Wind Gust</label>
</div>	
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" id="pressure" value="option3" >
  <label class="form-check-label" for="pressure">Pressure</label>
</div>

	</form>
	
	<div id="chartTypeSelectionContainer" class="d-flex justify-content-center">
		
		<select class = "custom-select" id="chartTypeSelection" name="chartTypeSelection">
	  		<option selected disabled>Select A Chart Type</option>
	  		<option value="column">Bar Chart</option>
	  		<option value="spline">Line Plot</option>
	  		<option value="areaspline">Filled Line Plot</option>
		</select>
	</div>
	
</div>

<!-- The below pulls in the forecast visualization -->
<div>
	<div class = "weatherviz img-fluid center-block" id="forecastChart"></div>
</div>


<!-- The below pulls in the live weather radar -->
<div class = "weatherviz img-fluid" id='liveRadar'></div>	
<script type='text/javascript' src='https://www.bing.com/api/maps/mapcontrol?key=Auegz3e_DDJPknjYh5x9_mwrHLh28eGQT7eeR4SCm6cg5vllB7rqLaFGGp3Fznk_&callback=loadMapScenario' async defer></script>

<script src = "<c:url value = "/js/createMeteogram.js"/>"></script>
<script src = "<c:url value = "/js/dashboardRadar.js"/>"></script>
<script src = "<c:url value = "/js/dashboardForecast.js"/>"></script>	
<script src = "<c:url value = "/js/moment.js"/>"></script>	

<c:import url="/WEB-INF/jsp/footer.jsp" />   
        
    
    
       
    





