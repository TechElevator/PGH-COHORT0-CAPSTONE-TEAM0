$( document ).ready(function() {
    console.log( "ready!" );
    
  //Make API Call to get daily forecast data. Save that data into arrays with scope of this .js file
    //(Or, return data as a javascript object
    //var forecast = retrieveForecastFromAPI();
    //For now, we'll use dummy data
    
    //Parse forecast data into arrays
    //*IMPLEMENT FUNCTION FOR THIS* - Note: Might not have to do this since data comes back in JSON
	    //FOR DEMO PURPOSES: DUMMY DATA
	    var hiTemp = {
	    		seriesName : "High Temperature",
	    		seriesData : [70, 69, 77, 85, 83, 87, 77],
	    		type: "temperature"
	    }
	    var loTemp = {
	    		seriesName : "Low Temperature",
	    		seriesData : [51, 52, 60, 63, 63, 65, 58],
	    		type: "temperature"
	    }
	    var dewPoint = {
	    		seriesName : "Dew Point",
	    		seriesData : [50, 50, 64, 82, 80, 74, 57],
	    		type: "temperature"
	    }
	    var precipChance = {
	    		seriesName : "Chance of Precipitation",
	    		seriesData : [10, 12, 21, 74, 81, 32, 18],
	    		type: "percentage"
	    }
	    var humidity = {
	    		seriesName : "Humidity",
	    		seriesData : [45, 45, 52, 74, 76, 72, 52],
	    		type: "percentage"
	    }
	    var cloudCoverage = {
	    		seriesName : "Cloud Coverage",
	    		seriesData : [2, 2, 65, 72, 61, 40, 38],
	    		type: "percentage"
	    }
	    var meanWind = {
	    		seriesName : "Mean Wind",
	    		seriesData : [1, 1, 3, 3, 3, 1, 2],
	    		type: "velocity"
	    }
	    var windGust = {
	    		seriesName : "Wind Gust",
	    		seriesData : [3, 3, 6, 8, 4, 3, 3],
	    		type: "velocity"
	    }
	    var pressure = {
	    		seriesName : "Pressure",
	    		seriesData : [1015, 1014, 1004, 999, 1001, 1011, 1013],
	    		type: "pressure"
	    }
	    
	    var currentWeather = {
	    		summary : "Partly Cloudy",
	    		precipProbability : 24,
	    		temperature : 74,
	    		dewPoint : 50,
	    		humidity : 47,
	    		pressure : 1021,
	    		windSpeed : 2.35,
	    		windGust : 3.89,
	    		windBearing : 344,
	    		cloudCover : 0.37,
	    		uvIndex : 7,
	    		visibility : 10, 
	    		ozone : 320
	    }
	    
	    outputCurrentConditions(currentWeather);
	    
	    //END DUMMY DATA
    
    var weatherData = [hiTemp, loTemp, dewPoint, precipChance, humidity, cloudCoverage, meanWind, windGust, pressure];
    //var testDataSeries = [weatherData[0]];
    
    
    var visType = "spline";
    var visType1 = "spline";
    var visType2 = "column";
    var forecastDays = ['Day 0', 'Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'];
    
    //For control flow as users check/uncheck boxes, we need to know the count
    //of how many "types" of weather parameters are checked, where "type" refers to
    //that parameters type of units (temperature, percentage, etc)
    //On the initial page load, High Temperature and Low Temperature are selected
    var countTemperature = 2;		//HiTemp, LoTemp, Dew Point
    var countPercentage = 0;			//Humidity, Precip Chance, Cloud Cover
    var countVelocity = 0;			//Mean Wind Speed, Wind Gust
    //var countIcon = 0;				//Precip Type, Moon Phase
    var countPressure = 0;			//Pressure
    //var countDirection = 0;			//Wind Direction
    //var countIndex = 0;				//UV Index
    //var countDistance = 0;			//Visibility
    //var countPPB = 0;				//Ozone
    //var allCounts = [countTemperature, countPercentage, countVelocity, countIcon, countPressure, countDirection, countIndex, countDistance, countPPB];
    
    var weatherParameters = ["hiTemp", "loTemp", "dewPoint", "precipChance", "humidity", "cloudCoverage", "meanWind", "windGust", "pressure"]
    
    //Determine the category of chart (one variable, two var, etc - single yAxis, dual yAxis) and its content
    //based on user's selected parameters
    
    $("input:checkbox").change(function(){
    		console.log("-------------------------------------")
    		var chartCategory;
    		var selectedContent;
    		var chartData = [];
    		var weatherSelections = determineSelected();
    		var categoryAndContent = determineChartCategoryAndContent(weatherParameters, weatherSelections);
    		chartCategory = categoryAndContent.shift();
    		selectedContent = categoryAndContent;
    		
    		for (i = 0; i < selectedContent[0].length; i ++) {
    			chartData[i] = weatherData[weatherParameters.indexOf(selectedContent[0][i])];
    			console.log("i is; " + i);
    		}
    		
    		console.log("selected content: ");
    		console.log(selectedContent);
    		console.log("chart content right after i click the checkbox: ");
    	    console.log(selectedContent);
    	    console.log("chart data right after i click the checkbox: ");
    	    console.log(chartData);
    	    
    	    createChart(visType, forecastDays, chartCategory, chartData);
    });
    
    
    
    //Retrieve user's preferred visualization type from the database
    //var preferredVis = retrivePreferredVis(userID);
    
    //Create user's preferred visualization
    //twoVariableChart(visType, forecastDays, weatherInfo1, weatherInfo2)
    
    /*
    
    //singleVariableChart(visType, forecastDays, weatherInfo1);
    
    //twoVariableChart(visType, forecastDays, weatherInfo1, weatherInfo2);
    
    threeVariableChart(visType, forecastDays, weatherInfo1, weatherInfo2, weatherInfo3);
    
    //twoVariableDualAxis(visType1, visType2, forecastDays, weatherInfo1, precipChance);
    
    //threeVariableDualAxis(visType1, visType2, forecastDays, weatherInfo1, weatherInfo2, precipChance);
    
    //fourVariableDualAxis(visType1, visType2, forecastDays, weatherInfo1, weatherInfo2, weatherInfo3, precipChance);
    */
    
    
 
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
    console.log(weatherInfo1);
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

//CHART: TWO VARIABLE, DUAL AXIS
function twoVariableDualAxis(yAxis1, yAxis2, forecastDays, weatherInfo1, weatherInfo2) {
	var weatherParam1 = weatherInfo1.seriesData;
    var weatherParam2 = weatherInfo2.seriesData;
    var seriesName1 = weatherInfo1.seriesName;
    var seriesName2 = weatherInfo2.seriesName;
    var yAxis1Type = "spline";
    var yAxis2Type = "column";
    
    
    console.log("in twovariabledualaxis=======");
    console.log("weatherparam1: ");
    console.log(weatherParam1);
    console.log("weatherparam2: ");
    console.log(weatherParam2);
    
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
	        type: yAxis2Type,
	        yAxis: 1,
	        data: weatherParam2,
	        tooltip: {
	            valueSuffix: ' %'
	        }
	
	    }, {
	        name: seriesName1,
	        type: yAxis1Type,
	        data: weatherParam1,
	        tooltip: {
	            valueSuffix: ' °F'
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
    
    
    
    var yAxisTypes
    
    
    
    
    
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

function determineSelected() {
	var hiTempSelected = $("#hiTemp").is(':checked');
    var loTempSelected = $("#loTemp").is(':checked');
    var dewPointSelected = $("#dewPoint").is(':checked');
    var precipChanceSelected = $("#precipChance").is(':checked');
    var humiditySelected = $("#humidity").is(':checked');
    var meanWindSelected = $("#meanWind").is(':checked');
    var windGustSelected = $("#windGust").is(':checked');
    var pressureSelected = $("#pressure").is(':checked');
    var ccSelected = $("#cloudCover").is(':checked');
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
				countTemperature ++;
			} else if (i >= 3 && i < 6) {		//If a percentage checkbox is checked (precip chance, cloud cover, humidity)
				countPercentage ++;
			} else if (i >= 6 && i < 8) {		//If a velocity checkbox is checked (mean wind, peak wind gust)
				countVelocity ++;
			} else {								//If the pressure checkbox is checked
				countPressure ++;				
			}
			paramsToPlot.push(weatherParameters[i]);		//Add the current weather parameter to the array of parameters to plot
		}
	}
	
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
	
	console.log(paramsToPlot);
	console.log(chartCategory);
	
	return [chartCategory, paramsToPlot];	
}

function createChart(visType, forecastDays, chartCategory, chartContent) {
	console.log("chart content: ");
	console.log(chartContent);
	console.log("first one in content: ");
	console.log(chartContent[0]);
	console.log("2nd one in content: ");
	console.log(chartContent[1]);
	
	
	//If chartCategory is a single-axis chart, we have it easy! Just determine the number of variables
	//and pass it its contents
	if (chartCategory == "singleVariable" || chartCategory == "twoVariable" || chartCategory == "threeVariable") {
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
	}
	
	//If not a single-axis and not a meteogram, determine which value goes on which axis
	//Then call appropriate chart function
	if (chartCategory != "singleVariable" && chartCategory != "twoVariable" && chartCategory != "threeVariable" && chartCategory != "meteogram") {
		
		var yAxis1 = null;
		var yAxis2 = null;
		var types = [];
		for (i = 0; i < chartContent; i ++) {
			types.push(chartContent[i]);
		}
		
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
		
		console.log("2nd one in content right before passing to function: ");
		console.log(chartContent[1]);
		
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
				fiveVariableDualAxis(yAxis1, yAxis2, forecastDays, chartContent[0], chartContent[0], chartContent[1], chartContent[2], chartContent[3], chartContent[4]);
				break;
			case 6:
				sixVariableDualAxis(yAxis1, yAxis2, forecastDays, chartContent[0], chartContent[1], chartContent[2], chartContent[3], chartContent[4], chartContent[5]);
				break;
		}
		
		
		
	}	
		
		
}

//WRITE CURRENT FORECAST
function outputCurrentConditions(currentWeather) {
	$('#temperature').text("Temperature: " + currentWeather.temperature);
	$('#precipChance').text("Precipitation: " + currentWeather.precipProbability + "% chance of precipitation");
	$('#humidity').text("Humidity: " + currentWeather.humidity + "%");
	$('#wind').text("Wind Speed: " + currentWeather.windSpeed + " m/s sustained with gusts up to " + currentWeather.windGust + "m/s");
	$('#windDirection').text("Wind Direction: " + currentWeather.windBearing);
	$('#cloudCover').text("Cloud Cover: " + currentWeather.cloudCover + " %");
}







	