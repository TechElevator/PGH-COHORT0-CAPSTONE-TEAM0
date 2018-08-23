	$(function () { 
	    var myChart = Highcharts.chart('forecastChart', {
	        chart: {
	            type: 'areaspline'
	        },
	        title: {
	            text: 'Seven Day Forecast: Temperature'
	        },
	        xAxis: {
	            categories: ['Today', 'Tomorrow', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday']
	        },
	        yAxis: {
	            title: {
	                text: 'Temperature (Fahrenheit)'
	            }
	        },
	        series: [{
	            name: 'Highs',
	            data: [70, 69, 77, 85, 83, 87, 77]
	        }, {
	            name: 'Lows',
	            data: [51, 52, 60, 63, 63, 65, 58]
	        }]
	    });
	});