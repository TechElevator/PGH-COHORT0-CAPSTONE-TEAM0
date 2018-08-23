$( document ).ready(function() {
    console.log( "ready!" );
    
    var visType = "spline";
    var visType1 = "spline";
    var visType2 = "column";
    var forecastDays = ['Day 0', 'Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'];
    
    //Make API Call to get daily forecast data. Save that data into arrays with scope of this .js file
    //(Or, return data as a javascript object
    //var forecast = retrieveForecastFromAPI();
    
    //Parse forecast data into arrays
    //*IMPLEMENT FUNCTION FOR THIS* - Note: Might not have to do this since data comes back in JSON
    
    //Retrieve user's preferred visualization type from the database
    //var preferredVis = retrivePreferredVis(userID);
    
    //Create user's preferred visualization
    var weatherInfo1 = {
    		seriesName : "High Temperature",
    		seriesData : [70, 69, 77, 85, 83, 87, 77]
    }
    var weatherInfo2 = {
    		seriesName : "Low Temperature",
    		seriesData : [51, 52, 60, 63, 63, 65, 58]
    }
    var weatherInfo3 = {
    		seriesName : "Dew Point",
    		seriesData : [50, 50, 64, 82, 80, 74, 57]
    }
    var precipChance = {
    		seriesName : "Chance of Precipitation",
    		seriesData : [10, 12, 21, 74, 81, 32, 18]
    }
    
    //singleVariableChart(visType, forecastDays, weatherInfo1);
    
    //twoVariableChart(visType, forecastDays, weatherInfo1, weatherInfo2);
    
    //threeVariableChart(visType, forecastDays, weatherInfo1, weatherInfo2, weatherInfo3);
    
    //twoVariableDualAxis(visType1, visType2, forecastDays, weatherInfo1, precipChance);
    
    //threeVariableDualAxis(visType1, visType2, forecastDays, weatherInfo1, weatherInfo2, precipChance);
    
    fourVariableDualAxis(visType1, visType2, forecastDays, weatherInfo1, weatherInfo2, weatherInfo3, precipChance);
    
    
    
 
});



//================================================================================================
//FUNCTIONS
//================================================================================================

//API Call - Request daily forecast data from DarkSky API (forecast.io)
function retriveForecastFromAPI(lat, lon, units) {
	var endpoint = "https://api.darksky.net/forecast/7dd0bbccb34922418a87a9089a43068e/" + lat + "," + lon;
	var forecastJSON = JSON.parse(apiCallGetRequest(endpoint));
}

function apiCallGetRequest(endpoint){
    var request = new XMLHttpRequest();
    request.open("GET", endpoint ,false);
    request.send(null);							//Can remove this? see https://stackoverflow.com/questions/2499567/how-to-make-a-json-call-to-a-url
    return request.responseText;          
}

//CHART: SINGLE-VARIABLE
function singleVariableChart(visType, forecastDays, weatherInfo1) { 
    var weatherParam1 = weatherInfo1.seriesData;
    var seriesName1 = weatherInfo1.seriesName;
	var myChart = Highcharts.chart('forecastChart', {
        chart: {
            type: visType,
            zoomType: 'xy'
        },
        title: {
            text: 'Seven Day Forecast: Temperature'
        },
        xAxis: {
            categories: forecastDays
        },
        yAxis: {
            title: {
                text: 'Temperature (Fahrenheit)'
            }
        },
        series: [{
            name: seriesName1,
            data: weatherParam1
        }]
    });
};

//CHART: TWO-VARIABLE, SAME Y AXIS 
function twoVariableChart(visType, forecastDays, weatherInfo1, weatherInfo2) { 
    var weatherParam1 = weatherInfo1.seriesData;
    var weatherParam2 = weatherInfo2.seriesData;
    var seriesName1 = weatherInfo1.seriesName;
    var seriesName2 = weatherInfo2.seriesName;
	var myChart = Highcharts.chart('forecastChart', {
        chart: {
            type: visType,
            zoomtype: 'xy'
        },
        title: {
            text: 'Seven Day Forecast: Temperature'
        },
        xAxis: {
            categories: forecastDays
        },
        yAxis: {
            title: {
                text: 'Temperature (Fahrenheit)'
            }
        },
        series: [{
            name: seriesName1,
            data: weatherParam1
        }, {
            name: seriesName2,
            data: weatherParam2
        }]
    });
};

//CHART: THREE-VARIABLE,  SAME Y AXIS 
function threeVariableChart(visType, forecastDays, weatherInfo1, weatherInfo2, weatherInfo3) { 
    var weatherParam1 = weatherInfo1.seriesData;
    var weatherParam2 = weatherInfo2.seriesData;
    var weatherParam3 = weatherInfo3.seriesData;
    var seriesName1 = weatherInfo1.seriesName;
    var seriesName2 = weatherInfo2.seriesName;
    var seriesName3 = weatherInfo3.seriesName;
	var myChart = Highcharts.chart('forecastChart', {
        chart: {
            type: visType,
            zoomtype: 'xy'
        },
        title: {
            text: 'Seven Day Forecast: Temperature'
        },
        xAxis: {
            categories: forecastDays
        },
        yAxis: {
            title: {
                text: 'Temperature (Fahrenheit)'
            }
        },
        series: [{
            name: seriesName1,
            data: weatherParam1
        }, {
            name: seriesName2,
            data: weatherParam2
        }, {
            name: seriesName3,
            data: weatherParam3
        }]
    });
};

//CHART: FOUR-VARIABLE,  SAME Y AXIS 
function fourVariableChart(visType, forecastDays, weatherInfo1, weatherInfo2, weatherInfo3, weatherInfo4) { 
    var weatherParam1 = weatherInfo1.seriesData;
    var weatherParam2 = weatherInfo2.seriesData;
    var weatherParam3 = weatherInfo3.seriesData;
    var weatherParam4 = weatherInfo4.seriesData;
    var seriesName1 = weatherInfo1.seriesName;
    var seriesName2 = weatherInfo2.seriesName;
    var seriesName3 = weatherInfo3.seriesName;
    var seriesName4 = weatherInfo4.seriesName;
	var myChart = Highcharts.chart('forecastChart', {
        chart: {
            type: visType,
            zoomtype: 'xy'
        },
        title: {
            text: 'Seven Day Forecast: Temperature'
        },
        xAxis: {
            categories: forecastDays
        },
        yAxis: {
            title: {
                text: 'Temperature (Fahrenheit)'
            }
        },
        series: [{
            name: seriesName1,
            data: weatherParam1
        }, {
            name: seriesName2,
            data: weatherParam2
        }, {
            name: seriesName3,
            data: weatherParam3
        }, {
            name: seriesName4,
            data: weatherParam4
        }]
    });
};


function twoVariableDualAxis(yAxis1, yAxis2, forecastDays, weatherInfo1, weatherInfo2) {
	var weatherParam1 = weatherInfo1.seriesData;
    var weatherParam2 = weatherInfo2.seriesData;
    var seriesName1 = weatherInfo1.seriesName;
    var seriesName2 = weatherInfo2.seriesName;
	var myChart = Highcharts.chart('forecastChart', {
		chart: {
	        zoomType: 'xy'
	    },
	    title: {
	        text: 'Average Monthly Temperature and Rainfall in Tokyo'
	    },
	    xAxis: [{
	        categories: forecastDays,
	        crosshair: true
	    }],
	    yAxis: [{ // Primary yAxis
	        labels: {
	            format: '{value}°F',
	            style: {
	                color: Highcharts.getOptions().colors[1]
	            }
	        },
	        title: {
	            text: 'Temperature',
	            style: {
	                color: Highcharts.getOptions().colors[1]
	            }
	        }
	    }, { // Secondary yAxis
	        title: {
	            text: 'Rainfall',
	            style: {
	                color: Highcharts.getOptions().colors[0]
	            }
	        },
	        labels: {
	            format: '{value} mm',
	            style: {
	                color: Highcharts.getOptions().colors[0]
	            }
	        },
	        opposite: true
	    }],
	    tooltip: {
	        shared: true
	    },
	    legend: {
	        layout: 'vertical',
	        align: 'left',
	        x: 120,
	        verticalAlign: 'top',
	        y: 100,
	        floating: true,
	        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
	    },
	    series: [{
	        name: seriesName2,
	        type: yAxis2,
	        yAxis: 1,
	        data: weatherParam2,
	        tooltip: {
	            valueSuffix: ' %'
	        }
	
	    }, {
	        name: seriesName1,
	        type: yAxis1,
	        data: weatherParam1,
	        tooltip: {
	            valueSuffix: ' °F'
	        }
	    }]
	});
};

function threeVariableDualAxis(yAxis1, yAxis2, forecastDays, weatherInfo1, weatherInfo2, weatherInfo3) {
	var weatherParam1 = weatherInfo1.seriesData;
    var weatherParam2 = weatherInfo2.seriesData;
    var weatherParam3 = weatherInfo3.seriesData;
    var seriesName1 = weatherInfo1.seriesName;
    var seriesName2 = weatherInfo2.seriesName;
    var seriesName3 = weatherInfo3.seriesName;
	var myChart = Highcharts.chart('forecastChart', {
		chart: {
	        zoomType: 'xy'
	    },
	    title: {
	        text: 'Average Monthly Temperature and Rainfall in Tokyo'
	    },
	    xAxis: [{
	        categories: forecastDays,
	        crosshair: true
	    }],
	    yAxis: [{ // Primary yAxis
	        labels: {
	            format: '{value}°F',
	            style: {
	                color: Highcharts.getOptions().colors[1]
	            }
	        },
	        title: {
	            text: 'Temperature',
	            style: {
	                color: Highcharts.getOptions().colors[1]
	            }
	        }
	    }, { // Secondary yAxis
	        title: {
	            text: 'Rainfall',
	            style: {
	                color: Highcharts.getOptions().colors[0]
	            }
	        },
	        labels: {
	            format: '{value} mm',
	            style: {
	                color: Highcharts.getOptions().colors[0]
	            }
	        },
	        opposite: true
	    }],
	    tooltip: {
	        shared: true
	    },
	    legend: {
	        layout: 'vertical',
	        align: 'left',
	        x: 120,
	        verticalAlign: 'top',
	        y: 100,
	        floating: true,
	        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
	    },
	    series: [{
	        name: seriesName3,
	        type: yAxis2,
	        yAxis: 1,
	        data: weatherParam3,
	        tooltip: {
	            valueSuffix: ' %'
	        }
	
	    }, {
	        name: seriesName1,
	        type: yAxis1,
	        data: weatherParam1,
	        tooltip: {
	            valueSuffix: ' °F'
	        }
	    }, {
	        name: seriesName2,
	        type: yAxis1,
	        data: weatherParam2,
	        tooltip: {
	            valueSuffix: ' °F'
	        }
	    }]
	});
};

function fourVariableDualAxis(yAxis1, yAxis2, forecastDays, weatherInfo1, weatherInfo2, weatherInfo3, weatherInfo4) {
	var weatherParam1 = weatherInfo1.seriesData;
    var weatherParam2 = weatherInfo2.seriesData;
    var weatherParam3 = weatherInfo3.seriesData;
    var weatherParam4 = weatherInfo4.seriesData;
    var seriesName1 = weatherInfo1.seriesName;
    var seriesName2 = weatherInfo2.seriesName;
    var seriesName3 = weatherInfo3.seriesName;
    var seriesName4 = weatherInfo4.seriesName;
	var myChart = Highcharts.chart('forecastChart', {
		chart: {
	        zoomType: 'xy'
	    },
	    title: {
	        text: 'Average Monthly Temperature and Rainfall in Tokyo'
	    },
	    xAxis: [{
	        categories: forecastDays,
	        crosshair: true
	    }],
	    yAxis: [{ // Primary yAxis
	        labels: {
	            format: '{value}°F',
	            style: {
	                color: Highcharts.getOptions().colors[1]
	            }
	        },
	        title: {
	            text: 'Temperature',
	            style: {
	                color: Highcharts.getOptions().colors[1]
	            }
	        }
	    }, { // Secondary yAxis
	        title: {
	            text: 'Rainfall',
	            style: {
	                color: Highcharts.getOptions().colors[0]
	            }
	        },
	        labels: {
	            format: '{value} mm',
	            style: {
	                color: Highcharts.getOptions().colors[0]
	            }
	        },
	        opposite: true
	    }],
	    tooltip: {
	        shared: true
	    },
	    legend: {
	        layout: 'vertical',
	        align: 'left',
	        x: 120,
	        verticalAlign: 'top',
	        y: 100,
	        floating: true,
	        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
	    },
	    series: [{
	        name: seriesName4,
	        type: yAxis2,
	        yAxis: 1,
	        data: weatherParam4,
	        tooltip: {
	            valueSuffix: ' %'
	        }
	
	    }, {
	        name: seriesName1,
	        type: yAxis1,
	        data: weatherParam1,
	        tooltip: {
	            valueSuffix: ' °F'
	        }
	    }, {
	        name: seriesName2,
	        type: yAxis1,
	        data: weatherParam2,
	        tooltip: {
	            valueSuffix: ' °F'
	        }
	    }, {
	        name: seriesName3,
	        type: yAxis1,
	        data: weatherParam3,
	        tooltip: {
	            valueSuffix: ' °F'
	        }
	    }]
	});
};






	