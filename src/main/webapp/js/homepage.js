console.log('connected');
$('#historicalDateSearch').hide();
$('#historicalDateCheckbox').change(function(e){
	if($(this).is(':checked')){
		$("#historicalDateSearch").show();
	}
});

$('#historicalDateCheckbox').change(function(e){
	if(!$(this).is(':checked')){
		$("#historicalDateSearch").hide();
	}
});
	


//
//if(('#historicalDateCheckbox').checked) {
//    $('#historicalDateSearch').show();
//} else {
//    $('#historicalDateSearch').hide();
//}