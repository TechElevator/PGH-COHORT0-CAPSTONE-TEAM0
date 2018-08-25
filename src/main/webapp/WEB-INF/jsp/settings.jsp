<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<c:import url="/WEB-INF/jsp/header.jsp" />



<c:url var="formAction" value="/users/${sessionScope.currentUser.userName}/settings" />
			<form method = "POST" action = "${formAction}">
			<div class = "row">
			<div class="col-sm-3"></div>
			<div class = "col-sm-6">
			<h1>Preferences</h1>
			
			<div class = "form-group custom-select">
				<label for = "defaultViz">Select a  default visualization type:</label>
				<select name = "defaultViz" class="custom-select custom-select-lg mb-3">
				 
						<option value="spline">Line Chart</option>
						<option value="areaspline">Area Line Chart</option>
						<option value="column">Bar Chart</option>
						<option value="meteogram">WeatherViz5000&#8482;</option>
				  
				</select>
			</div>
			
			
			<div class="form-group">
				<label for="homecity">Your home city </label>
				<input type="text" id="homecity" name="homecity"class="form-control" />
			</div>
				<div class="form-group">
			<div>
				<label for="defaultCityId">Default City: </label> 
				</div>
				<input type="text" class = "ff_elem form-control" name="ff_nm_from[]" id="f_elem_city" placeHolder="Pittsburgh, PA" class="form-control" />
			</div>
			
			<div class="form-group">
				<label for="newPassword">To Change Password </label>
				<input type="text" id="newPassword" name="newPassword" class="form-control" />
			</div>
			<div class="form-group">
				<label for="confirmPassword">Please confirm your new password:</label>
				<input type="text" id="confirmPassword" name="confirmPassword" class="form-control" />
			</div>
				
			<div>
			<label for = "defaultTempUnit"> Default Temperature Unit:</label>
			<label class="checkbox-inline"><input type="radio" value="F" name = "defaultTempUnit">F &#176;</label>
			<label class="checkbox-inline"><input type="radio" value="C" name = "defaultTempUnit">C &#176;</label>
			</div>
			
			<div id ="textAlerts">
			<label for = "textAlerts">Text Alerts:</label>
			<label class="checkbox-inline" ><input id = "yesTextAlerts" type="radio" value="Yes" name = "textAlerts">Yes</label>
			<label class="checkbox-inline"><input id = "noTextAlerts" type="radio" value="No" name = "textAlerts">No</label>
					<div id = "possibleAlerts">
					
					<p>Please select the text alerts you'd like to receive:</p>
					<div class="form-check">
					  <input class="form-check-input" type="checkbox" value="" id="tornadoes" name = "tornadoes">
					  <label class="form-check-label" for="tornadoes">
					    Tornadoes
					  </label>
					</div>
					<div class="form-check">
					  <input class="form-check-input" type="checkbox" value="" id="earthquakes" name = "earthquakes">
					  <label class="form-check-label" for="earthquakes">
					    EarthQuakes
					  </label>
					</div>
					<div class="form-check">
					  <input class="form-check-input" type="checkbox" value="" id="forestFires" name = "forestFires">
					  <label class="form-check-label" for="forestFires">
					    Forest Fires
					  </label>
					</div>
					
					</div>
			</div>
			
			<div>
			<button type="submit" class="btn btn-default"><i class="fas fa-save"></i> Save Changes</button>
			</div>
			</div>
			<div class = "col-sm-3"></div>
			
			
			
			</div>
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
	 jQuery("#f_elem_city").autocomplete("option", "delay", 50);
	});
</script>
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
	           
	            jQuery("#geobytesregion").val(data.geobytesregion);
	            jQuery("#geobyteslocationcode").val(data.geobyteslocationcode);
	            jQuery("#geobytescity").val(data.geobytescity);
	            jQuery("#geobytescityid").val(data.geobytescityid);
	            jQuery("#geobytesfqcn").val(data.geobytesfqcn);
	            jQuery("#geobyteslatitude").val(data.geobyteslatitude);
	            jQuery("#geobyteslongitude").val(data.geobyteslongitude);
	            
	            jQuery("#geobytestimezone").val(data.geobytestimezone);
	           ;
	            jQuery("#geobytespopulation").val(data.geobytespopulation);
	           
	            jQuery("#geobytesmapreference").val(data.geobytesmapreference);
	          
	            }
	    );
	}
}
</script>	
<div>
<input id="geobytescity" readonly="readonly" size="30" name = "defaultCity">
</div>
<div>
<input id="geobytesregion" readonly="readonly" size="30" name = "defaultRegion">
</div>
<div>
<input id="geobyteslatitude" readonly="readonly" size="30" name = "defaultLatitude">
</div>
<div>
<input id="geobyteslongitude" readonly="readonly" size="30" name = "defaultLongitude">
</div>
<div>
<input id="geobytespopulation" readonly="readonly" size="30" name = "defaultPopulation">
</div>
<div>
<input id="geobytestimezone" readonly="readonly" size="30" name = "defaultTimezone">
</div>		
</form>
			
			

 

			
	
<script src = "<c:url value = "/js/settings.js"/>"></script>

<c:import url="/WEB-INF/jsp/footer.jsp" />