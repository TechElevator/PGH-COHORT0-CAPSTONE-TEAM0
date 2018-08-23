<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<c:import url="header.jsp" />
<div>
<div>
<input type = "text" name = "google" id = "google" placeholder = "google search" >
</div>
<div>
<label for = "visualization_type">Enter a city:</label>
<input type = "text"  name = "city">
</div>




<div>
<label for = "visualization_type">Select a visualization type:</label>
<select name = "visualization_type">
<option value = "Contour Plot">Contour Plot</option>
<option value = "Bar Chart">Bar Chart</option>
</select>
</div>

<button type="submit" class="btn btn-default">Visualize</button>
</div>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js" type="text/javascript"></script>
<link rel="stylesheet" href="http://ajax.aspnetcdn.com/ajax/jquery.ui/1.10.3/themes/flick/jquery-ui.css" />
 <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
<style type="text/css">
.ui-menu .ui-menu-item a,.ui-menu .ui-menu-item a.ui-state-hover, .ui-menu .ui-menu-item a.ui-state-active {
	font-weight: normal;
	margin: -1px;
	text-align:left;
	font-size:14px;
	}
.ui-autocomplete-loading { background: white url("/images/ui-anim_basic_16x16.gif") right center no-repeat; }
</style>
 
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
<form action="" method="post" name="form_citydetails" id="form_citydetails" enctype="multipart/form-data" onsubmit="return false;">
<p><b>Please enter</b> your city here to see it work. <input class="ff_elem" type="text" name="ff_nm_from[]" value="" id="f_elem_city"/>
</form>










 
<script src = "<c:url value = "/js/homepage.js"/>"></script>
<c:import url="/WEB-INF/jsp/footer.jsp" />