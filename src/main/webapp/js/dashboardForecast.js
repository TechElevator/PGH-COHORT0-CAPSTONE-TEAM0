var visType = $("#userData").data("defaultviz");

$( document ).ready(function() {
	
	//FOR DEMO PURPOSES: DUMMY DATA==========================================================
    var hiTemp = {
    		seriesName : "High Temperature",
    		seriesData : [70, 69, 77, 85, 83, 87, 77],
    		type : "temperature",
    		axisLabel : "Temperature",
    		unitsImperial : "F",
    		unitsSI : "C"
    }
    var loTemp = {
    		seriesName : "Low Temperature",
    		seriesData : [51, 52, 60, 63, 63, 65, 58],
    		type : "temperature",
    		axisLabel : "Temperature",
    		unitsImperial : "F",
    		unitsSI : "C"
    }
    var dewPoint = {
    		seriesName : "Dew Point",
    		seriesData : [50, 50, 64, 82, 80, 74, 57],
    		type : "temperature",
    		axisLabel : "Temperature",
    		unitsImperial : "F",
    		unitsSI : "C"
    }
    var precipChance = {
    		seriesName : "Chance of Precipitation",
    		seriesData : [10, 12, 21, 74, 81, 32, 18],
    		type : "percentage",
    		axisLabel : "Percentage",
    		unitsImperial : "%",
    		unitsSI : "%"
    }
    var humidity = {
    		seriesName : "Humidity",
    		seriesData : [45, 45, 52, 74, 76, 72, 52],
    		type : "percentage",
    		axisLabel : "Percentage",
    		unitsImperial : "%",
    		unitsSI : "%"
    }
    var cloudCoverage = {
    		seriesName : "Cloud Coverage",
    		seriesData : [2, 2, 65, 72, 61, 40, 38],
    		type : "percentage",
    		axisLabel : "Percentage",
    		unitsImperial : "%",
    		unitsSI : "%"
    }
    var meanWind = {
    		seriesName : "Mean Wind",
    		seriesData : [1, 1, 3, 3, 3, 1, 2],
    		type : "velocity",
    		axisLabel : "Velocity",
    		unitsImperial : "mph",
    		unitsSI : "m/s"
    }
    var windGust = {
    		seriesName : "Wind Gust",
    		seriesData : [3, 3, 6, 8, 4, 3, 3],
    		type : "velocity",
    		axisLabel : "Velocity",
    		unitsImperial : "mph",
    		unitsSI : "m/s"
    }
    var pressure = {
    		seriesName : "Pressure",
    		seriesData : [1015, 1014, 1004, 999, 1001, 1011, 1013],
    		type : "pressure",
    		axisLabel : "Pressure",
    		unitsImperial : "mb",			//Pressure will always be reported in millibars, mb
    		unitsSI : "mb"
    }
    
    var currentWeather = {
    		summary : "Partly Cloudy",
    		precipProbability : 24,
    		temperature : 74,
    		dewPoint : 50,
    		humidity : 47,
    		pressure : 1021,
    		windSpeed : 2.35,
    		windGust : 4.89,
    		windBearing : 344,
    		cloudCover : 56,
    		uvIndex : 7,
    		visibility : 10, 
    		ozone : 320
    }
    
    //outputCurrentConditions(currentWeather);
    //END DUMMY DATA================================================================================
	
    
	//Make API Call to get daily forecast data from our REST API
    retrieveForecastFromAPI(39.00,-79.99,'si');
    retrieveCurrentConditionsFromAPI(39.00,-79.99,'si');
    
  //Make API Call to get daily forecast data from our REST API
  //var currentConditionsFromAPI = retrieveForecastFromAPI(39.00,-79.99,'si');
    
    
    
    
	
    /*
    var currentWeather = {
    		summary : currentConditionsFromAPI.summary[0],
    		precipProbability : currentConditionsFromAPI.precipChance[0],
    		temperature : currentConditionsFromAPI.highs[0],
    		humidity : currentConditionsFromAPI.humidity[0],
    		windSpeed : currentConditionsFromAPI.meanWind[0],
    		windGust : currentConditionsFromAPI.gustWind[0],
    		windBearing : currentConditionsFromAPI.windDirection[0],
    		cloudCover : currentConditionsFromAPI.cloudCover[0],
    }
    */
    
    //On every checkbox click, chart will be created
    $("input:checkbox").change(function() {
    		
    		if ($("#historicalDateCheckbox").is(':checked')) {
    			
    			var startDate = $('#startDate').val();
    			//console.log('START DATE: ');
    			//console.log(startDate);
    			
    			var formattedStartDate = startDate.replace(/-/g, '.');
    			//console.log(formattedStartDate);
    			var dateObj = new Date(formattedStartDate);
    			console.log(dateObj.getTime() / 1000);
    			var unixTime = dateObj.getTime() / 1000;
    			
    			retrieveHistoricalFromAPI(39.00,-79.99, unixTime, 'si');
    			
    		} else {
    			retrieveForecastFromAPI(39.00,-79.99,'si');
    		}
    	
    	
    			  		
    });
    
    //On every change of the desired chart type, chart will be created
    $("#chartTypeSelection").change(function(){
    		visType = $('#chartTypeSelection option:selected').val();
    		retrieveForecastFromAPI(39.00,-79.99,'si');
    });
    
    
});



//================================================================================================
//FUNCTIONS
//================================================================================================

//Chart creation
function initiateChartCreation(visType, forecastDays, weatherParameters, weatherData, weatherSelections) {
	//console.log("Right after initiateChartCreation: ");
	//console.log(weatherData);
	//console.log(weatherSelections);
	//console.log(weatherParameters);
	//console.log(forecastDays);
	//console.log(visType);
	
	var chartCategory;
	var selectedContent;
	var chartData = [];
	var weatherSelections = determineSelected();
	var categoryAndContent = determineChartCategoryAndContent(weatherParameters, weatherSelections);
	chartCategory = categoryAndContent.shift();
	selectedContent = categoryAndContent;
	
	for (i = 0; i < selectedContent[0].length; i ++) {
		chartData[i] = weatherData[weatherParameters.indexOf(selectedContent[0][i])];
		////console.log("i is; " + i);
	}
	
	//console.log("chartData being passed in to createChart:");
	//console.log(chartData);
	//console.log(chartCategory);
	
    createChart(visType, forecastDays, chartCategory, chartData, weatherData, weatherSelections);
}

//API Call - Request daily forecast data from DarkSky API (forecast.io)
function retrieveForecastFromAPI(lat, lon, units) {
	var endpoint = "http://localhost:8080/capstone/API/dailyForecast/40.455305,-80.019397";
	
	var dataJSON = apiCallForDailyForecastWithAJAX(endpoint);
	//console.log("dataJSON is: ");
	//console.log(dataJSON);
	
	return dataJSON;
	
}

//API Call - Request current conditions from DarkSky API (forecast.io)
function retrieveCurrentConditionsFromAPI(lat, lon, units) {
	var endpoint = "http://localhost:8080/capstone/API/current/40.455305,-80.019397";
	
	var dataJSON = apiCallForCurrentConditionsWithAJAX(endpoint);
	//console.log("dataJSON is: ");
	//console.log(dataJSON);
	
	return dataJSON;
	
}

//API Call - Request historical conditions from DarkSky API (forecast.io)
function retrieveHistoricalFromAPI(lat, lon, unixTime, units) {
	var endpoint = "http://localhost:8080/capstone/API/historical/40.455305,-80.019397,978325200";
	
	var dataJSON = apiCallForCurrentConditionsWithAJAX(endpoint);
	//console.log("dataJSON is: ");
	//console.log(dataJSON);
	
	return dataJSON;
	
}

//AJAX call to our REST service for daily forecast
function apiCallForDailyForecastWithAJAX(endpoint) {
	return $.ajax({
		url: endpoint,
		type:"GET",
		success: function(result) {
			//console.log("result is: ");
			//console.log(result);
			//console.log("now calling function to continue the program");
			
			//Trigger the rest of the program to continue
			triggerForecastChartCreation(result);
			
		}
	});
}

//AJAX call to our REST service for current conditions
function apiCallForCurrentConditionsWithAJAX(endpoint) {
	return $.ajax({
		url: endpoint,
		type:"GET",
		success: function(result) {
			//console.log("result is: ");
			//console.log(result);
			//console.log("now calling function to continue the program");
			
			//Trigger the creation of the forecast visualization
			triggerCurrentConditions(result);
			
		}
	});
}

function triggerForecastChartCreation(dataFromAPI) {
	
	var hiTemp = {
    		seriesName : "High Temperature",
    		seriesData : dataFromAPI.highs,
    		type : "temperature",
    		axisLabel : "Temperature",
    		unitsImperial : "F",
    		unitsSI : "C"
    }
    var loTemp = {
    		seriesName : "Low Temperature",
    		seriesData : dataFromAPI.lows,
    		type : "temperature",
    		axisLabel : "Temperature",
    		unitsImperial : "F",
    		unitsSI : "C"
    }
    var dewPoint = {
    		seriesName : "Dew Point",
    		seriesData : dataFromAPI.dewPoint,
    		type : "temperature",
    		axisLabel : "Temperature",
    		unitsImperial : "F",
    		unitsSI : "C"
    }
    var precipChance = {
    		seriesName : "Chance of Precipitation",
    		seriesData : dataFromAPI.precipChance,
    		type : "percentage",
    		axisLabel : "Percentage",
    		unitsImperial : "%",
    		unitsSI : "%"
    }
    var humidity = {
    		seriesName : "Humidity",
    		seriesData : dataFromAPI.humidity,
    		type : "percentage",
    		axisLabel : "Percentage",
    		unitsImperial : "%",
    		unitsSI : "%"
    }
    var cloudCoverage = {
    		seriesName : "Cloud Coverage",
    		seriesData : dataFromAPI.cloudCover,
    		type : "percentage",
    		axisLabel : "Percentage",
    		unitsImperial : "%",
    		unitsSI : "%"
    }
    var meanWind = {
    		seriesName : "Mean Wind",
    		seriesData : dataFromAPI.meanWind,
    		type : "velocity",
    		axisLabel : "Velocity",
    		unitsImperial : "mph",
    		unitsSI : "m/s"
    }
    var windGust = {
    		seriesName : "Wind Gust",
    		seriesData : dataFromAPI.gustWind,
    		type : "velocity",
    		axisLabel : "Velocity",
    		unitsImperial : "mph",
    		unitsSI : "m/s"
    }
    var pressure = {
    		seriesName : "Pressure",
    		seriesData : dataFromAPI.pressure,
    		type : "pressure",
    		axisLabel : "Pressure",
    		unitsImperial : "mb",			//Pressure will always be reported in millibars, mb
    		unitsSI : "mb"
    }
    
    var weatherData = [hiTemp, loTemp, dewPoint, precipChance, humidity, cloudCoverage, meanWind, windGust, pressure];
    var weatherSelections = determineSelected();
    
    ////console.log("In doThings, weatherData is: ");
    ////console.log(weatherData);
    
    //var visType = $("#userData").data("defaultviz");
    //var visType = "column";
    var defaultVisType = visType;
    var visTypeWasChanged = false;
    var visType1 = "spline";
    var visType2 = "column";
    var forecastDays = ['Day 0', 'Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'];
    var weatherParameters = ["hiTemp", "loTemp", "dewPoint", "precipChance", "humidity", "cloudCoverage", "meanWind", "windGust", "pressure"];
    
    //On first page load, chart will be created
    //DEFINE VIS TYPE HERE BASED ON USER'S PREFERENCE, SAVED IN DATABASE
    initiateChartCreation(visType, forecastDays, weatherParameters, weatherData, weatherSelections);
    
}

function triggerCurrentConditions(dataFromAPI) {
	
	//console.log("in triggerCurrentConditions");
	//console.log(dataFromAPI);
	
	var currentWeather = {
    		summary : "Partly Cloudy",
    		precipProbability : 24,
    		temperature : 74,
    		dewPoint : 50,
    		humidity : 47,
    		pressure : 1021,
    		windSpeed : 2.35,
    		windGust : 4.89,
    		windBearing : 344,
    		cloudCover : 56,
    		uvIndex : 7,
    		visibility : 10, 
    		ozone : 320
    }
	
	var currentWeather = {
    		//summary : dataFromAPI.summary[0],
    		precipProbability : dataFromAPI.precipChance[0],
    		temperature : dataFromAPI.highs[0],
    		humidity : dataFromAPI.humidity[0] * 100,
    		windSpeed : dataFromAPI.meanWind[0],
    		windGust : dataFromAPI.gustWind[0],
    		windBearing : dataFromAPI.windDirection[0],
    		cloudCover : dataFromAPI.cloudCover[0] * 100,
    }
	
	//console.log("current weather: ");
	//console.log(currentWeather);
	
	outputCurrentConditions(currentWeather);
	
}

function textCurrentWeather(currentWeather){
	
	
	
	
	
	
}


/*
//PARSE FORECAST DATA FROM JSON
function parseDailyForecastDataFromAPI(dataFromAPI) {
	
	currentConditions = dataFromAPI.currently;
	forecastDaily = dataFromAPI.daily;

	return [currentConditions, daily];
	
}
*/

//CHART: SINGLE-VARIABLE
function singleVariableChart(visType, forecastDays, weatherInfo1) { 
    
	var weatherParam1 = weatherInfo1.seriesData;
    var seriesName1 = weatherInfo1.seriesName;
    var yAxis = weatherInfo1.axisLabel + " (" + weatherInfo1.unitsImperial + ")";
	var myChart = Highcharts.chart('forecastChart', {
        chart: {
            type: visType,
            zoomType: 'xy',
            marginTop: 40 ,
            backgroundColor:'rgba(255, 255, 255, 0.0)'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: forecastDays
        },
        yAxis: {
            title: {
                text: yAxis
            }
        },
        series: [{
            name: seriesName1,
            data: weatherParam1,
            color: '#025ef2',
	        tooltip: {
	            valueSuffix: '{value} ' + weatherInfo1.unitsImperial
	        }
        }]
    });
};

//CHART: TWO-VARIABLE, SAME Y AXIS 
function twoVariableChart(visType, forecastDays, weatherInfo1, weatherInfo2) { 
    
	//console.log("in plot function: ");
	//console.log(weatherInfo1);
	//console.log(weatherInfo2);
	
	var weatherParam1 = weatherInfo1.seriesData;
    var weatherParam2 = weatherInfo2.seriesData;
    var seriesName1 = weatherInfo1.seriesName;
    var seriesName2 = weatherInfo2.seriesName;
    var yAxis = weatherInfo1.axisLabel + " (" + weatherInfo1.unitsImperial + ")";
	var myChart = Highcharts.chart('forecastChart', {
        chart: {
            type: visType,
            zoomType: 'xy',
            marginTop: 40 ,
            backgroundColor:'rgba(255, 255, 255, .0)'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: forecastDays
        },
        yAxis: {
            title: {
                text: yAxis
            }
        },
        series: [{
            name: seriesName1,
            data: weatherParam1,
            color: '#025ef2',
	        tooltip: {
	            valueSuffix: '{value} ' + weatherInfo1.unitsImperial
	        }
        }, {
            name: seriesName2,
            data: weatherParam2,
            color: '#000105',
	        tooltip: {
	            valueSuffix: '{value} ' + weatherInfo2.unitsImperial
	        }
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
    var yAxis = weatherInfo1.axisLabel + " (" + weatherInfo1.unitsImperial + ")";
	var myChart = Highcharts.chart('forecastChart', {
        chart: {
            type: visType,
            zoomType: 'xy',
            marginTop: 40 ,
            backgroundColor:'rgba(255, 255, 255, 0.0)'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: forecastDays
        },
        yAxis: {
            title: {
                text: yAxis
            }
        },
        series: [{
            name: seriesName1,
            data: weatherParam1,
            color: '#025ef2',
	        tooltip: {
	            valueSuffix: '{value} ' + weatherInfo1.unitsImperial
	        }
        }, {
            name: seriesName2,
            data: weatherParam2,
            color: 'red',
	        tooltip: {
	            valueSuffix: '{value} ' + weatherInfo2.unitsImperial
	        }
        }, {
            name: seriesName3,
            data: weatherParam3,
            color: 'black',
	        tooltip: {
	            valueSuffix: '{value} ' + weatherInfo3.unitsImperial
	        }
        }]
    });
};

//CHART: TWO VARIABLE, DUAL AXIS
function twoVariableDualAxis(yAxis1, yAxis2, forecastDays, weatherInfo1, weatherInfo2) {
	var weatherParam1 = weatherInfo1.seriesData;
    var weatherParam2 = weatherInfo2.seriesData;
    var seriesName1 = weatherInfo1.seriesName;
    var seriesName2 = weatherInfo2.seriesName;
    var yAxis1Type = "spline";
    var yAxis2Type = "column";
    
    
	var myChart = Highcharts.chart('forecastChart', {
		chart: {
	        zoomType: 'xy',
            marginTop: 40 ,
            backgroundColor:'rgba(255, 255, 255, 0.0)'
	    },
	    title: {
	        text: ''
	    },
	    xAxis: [{
	        categories: forecastDays,
	        crosshair: true
	    }],
	    yAxis: [{ // Primary yAxis
	        labels: {
	            format: '{value} ' + weatherInfo1.unitsImperial,
	            style: {
	                color: Highcharts.getOptions().colors[1]
	            }
	        },
	        title: {
	            text: weatherInfo1.axisLabel,
	            style: {
	                color: Highcharts.getOptions().colors[1]
	            }
	        }
	    }, { // Secondary yAxis
	        title: {
	            text: weatherInfo2.axisLabel,
	            style: {
	                color: Highcharts.getOptions().colors[0]
	            }
	        },
	        labels: {
	            format: '{value} ' + weatherInfo2.unitsImperial,
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
	        backgroundColor: 'rgba(255, 255, 255, 0.7)',
	        borderColor: 'rgba(255, 255, 255, 0.7)'
	    },
	    series: [{
	        name: seriesName2,
	        type: yAxis2Type,
	        yAxis: 1,
	        data: weatherParam2,
	        color: 'black',
	        tooltip: {
	            valueSuffix: '{value} ' + weatherInfo2.unitsImperial
	        }
	
	    }, {
	        name: seriesName1,
	        type: yAxis1Type,
	        data: weatherParam1,
            color: '#025ef2',
	        tooltip: {
	            valueSuffix: '{value} ' + weatherInfo1.unitsImperial
	        }
	    }]
	});
};

//CHART: THREE VARIABLE, DUAL AXIS
function threeVariableDualAxis(yAxis1, yAxis2, forecastDays, weatherInfo1, weatherInfo2, weatherInfo3) {
	var weatherParam1 = weatherInfo1.seriesData;
    var weatherParam2 = weatherInfo2.seriesData;
    var weatherParam3 = weatherInfo3.seriesData;
    var seriesName1 = weatherInfo1.seriesName;
    var seriesName2 = weatherInfo2.seriesName;
    var seriesName3 = weatherInfo3.seriesName;
    //var yAxis1Type = "spline";
    //var yAxis2Type = "column";
    
    //Determine which values go on which axes (precedence should go temperature, pressure, velocity, percentage)
    var types = [weatherInfo1.type, weatherInfo2.type, weatherInfo3.type];
 
    //Determine axes
    var allData = [weatherInfo1, weatherInfo2, weatherInfo3];
    
    if (yAxis1 == "temperature") {
    		
    		for (i = 0; i < allData.length; i ++) {
    			////console.log(allData[i].type);
    			if (allData[i].type == yAxis1) {
    				allData[i].chartType = "spline";
    			} else {
    				allData[i].chartType = "column";
    			}
    		}
    		////console.log("Ye olde data: ");
    		////console.log(allData[i]);
    } else if (yAxis1 == "pressure") {
    		
    	for (i = 0; i < allData.length; i ++) {
			////console.log(allData[i].type);
			if (allData[i].type == yAxis1) {
				allData[i].chartType = "spline";
			} else {
				allData[i].chartType = "column";
			}
		}
		////console.log("Ye olde data: ");
		////console.log(allData[i]);
    } else {
    		
    		for (i = 0; i < allData.length; i ++) {
			////console.log(allData[i].type);
			if (allData[i].type == yAxis1) {
				allData[i].chartType = "spline";
			} else {
				allData[i].chartType = "column";
			}
		}
		////console.log("Ye olde data: ");
		////console.log(allData[i]);
    	
    }
    
    var chartType1 = weatherInfo1.chartType;
    var chartType2 = weatherInfo2.chartType;
    var chartType3 = weatherInfo3.chartType;
    
	var myChart = Highcharts.chart('forecastChart', {
		chart: {
	        zoomType: 'xy',
            marginTop: 40 ,
            backgroundColor:'rgba(255, 255, 255, 0.0)'
	    },
	    title: {
	        text: ''
	    },
	    xAxis: [{
	        categories: forecastDays,
	        crosshair: true
	    }],
	    yAxis: [{ // Primary yAxis
	        labels: {
	            format: '{value} ' + weatherInfo1.unitsImperial,
	            style: {
	                color: Highcharts.getOptions().colors[1]
	            }
	        },
	        title: {
	            text: weatherInfo1.axisLabel,
	            style: {
	                color: Highcharts.getOptions().colors[1]
	            }
	        }
	    }, { // Secondary yAxis
	        title: {
	            text: weatherInfo3.axisLabel,
	            style: {
	                color: Highcharts.getOptions().colors[0]
	            }
	        },
	        labels: {
	            format: '{value} ' + weatherInfo3.unitsImperial,
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
	        backgroundColor: 'rgba(255, 255, 255, 0.7)',
	        borderColor: 'rgba(255, 255, 255, 0.7)'
	    },
	    series: [{
	        name: seriesName3,
	        type: chartType3,
	        yAxis: 1,
	        data: weatherParam3,
	        color: 'black',
	        tooltip: {
	            valueSuffix: '{value} ' + weatherInfo3.unitsImperial
	        }
	
	    }, {
	        name: seriesName2,
	        type: chartType2,
	        data: weatherParam2,
	        color: 'red',
	        tooltip: {
	            valueSuffix: '{value} ' + weatherInfo2.unitsImperial
	        }
	    }, {
	        name: seriesName1,
	        type: chartType1,
	        data: weatherParam1,
            color: '#025ef2',
	        tooltip: {
	            valueSuffix: '{value} ' + weatherInfo1.unitsImperial
	        }
	    }]
	});
};


//CHART: FOUR VARIABLE, DUAL AXIS
function fourVariableDualAxis(yAxis1, yAxis2, forecastDays, weatherInfo1, weatherInfo2, weatherInfo3, weatherInfo4) {
	var weatherParam1 = weatherInfo1.seriesData;
    var weatherParam2 = weatherInfo2.seriesData;
    var weatherParam3 = weatherInfo3.seriesData;
    var weatherParam4 = weatherInfo4.seriesData;
    var seriesName1 = weatherInfo1.seriesName;
    var seriesName2 = weatherInfo2.seriesName;
    var seriesName3 = weatherInfo3.seriesName;
    var seriesName4 = weatherInfo4.seriesName;
    
    
  //Determine which values go on which axes (precedence should go temperature, pressure, velocity, percentage)
    var types = [weatherInfo1.type, weatherInfo2.type, weatherInfo3.type, weatherInfo4.type];
 
    //Determine axes
    var allData = [weatherInfo1, weatherInfo2, weatherInfo3, weatherInfo4];
    ////console.log(allData);
    ////console.log(yAxis1);
    ////console.log(yAxis2);
    if (yAxis1 == "temperature") {
    		
    		for (i = 0; i < allData.length; i ++) {
    			////console.log(allData[i].type);
    			if (allData[i].type == yAxis1) {
    				allData[i].chartType = "spline";
    			} else {
    				allData[i].chartType = "column";
    			}
    		}
    		////console.log("Ye olde data: ");
    		////console.log(allData[i]);
    } else if (yAxis1 == "pressure") {
    		
    	for (i = 0; i < allData.length; i ++) {
			////console.log(allData[i].type);
			if (allData[i].type == yAxis1) {
				allData[i].chartType = "spline";
			} else {
				allData[i].chartType = "column";
			}
		}
		////console.log("Ye olde data: ");
		////console.log(allData[i]);
    } else {
    		
    		for (i = 0; i < allData.length; i ++) {
			////console.log(allData[i].type);
			if (allData[i].type == yAxis1) {
				allData[i].chartType = "spline";
			} else {
				allData[i].chartType = "column";
			}
		}
		////console.log("Ye olde data: ");
		////console.log(allData[i]);
    	
    }
    
    var chartType1 = weatherInfo1.chartType;
    var chartType2 = weatherInfo2.chartType;
    var chartType3 = weatherInfo3.chartType;
    var chartType4 = weatherInfo4.chartType;
    
	var myChart = Highcharts.chart('forecastChart', {
		chart: {
	        zoomType: 'xy',
            marginTop: 40 ,
            backgroundColor:'rgba(255, 255, 255, 0.0)'
	    },
	    title: {
	        text: ''
	    },
	    xAxis: [{
	        categories: forecastDays,
	        crosshair: true
	    }],
	    yAxis: [{ // Primary yAxis
	        labels: {
	            format: '{value} ' + weatherInfo1.unitsImperial,
	            style: {
	                color: Highcharts.getOptions().colors[1]
	            }
	        },
	        title: {
	            text: weatherInfo1.axisLabel,
	            style: {
	                color: Highcharts.getOptions().colors[1]
	            }
	        }
	    }, { // Secondary yAxis
	        title: {
	            text: weatherInfo3.axisLabel,
	            style: {
	                color: Highcharts.getOptions().colors[0]
	            }
	        },
	        labels: {
	            format: '{value} ' + weatherInfo3.unitsImperial,
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
	        backgroundColor: 'rgba(255, 255, 255, 0.7)',
	        borderColor: 'rgba(255, 255, 255, 0.7)'
	    },
	    series: [{
	        name: seriesName4,
	        type: chartType4,
	        yAxis: 1,
	        data: weatherParam4,
	        color: 'purple',
	        tooltip: {
	            valueSuffix: '{value} ' + weatherInfo4.unitsImperial
	        }
	
	    }, {
	        name: seriesName3,
	        type: chartType3,
	        data: weatherParam3,
	        color: 'red',
	        tooltip: {
	            valueSuffix: '{value} ' + weatherInfo3.unitsImperial
	        }
	    }, {
	        name: seriesName2,
	        type: chartType2,
	        data: weatherParam2,
	        color: 'black',
	        tooltip: {
	            valueSuffix: '{value} ' + weatherInfo2.unitsImperial
	        }
	    }, {
	        name: seriesName1,
	        type: chartType1,
	        data: weatherParam1,
	        color: '#025ef2',
	        tooltip: {
	            valueSuffix: '{value} ' + weatherInfo1.unitsImperial
	        }
	    }]
	});
};

//CHART: FIVE VARIABLE, DUAL AXIS
function fiveVariableDualAxis(yAxis1, yAxis2, forecastDays, weatherInfo1, weatherInfo2, weatherInfo3, weatherInfo4, weatherInfo5) {
	var weatherParam1 = weatherInfo1.seriesData;
    var weatherParam2 = weatherInfo2.seriesData;
    var weatherParam3 = weatherInfo3.seriesData;
    var weatherParam4 = weatherInfo4.seriesData;
    var weatherParam5 = weatherInfo5.seriesData;
    var seriesName1 = weatherInfo1.seriesName;
    var seriesName2 = weatherInfo2.seriesName;
    var seriesName3 = weatherInfo3.seriesName;
    var seriesName4 = weatherInfo4.seriesName;
    var seriesName5 = weatherInfo5.seriesName;
    
    //Determine which values go on which axes (precedence should go temperature, pressure, velocity, percentage)
    var types = [weatherInfo1.type, weatherInfo2.type, weatherInfo3.type, weatherInfo4.type, weatherInfo5.type];
 
    //Determine axes
    var allData = [weatherInfo1, weatherInfo2, weatherInfo3, weatherInfo4, weatherInfo5];
    ////console.log(allData);
    ////console.log(yAxis1);
    ////console.log(yAxis2);
    if (yAxis1 == "temperature") {
    		
    		for (i = 0; i < allData.length; i ++) {
    			////console.log(allData[i].type);
    			if (allData[i].type == yAxis1) {
    				allData[i].chartType = "spline";
    			} else {
    				allData[i].chartType = "column";
    			}
    		}
    		////console.log("Ye olde data: ");
    		////console.log(allData[i]);
    } else if (yAxis1 == "pressure") {
    		
    	for (i = 0; i < allData.length; i ++) {
			////console.log(allData[i].type);
			if (allData[i].type == yAxis1) {
				allData[i].chartType = "spline";
			} else {
				allData[i].chartType = "column";
			}
		}
		////console.log("Ye olde data: ");
		////console.log(allData[i]);
    } else {
    		
    		for (i = 0; i < allData.length; i ++) {
			////console.log(allData[i].type);
			if (allData[i].type == yAxis1) {
				allData[i].chartType = "spline";
			} else {
				allData[i].chartType = "column";
			}
		}
		////console.log("Ye olde data: ");
		////console.log(allData[i]);
    	
    }
    
    var chartType1 = weatherInfo1.chartType;
    var chartType2 = weatherInfo2.chartType;
    var chartType3 = weatherInfo3.chartType;
    var chartType4 = weatherInfo4.chartType;
    var chartType5 = weatherInfo5.chartType;
    
	var myChart = Highcharts.chart('forecastChart', {
		chart: {
	        zoomType: 'xy',
            marginTop: 40 ,
            backgroundColor:'rgba(255, 255, 255, 0.0)'
	    },
	    title: {
	        text: ''
	    },
	    xAxis: [{
	        categories: forecastDays,
	        crosshair: true
	    }],
	    yAxis: [{ // Primary yAxis
	        labels: {
	            format: '{value} ' + weatherInfo1.unitsImperial,
	            style: {
	                color: Highcharts.getOptions().colors[1]
	            }
	        },
	        title: {
	            text: weatherInfo1.axisLabel,
	            style: {
	                color: Highcharts.getOptions().colors[1]
	            }
	        }
	    }, { // Secondary yAxis
	        title: {
	            text: weatherInfo3.axisLabel,
	            style: {
	                color: Highcharts.getOptions().colors[0]
	            }
	        },
	        labels: {
	            format: '{value} ' + weatherInfo3.unitsImperial,
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
	        backgroundColor: 'rgba(255, 255, 255, 0.7)',
	        borderColor: 'rgba(255, 255, 255, 0.7)'
	    },
	    series: [{
	        name: seriesName5,
	        type: chartType5,
	        yAxis: 1,
	        data: weatherParam5,
	        color: '#e282ed',
	        tooltip: {
	            valueSuffix: '{value} ' + weatherInfo5.unitsImperial
	        }
	
	    },{
	        name: seriesName4,
	        type: chartType4,
	        yAxis: 1,
	        data: weatherParam4,
	        color: '#94f7c5',
	        tooltip: {
	            valueSuffix: '{value} ' + weatherInfo4.unitsImperial
	        }
	
	    }, {
	        name: seriesName3,
	        type: chartType3,
	        data: weatherParam3,
	        color: 'red',
	        tooltip: {
	            valueSuffix: '{value} ' + weatherInfo3.unitsImperial
	        }
	    }, {
	        name: seriesName2,
	        type: chartType2,
	        data: weatherParam2,
	        color: 'black',
	        tooltip: {
	            valueSuffix: '{value} ' + weatherInfo2.unitsImperial
	        }
	    }, {
	        name: seriesName1,
	        type: chartType1,
	        data: weatherParam1,
	        color: '#025ef2',
	        tooltip: {
	            valueSuffix: '{value} ' + weatherInfo1.unitsImperial
	        }
	    }]
	});
};

//CHART: SIX VARIABLE, DUAL AXIS
function sixVariableDualAxis(yAxis1, yAxis2, forecastDays, weatherInfo1, weatherInfo2, weatherInfo3, weatherInfo4, weatherInfo5, weatherInfo6) {
	var weatherParam1 = weatherInfo1.seriesData;
    var weatherParam2 = weatherInfo2.seriesData;
    var weatherParam3 = weatherInfo3.seriesData;
    var weatherParam4 = weatherInfo4.seriesData;
    var weatherParam5 = weatherInfo5.seriesData;
    var weatherParam6 = weatherInfo6.seriesData;
    var seriesName1 = weatherInfo1.seriesName;
    var seriesName2 = weatherInfo2.seriesName;
    var seriesName3 = weatherInfo3.seriesName;
    var seriesName4 = weatherInfo4.seriesName;
    var seriesName5 = weatherInfo5.seriesName;
    var seriesName6 = weatherInfo6.seriesName;
    
    //Determine which values go on which axes (precedence should go temperature, pressure, velocity, percentage)
    var types = [weatherInfo1.type, weatherInfo2.type, weatherInfo3.type, weatherInfo4.type, weatherInfo5.type, weatherInfo6.type];
 
    //Determine axes
    var allData = [weatherInfo1, weatherInfo2, weatherInfo3, weatherInfo4, weatherInfo5, weatherInfo6];
    ////console.log(allData);
    ////console.log(yAxis1);
    ////console.log(yAxis2);
    if (yAxis1 == "temperature") {
    		
    		for (i = 0; i < allData.length; i ++) {
    			////console.log(allData[i].type);
    			if (allData[i].type == yAxis1) {
    				allData[i].chartType = "spline";
    			} else {
    				allData[i].chartType = "column";
    			}
    		}
    		////console.log("Ye olde data: ");
    		////console.log(allData[i]);
    } else if (yAxis1 == "pressure") {
    		
    	for (i = 0; i < allData.length; i ++) {
			////console.log(allData[i].type);
			if (allData[i].type == yAxis1) {
				allData[i].chartType = "spline";
			} else {
				allData[i].chartType = "column";
			}
		}
		////console.log("Ye olde data: ");
		////console.log(allData[i]);
    } else {
    		
    		for (i = 0; i < allData.length; i ++) {
			////console.log(allData[i].type);
			if (allData[i].type == yAxis1) {
				allData[i].chartType = "spline";
			} else {
				allData[i].chartType = "column";
			}
		}
		////console.log("Ye olde data: ");
		////console.log(allData[i]);
    	
    }
    
    
    var chartType1 = weatherInfo1.chartType;
    var chartType2 = weatherInfo2.chartType;
    var chartType3 = weatherInfo3.chartType;
    var chartType4 = weatherInfo4.chartType;
    var chartType5 = weatherInfo5.chartType;
    var chartType6 = weatherInfo6.chartType;
    
	var myChart = Highcharts.chart('forecastChart', {
		chart: {
	        zoomType: 'xy',
            marginTop: 40 ,
            backgroundColor:'rgba(255, 255, 255, 0.0)'
	    },
	    title: {
	        text: ''
	    },
	    xAxis: [{
	        categories: forecastDays,
	        crosshair: true
	    }],
	    yAxis: [{ // Primary yAxis
	        labels: {
	            format: '{value} ' + weatherInfo1.unitsImperial,
	            style: {
	                color: Highcharts.getOptions().colors[1]
	            }
	        },
	        title: {
	            text: weatherInfo1.axisLabel,
	            style: {
	                color: Highcharts.getOptions().colors[1]
	            }
	        }
	    }, { // Secondary yAxis
	        title: {
	            text: weatherInfo3.axisLabel,
	            style: {
	                color: Highcharts.getOptions().colors[0]
	            }
	        },
	        labels: {
	            format: '{value} ' + weatherInfo3.unitsImperial,
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
	        backgroundColor: 'rgba(255, 255, 255, 0.7)',
	        borderColor: 'rgba(255, 255, 255, 0.7)'
	    },
	    series: [{
	        name: seriesName6,
	        type: chartType6,
	        yAxis: 1,
	        data: weatherParam6,
	        color: '#db9943',
	        tooltip: {
	            valueSuffix: '{value} ' + weatherInfo6.unitsImperial
	        }
	
	    },{
	        name: seriesName5,
	        type: chartType5,
	        yAxis: 1,
	        data: weatherParam5,
	        color: '#e282ed',
	        tooltip: {
	            valueSuffix: '{value} ' + weatherInfo5.unitsImperial
	        }
	
	    },{
	        name: seriesName4,
	        type: chartType4,
	        color: '#94f7c5',
	        yAxis: 1,
	        data: weatherParam4,
	        tooltip: {
	            valueSuffix: '{value} ' + weatherInfo4.unitsImperial
	        }
	
	    }, {
	        name: seriesName3,
	        type: chartType3,
	        data: weatherParam3,
	        color: 'red',
	        tooltip: {
	            valueSuffix: '{value} ' + weatherInfo3.unitsImperial
	        }
	    }, {
	        name: seriesName2,
	        type: chartType2,
	        data: weatherParam2,
	        color: 'black',
	        tooltip: {
	            valueSuffix: '{value} ' + weatherInfo2.unitsImperial
	        }
	    }, {
	        name: seriesName1,
	        type: chartType1,
	        data: weatherParam1,
	        color: '#025ef2',
	        tooltip: {
	            valueSuffix: '{value} ' + weatherInfo1.unitsImperial
	        }
	    }]
	});
};

function determineSelected() {
	var hiTempSelected = $("#hiTemp").is(':checked');
    var loTempSelected = $("#loTemp").is(':checked');
    var dewPointSelected = $("#dewPoint").is(':checked');
    var precipChanceSelected = $("#precipChance").is(':checked');
    var humiditySelected = $("#humidity").is(':checked');
    var ccSelected = $("#cloudCover").is(':checked');
    var meanWindSelected = $("#meanWind").is(':checked');
    var windGustSelected = $("#windGust").is(':checked');
    var pressureSelected = $("#pressure").is(':checked');
    
    //var visSelected = $("#visibility").is(':checked');
    //var uvSelected = $("#UV").is(':checked');
    //var ozoneSelected = $("#ozone").is(':checked');
    //var moonSelected = $("#moonPhase").is(':checked');
    //var weatherSelections = [hiTempSelected, loTempSelected, dewPointSelected, precipChanceSelected, precipTypeSelected, humiditySelected, meanWindSelected, windGustSelected, windDirSelected, pressureSelected, ccSelected, visSelected, uvSelected, ozoneSelected, moonSelected];
    //var precipTypeSelected = $("#precipType").is(':checked');
    //var windDirSelected = $("#windDirection").is(':checked');
    
    var weatherSelections = [hiTempSelected, loTempSelected, dewPointSelected, precipChanceSelected, humiditySelected, ccSelected, meanWindSelected, windGustSelected, pressureSelected];
    
    return weatherSelections;
}

//CHART SELECTION: Determine what type of plot to show based on checkboxes
function determineChartCategoryAndContent(weatherParameters, weatherSelections) {
	
	//For control flow as users check/uncheck boxes, we need to know the count
    //of how many "types" of weather parameters are checked, where "type" refers to
    //that parameters type of units (temperature, percentage, etc)
	var countTemperature = 0;
	var countPercentage = 0;
	var countVelocity = 0;
	var countPressure = 0;
	var uniqueTypes = 0;				//Count the unique "types" of data the user wants (temperature units, percentages, velocity units, pressure units)
	var paramsToPlot = [];
	var chartCategory;
	
	var i;
	for (i = 0; i < weatherSelections.length; i ++) {
		if (weatherSelections[i]) {
			if (i < 3) {							//So, if a temperature checkbox is checked (hiTemp, loTemp, dew point)
				////console.log("i is: " + i);
				countTemperature ++;
			} else if (i >= 3 && i < 6) {		//If a percentage checkbox is checked (precip chance, cloud cover, humidity)
				////console.log("i is: " + i);
				countPercentage ++;
			} else if (i >= 6 && i < 8) {		//If a velocity checkbox is checked (mean wind, peak wind gust)
				////console.log("i is: " + i);
				countVelocity ++;
			} else {								//If the pressure checkbox is checked
				////console.log("i is: " + i);
				countPressure ++;				
			}
			paramsToPlot.push(weatherParameters[i]);		//Add the current weather parameter to the array of parameters to plot
		}
	}
	
	////console.log("COUNT TEMPERATURE IS: " + countTemperature);
	////console.log("COUNT PERCENTAGE IS: " + countPercentage);
	////console.log("COUNT VELOCITY IS: " + countVelocity);
	////console.log("COUNT PRESSURE IS: " + countPressure);
	
	var typeCounts = [countTemperature, countPercentage, countVelocity, countPressure];
	for (i = 0; i < typeCounts.length; i ++) {
		if (typeCounts[i] > 0) {
			uniqueTypes ++;
		}
	}
	
	
	
	if (uniqueTypes == 1) {
		if (paramsToPlot.length == 1) {
			chartCategory = "singleVariable";
		} else if (paramsToPlot.length == 2) {
			chartCategory = "twoVariable";
		} else if (paramsToPlot.length == 3) {
			chartCategory = "threeVariable";
		}
	} else if (uniqueTypes == 2) {
		if (paramsToPlot.length == 2) {
			chartCategory = "twoVariableDualYAxis";
		} else if (paramsToPlot.length == 3) {
			chartCategory = "threeVariableDualYAxis";
		} else if (paramsToPlot.length == 4) {
			chartCategory = "fourVariableDualYAxis";
		} else if (paramsToPlot.length == 5) {
			chartCategory = "fiveVariableDualYAxis";
		} else if (paramsToPlot.length == 6) {
			chartCategory = "sixVariableDualYAxis";
		}
	} else if (uniqueTypes > 2) {
		chartCategory = "meteogram";
	}
	
	////console.log(paramsToPlot);
	////console.log(chartCategory);
	
	return [chartCategory, paramsToPlot];	
}

function createChart(visType, forecastDays, chartCategory, chartContent, weatherData, weatherSelections) {
	//console.log("In createChart: chart content: ");
	//console.log(chartContent);
	//console.log("first one in content: ");
	//console.log(chartContent[0]);
	//console.log("2nd one in content: ");
	//console.log(chartContent[1]);
	
	//If chartCategory is a single-axis chart, we have it easy! Just determine the number of variables
	//and pass it its contents
	if (chartCategory == "singleVariable" || chartCategory == "twoVariable" || chartCategory == "threeVariable") {
		
		$("#chartTypeSelection").show();
		$("#dropdownLabel").show();
		
		switch (chartContent.length) {
			case 1:
				singleVariableChart(visType, forecastDays, chartContent[0]);
				break;
			case 2:
				twoVariableChart(visType, forecastDays, chartContent[0], chartContent[1]);
				break;
			case 3:
				threeVariableChart(visType, forecastDays, chartContent[0], chartContent[1], chartContent[2]);
				break;
		}
	
	
	//If not a single-axis and not a meteogram, determine which value goes on which axis
	//Then call appropriate chart function
	} else if (chartCategory != "singleVariable" && chartCategory != "twoVariable" && chartCategory != "threeVariable" && chartCategory != "meteogram") {
		
		$("#chartTypeSelection").hide();
		$("#dropdownLabel").hide();
		
		var yAxis1 = null;
		var yAxis2 = null;
		var types = [];
		for (i = 0; i < chartContent.length; i ++) {
			types.push(chartContent[i].type);
		}
		
		////console.log("TYPES: ");
		////console.log(types);
		
		if (types.includes("temperature")) {
			yAxis1 = "temperature";
			if (types.includes("pressure")) {
				yAxis2 = "pressure";
			} else if (types.includes("velocity")) {
				yAxis2 = "velocity";
			} else {
				yAxis2 = "percentage";
			}
		} else if (types.includes("pressure")) {
			yAxis1 = "pressure";
			if (types.includes("velocity")) {
				yAxis2 = "velocity";
			} else {
				yAxis2 = "percentage";
			}
		} else {
			yAxis1 = "velocity";
			yAxis2 = "percentage";
		}
		
		////console.log("2nd one in content right before passing to function: ");
		////console.log(chartContent[1]);
		
		switch (chartContent.length) {
			case 2:
				twoVariableDualAxis(yAxis1, yAxis2, forecastDays, chartContent[0], chartContent[1]);
				break;
			case 3:
				threeVariableDualAxis(yAxis1, yAxis2, forecastDays, chartContent[0], chartContent[1], chartContent[2]);
				break;
			case 4:
				fourVariableDualAxis(yAxis1, yAxis2, forecastDays, chartContent[0], chartContent[1], chartContent[2], chartContent[3]);
				break;
			case 5:
				fiveVariableDualAxis(yAxis1, yAxis2, forecastDays, chartContent[0], chartContent[1], chartContent[2], chartContent[3], chartContent[4]);
				break;
			case 6:
				sixVariableDualAxis(yAxis1, yAxis2, forecastDays, chartContent[0], chartContent[1], chartContent[2], chartContent[3], chartContent[4], chartContent[5]);
				break;
		}
		
		
		
	} else {
		$("#chartTypeSelection").hide();
		$("#dropdownLabel").hide();
		initiateMeteogram(weatherData, weatherSelections);
	}	
		
		
}

//WRITE CURRENT FORECAST
function outputCurrentConditions(currentWeather) {
	$('#temperatureLI').text(currentWeather.temperature + " F"); 
	$('#precipChanceLI').text(currentWeather.precipProbability + "% chance");
	$('#humidityLI').text(currentWeather.humidity + " %");
	$('#windLI').text(currentWeather.windSpeed + " m/s sustained with gusts up to " + currentWeather.windGust + "m/s");
	$('#windDirectionLI').text(currentWeather.windBearing);
	$('#cloudCoverLI').text(currentWeather.cloudCover + " %");
}









	