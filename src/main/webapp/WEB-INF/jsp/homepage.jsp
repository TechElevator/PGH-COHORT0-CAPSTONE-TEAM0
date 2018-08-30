<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<c:import url="header.jsp" />
<link rel="stylesheet" type="text/css" href="<c:url value="/css/homepage.css"/>">


<div class = "container">
	<div class = 'row'>
		 <div class="col-sm-2"></div>
		 <div class = "col-sm-8">
			 <h1>Search</h1>
			  <form name="form_citydetails" id="form_citydetails" >
			 <div class="form-group">
				<div>
					<label for="defaultCity">City: </label> 
					</div>
					<input type="text" class = "ff_elem form-control" name="ff_nm_from[]" id="f_elem_city" placeHolder="Pittsburgh, PA" class="form-control" />
				</div>
			 <div class = "form-group">
				<label for = "defaultViz">Select a  default visualization type:</label>
				<select id="chartTypeSelection" name = "defaultViz" class="custom-select custom-select-lg mb-3">
					<option value="spline">Line Chart</option>
					<option value="areaspline">Area Line Chart</option>
					<option value="column">Bar Chart</option>
				</select>
			</div>
			</form>
			</div>
		<div class="col-sm-2"></div>
	</div>
</div>




<!-- class for the form class = "d-flex justify-content-center" -->
<form  id = "weatherPropertiesForm">

<div class = "container">	
	<div class ="row">
		<div class = "col-sm-2"></div>
		<div class = "col-sm-8">
			 <h1 id = "forecastHeader" class = "text-center">Forecast for Your Location</h1>
		</div>
		<div class = "col-sm-2"></div>
	</div>		 
</div>
<div class = "container">
	<div class = "row">	
		<div class = "col-sm-1">	</div>	 	
		<div class = "col-sm-10">	
			<div id="checkboxFormContainer" class = "text-center">
			
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
				<div class="form-check form-check-inline ">
				  <input class="form-check-input" type="checkbox" id="windGust" value="option3" >
				  <label class="form-check-label" for="windGust">Peak Wind Gust</label>
				</div>	
				<div class="form-check form-check-inline">
				  <input class="form-check-input" type="checkbox" id="pressure" value="option3" >
				  <label class="form-check-label" for="pressure">Pressure</label>
				</div>
			</div>
		</div>
		<div class = "col-sm-1"></div>	
	</div>
</div>
<div class = "container">
	<div class = "row">
		<div class = "col-sm-1"></div>	
		<div class="form-check form-check-inline col-sm-8">
			<div id = "yesNoHistorical">
				<input class="form-check-input" type="checkbox" value="historical" id="historicalDateCheckbox">
				<label class="form-check-label" for="defaultCheck1">Historical Weather Search</label>
			</div>
		</div>
		<div class = "col-sm-2 justify-content-end">
			<button id = "viz-ualize" type="button" class="btn btn-default" style= "display:inline"><strong>Viz-ualize</strong></button>
		</div>
	</div>
</div>
<div class = "container">
	<div class = "row">
		<div class = "col-sm-1"></div>
		<div class = "col-sm-10">
			<div id = "historicalDateSearch">
				<label class="form-check-label"  for = "startDate">Start Date:</label>
				<input class="form-check-label"  type = "date" id = "startDate">
			</div>
		</div>	
		<div class = "col-sm-1"></div>
	</div>
</div>
		
		

</form>

			
			<!--
			<div id="chartTypeSelectionContainer" class="d-flex justify-content-center">
				
				<select class = "custom-select" id="chartTypeSelection" name="chartTypeSelection">
			  		<option selected disabled>Select A Chart Type</option>
			  		<option value="column">Bar Chart</option>
			  		<option value="spline">Line Plot</option>
			  		<option value="areaspline">Filled Line Plot</option>
				</select>
			</div>
			-->
			

		
		<!-- The below pulls in the forecast visualization -->
		<div>
			<div class = "weatherviz img-fluid center-block" id="forecastChart" style = "margin-bottom:25px;"></div>
		</div>
 

<!--  <div class="col-sm-2"></div> -->
<script type="text/javascript">
 
jQuery(function () 
 {
	 jQuery("#f_elem_city").autocomplete({
		source: function (request, response) {
		 jQuery.getJSON(
			"http://gd.geobytes.com/AutoCompleteCity?callback=?&filter=US&q="+request.term,
			function (data) {
			 response(data);
			}
		 );
		},
		minLength: 3,
		select: function (event, ui) {
		 var selectedObj = ui.item;
		 jQuery("#f_elem_city").val(selectedObj.value);
		getcitydetails(selectedObj.value);
		 return false;
		},
		open: function () {
		 jQuery(this).removeClass("ui-corner-all").addClass("ui-corner-top");
		},
		close: function () {
		 jQuery(this).removeClass("ui-corner-top").addClass("ui-corner-all");
		}
	 });
	 jQuery("#f_elem_city").autocomplete("option", "delay", 100);
	});
</script>

<div>
</div>













<script type="text/javascript">
function getcitydetails(fqcn) {

	if (typeof fqcn == "undefined") fqcn = jQuery("#f_elem_city").val();

	cityfqcn = fqcn;

	if (cityfqcn) {

	    jQuery.getJSON(
	                "http://gd.geobytes.com/GetCityDetails?callback=?&fqcn="+cityfqcn,
                     function (data) {
	            jQuery("#geobytesinternet").val(data.geobytesinternet);
	            jQuery("#geobytescountry").val(data.geobytescountry);
	            jQuery("#geobytesregionlocationcode").val(data.geobytesregionlocationcode);
	            jQuery("#geobytesregion").val(data.geobytesregion);
	            jQuery("#geobyteslocationcode").val(data.geobyteslocationcode);
	            jQuery("#geobytescity").val(data.geobytescity);
	            jQuery("#geobytescityid").val(data.geobytescityid);
	            jQuery("#geobytesfqcn").val(data.geobytesfqcn);
	            jQuery("#geobyteslatitude").val(data.geobyteslatitude);
	            jQuery("#geobyteslongitude").val(data.geobyteslongitude);
	            jQuery("#geobytescapital").val(data.geobytescapital);
	            jQuery("#geobytestimezone").val(data.geobytestimezone);
	            jQuery("#geobytesnationalitysingular").val(data.geobytesnationalitysingular);
	            jQuery("#geobytespopulation").val(data.geobytespopulation);
	            jQuery("#geobytesnationalityplural").val(data.geobytesnationalityplural);
	            jQuery("#geobytesmapreference").val(data.geobytesmapreference);
	            jQuery("#geobytescurrency").val(data.geobytescurrency);
	            jQuery("#geobytescurrencycode").val(data.geobytescurrencycode);
	            }
	    );
	}
}
</script>


<div>
<input id="geobytescity" readonly="readonly" size="30" name = "defaultCity" style = "display:none" >
</div>
<div>
<input id="geobytesregion" readonly="readonly" size="30" name = "defaultRegion" style = "display:none">
</div>
<div>
<input id="geobyteslatitude" readonly="readonly" size="30" name = "defaultLatitude" style = "display:none">
</div>
<div>
<input id="geobyteslongitude" readonly="readonly" size="30" name = "defaultLongitude" style = "display:none">
</div>
<div>
<input id="geobytespopulation" readonly="readonly" size="30" name = "defaultPopulation" style = "display:none">
</div>
<div>
<input id="geobytestimezone" readonly="readonly" size="30" name = "defaultTimezone" style = "display:none">
</div>
</form>


<script src = "<c:url value = "/js/homepage.js"/>"></script>
<script src = "<c:url value = "/js/createMeteogram.js"/>"></script>
<script src = "<c:url value = "/js/dashboardForecast.js"/>"></script>	
<script src = "<c:url value = "/js/moment.js"/>"></script>	

 
<!-- <script src = "js/homepage.js"/></script> -->


<c:import url="/WEB-INF/jsp/footer.jsp" />