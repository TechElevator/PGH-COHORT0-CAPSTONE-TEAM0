
$('#possibleAlerts').hide();
$('#yesTextAlerts').change(function(e){
	if($(this).is(':checked')){
		$("#possibleAlerts").show();
	}
});

$('#noTextAlerts').change(function(e){
	if($(this).is(':checked')){
		$("#possibleAlerts").hide();
	}
});
	
console.log('connected');

