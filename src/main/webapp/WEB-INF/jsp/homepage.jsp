<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<c:import url="header.jsp" />
<link rel="stylesheet" type="text/css" href="<c:url value="/css/homepage.css"/>">


 
 <form action="" method="post" name="form_citydetails" id="form_citydetails" >
 <div class="col-sm-3"></div>
 <div class = "col-sm-6">
 <h1>Search</h1>
 <div class="form-group">
			<div>
				<label for="defaultCity">City: </label> 
				</div>
				<input type="text" class = "ff_elem form-control" name="ff_nm_from[]" id="f_elem_city" placeHolder="Pittsburgh, PA" class="form-control" />
			</div>
 <div class = "form-group">
		<label for = "defaultViz">Select a  default visualization type:</label>
		<select name = "defaultViz" class="custom-select custom-select-lg mb-3">
		 
				<option value="spline">Line Chart</option>
				<option value="areaspline">Area Line Chart</option>
				<option value="column">Bar Chart</option>
				<option value="meteogram">WeatherViz5000&#8482;</option>
		  
		</select>
	</div>
	
		<div class="form-check">
		<label class="form-check-label" for="defaultCheck1">Historical Weather Search:</label>
		  <input class="form-check-input" type="checkbox" value="historical" id="historicalDateCheckbox">
		  
		</div>
		
		<div id = "historicalDateSearch">
		<label class="form-check-label"  for = "startDate">Start Date:</label>
		<input class="form-check-label"  type = "date" id = "startDate">
		
		
		<label for = "endDate">End Date:</label>
		<input class="form-check-label"  type = "date" id = "endDate">
		
		</div>
		
 
		 <div>
			<button type="submit" class="btn btn-default"><i class="fas fa-save"></i> Save Changes</button>
		</div>
		</div>
 
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
 

 <div class="col-sm-3"></div>
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



</form>











<script src = "<c:url value = "/js/homepage.js"/>"></script>

 
<!-- <script src = "js/homepage.js"/></script> -->


<c:import url="/WEB-INF/jsp/footer.jsp" />