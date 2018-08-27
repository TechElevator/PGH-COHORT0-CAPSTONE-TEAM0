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
 
 <div>
	<button type="submit" class="btn btn-default"><i class="fas fa-save"></i> Save Changes</button>
</div>
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
<script src = "<c:url value = "/js/textautocomplete.js"/>"></script>


<c:import url="/WEB-INF/jsp/footer.jsp" />