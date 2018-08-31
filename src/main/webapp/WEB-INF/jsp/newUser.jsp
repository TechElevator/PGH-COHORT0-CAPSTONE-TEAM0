<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<c:import url="/WEB-INF/jsp/header.jsp" />

<script type="text/javascript">
    $(document)
    			.ready(
                    function() {
                        $.validator.addMethod('capitals', function(thing) {
                            return thing.match(/[A-Z]/);
                        });
                        $("form")
                                .validate(
                                        {

                                            rules : {
                                                userName : {
                                                    required : true,
                                                },
                                                password : {
                                                    required : true,
                                                    minlength : 8,
                                                    capitals : true,
                                                },
                                                confirmPassword : {
                                                    required : true,
                                                    equalTo : "#password",
                                                },
                                                defaultCityId : {
                                                    required : true,
                                                },
                                                defaultVisualization : {
                                                    required : true,
                                                },
                                                defaultUnits : {
                                                    required : true,
                                                }
                                            },
                                            messages : {
                                                password : {
                                                    minlength : "Password too short, make it at least 8 characters",
                                                    capitals : "Field must contain a capital letter",
                                                },
                                                confirmPassword : {
                                                    equalTo : "Passwords do not match",
                                                },
                                                defaultCityId : {
                                                    required : "Please enter your home city.",
                                                },
                                                defaultVisualization : {
                                                    required : "Please select a default weather viz",
                                                },
                                                defaultUnits : {
                                                    required : "Please select your preferred temperature units",
                                                },
                                            },
                                            errorClass : "error"
                                        });
                    });
</script>





<c:if test="${isDuplicateUsername}">
<p>ALERT: That username is already taken.</p>
</c:if>


<c:url var="formAction" value="/users/new" />
<form action="${formAction}" method="POST"> <!-- name="form_citydetails" id="form_citydetails" enctype="multipart/form-data" -->



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

	<input type="hidden" name="CSRF_TOKEN" value="${CSRF_TOKEN}" />
	<div class="row">
		<div class="col-sm-4"></div>
		<div class="col-sm-4">
			<div class="form-group">
				<label for="userName">User Name: </label> <input type="text"
					id="userName" name="userName" placeHolder="User Name"
					class="form-control" />
			</div>
			<div class="form-group">
				<label for="password">Password: </label> <input type="password"
					id="password" name="password" placeHolder="Password"
					class="form-control" />
			</div>
			<div class="form-group">
				<label for="confirmPassword">Confirm Password: </label> 
				<input type="password" id="confirmPassword" name="confirmPassword"
					placeHolder="Re-Type Password" class="form-control" />
			</div>
			<div class="form-group">
			<div>
				<label for="defaultCityId">Default City: </label> 
				</div>
				<input type="text" class = "ff_elem form-control" name="ff_nm_from[]" id="f_elem_city" placeHolder="Pittsburgh, PA" class="form-control" />
			</div>
			<div class="form-group">
				<label for="defaultVisualization">Select a default
					visualization type:</label>
				<div>
					<select name ="defaultVisualization" class="custom-select custom-select-lg mb-3">

						<option value="spline">Line Chart</option>
						<option value="areaspline">Area Line Chart</option>
						<option value="column">Bar Chart</option>


					</select>
				</div>
			</div>
			<div class="form-group">
				<div>
					<label for="defaultUnits"> Default Temperature Unit:</label>
					<label class="checkbox-inline"><input type="radio" value="F" name="defaultUnits">F &#176;</label>
					<label class="checkbox-inline"><input type="radio" value="C" name="defaultUnits">C &#176;</label>
				</div>

			</div>




			<div>

			<div>
				<button type="submit" class="btn btn-default">Create User</button>
			</div>
		</div>
		<div class="col-sm-4"></div>
	</div>
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



<c:import url="/WEB-INF/jsp/footer.jsp" />