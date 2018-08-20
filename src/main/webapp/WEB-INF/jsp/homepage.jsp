<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<c:import url="/WEB-INF/jsp/header.jsp" />
<div>
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












<c:import url="/WEB-INF/jsp/footer.jsp" />