<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<c:import url="/WEB-INF/jsp/header.jsp" />

<script type="text/javascript">
	$(document).ready(function () {
		$.validator.addMethod('capitals', function(thing){
			return thing.match(/[A-Z]/);
		});
		$("form").validate({
			
			rules : {
				userName : {
					required : true
				},
				password : {
					required : true,
					minlength: 8,
					capitals: true,
				},
				confirmPassword : {
					required : true,		
					equalTo : "#password"  
				},
				defaultCityId: {
					required: true,
				},
				defaultViz: {
					required: true,
				}
			},
			messages : {			
				password: {
					minlength: "Password too short, make it at least 15 characters",
					capitals: "Field must contain a capital letter",
				},
				confirmPassword : {
					equalTo : "Passwords do not match"
				},
				defaultCityId : {
					required: "Please enter your home city."
				},
				defaultViz: {
					required: "Please select a default weather viz"
				},
			},
			errorClass : "error"
		});
	});
</script>

<c:url var="formAction" value="/users" />
<form method="POST" action="${formAction}">
<input type="hidden" name="CSRF_TOKEN" value="${CSRF_TOKEN}"/>
	<div class="row">
		<div class="col-sm-4"></div>
		<div class="col-sm-4">
			<div class="form-group">
				<label for="userName">User Name: </label>
				<input type="text" id="userName" name="userName" placeHolder="Tom Medvitz" class="form-control" />
			</div>
			<div class="form-group">
				<label for="password">Password: </label>
				<input type="password" id="password" name="password" placeHolder="Password" class="form-control" />
			</div>
			<div class="form-group">
				<label for="confirmPassword">Confirm Password: </label>
				<input type="password" id="confirmPassword" name="confirmPassword" placeHolder="Re-Type Password" class="form-control" />	
			</div>
			<div class="form-group">
				<label for="defaultCityId">Default City: </label>
				<input type="text" id="defaultCityId" name="defaultCityId" placeHolder="Pittsburgh, PA" class = "form-control" />	
			</div>
			<div class = "form-group">
				<label for = "defaultViz">Select a  default visualization type:</label>
				<div>
					<select class="custom-select custom-select-lg mb-3">
					 
					  <option value="contourPlot" >Contour Plot</option>
					  <option value="barChart">Bar Chart</option>
					  
					</select>
					</div>
			</div> 
			
			
		
			
			
			<div>
			<button type="submit" class="btn btn-default">Create User</button>
			</div>
		</div>
		<div class="col-sm-4"></div>
	</div>
</form>
		
<c:import url="/WEB-INF/jsp/footer.jsp" />