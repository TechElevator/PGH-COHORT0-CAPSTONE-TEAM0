<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<c:import url="/WEB-INF/jsp/header.jsp" />




<h1>Your preferences: ${currentUser.userName}</h1>

<form>
<div>
<label for = "homecity">Your home city:
</label>
<input type = "text">
</div>
<div>
<label for = "password">To change password:
<input type = "text" name = "password" placeholder = "New password">
</label>
</div>
<div>
<label for  = "confirmpassword"> Please confirm your new password:
</label>
<input type = "text" name = "confirmpassword">
</div>
<div>
<label for = "defaultTempUnit"> Default Temperature Unit:</label>
<label class="checkbox-inline"><input type="radio" value="C" name = "defaultTempUnit">C &#176;</label>
<label class="checkbox-inline"><input type="radio" value="F" name = "defaultTempUnit">F &#176;</label>
</div>

<div id ="textAlerts">
<label for = "textAlerts">Text Alerts:</label>
<label class="checkbox-inline" ><input id = "yesTextAlerts" type="radio" value="Yes" name = "textAlerts">Yes</label>
<label class="checkbox-inline"><input type="radio" value="No" name = "textAlerts">No</label>
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
<button type="submit" class="btn btn-default">Save Changes</button>
</div>







</form>


<c:import url="/WEB-INF/jsp/footer.jsp" />