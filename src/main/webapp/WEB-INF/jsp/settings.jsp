<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<c:import url="/WEB-INF/jsp/header.jsp" />




			<form method = "POST" action = >
			<div class = "row">
			<div class="col-sm-3"></div>
			<div class = "col-sm-6">
			<h1>Preferences</h1>
			
			<div class = "form-group custom-select">
				<label for = "defaultViz">Select a  default visualization type:</label>
				<select class="custom-select custom-select-lg mb-3">
				 
				  <option value="contourPlot" >Contour Plot</option>
				  <option value="barChart">Bar Chart</option>
				  
				</select>
			</div>
			
			
			<div class="form-group">
				<label for="homecity">Your home city </label>
				<input type="text" id="homecity" name="homecity"class="form-control" />
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
			<label class="checkbox-inline"><input type="radio" value="C" name = "defaultTempUnit">F &#176;</label>
			<label class="checkbox-inline"><input type="radio" value="F" name = "defaultTempUnit">C &#176;</label>
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
			
			
			</form>
	
<script src = "<c:url value = "/js/settings.js"/>"></script>

<c:import url="/WEB-INF/jsp/footer.jsp" />