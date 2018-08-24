$( document ).ready(function() {
    console.log( "ready!" );
    
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
    
    var hiTempSelected = $("#hiTemp").is(':checked');
    var loTempSelected = $("#loTemp").is(':checked');
    var dewPointSelected = $("#dewPoint").is(':checked');
    var precipChanceSelected = $("#precipChance").is(':checked');
    //var precipTypeSelected = $("#precipType").is(':checked');
    var humiditySelected = $("#humidity").is(':checked');
    var meanWindSelected = $("#meanWind").is(':checked');
    var windGustSelected = $("#windGust").is(':checked');
    //var windDirSelected = $("#windDirection").is(':checked');
    var pressureSelected = $("#pressure").is(':checked');
    var ccSelected = $("#cloudCover").is(':checked');
    //var visSelected = $("#visibility").is(':checked');
    //var uvSelected = $("#UV").is(':checked');
    //var ozoneSelected = $("#ozone").is(':checked');
    //var moonSelected = $("#moonPhase").is(':checked');
    //var weatherSelections = [hiTempSelected, loTempSelected, dewPointSelected, precipChanceSelected, precipTypeSelected, humiditySelected, meanWindSelected, windGustSelected, windDirSelected, pressureSelected, ccSelected, visSelected, uvSelected, ozoneSelected, moonSelected];
    var weatherParameters = ["hiTemp", "loTemp", "dewPoint", "precipChance", "humidity", "cloudCoverage", "meanWind", "windGust", "pressure"]
    var weatherSelections = [hiTempSelected, loTempSelected, dewPointSelected, precipChanceSelected, humiditySelected, ccSelected, meanWindSelected, windGustSelected, pressureSelected];
    
    $("input:checkbox").change(function(){
        determineViableCharts(weatherParameters, weatherSelections);
    });
    
    
    
    
    //Make API Call to get daily forecast data. Save that data into arrays with scope of this .js file
    //(Or, return data as a javascript object
    //var forecast = retrieveForecastFromAPI();
    //For now, we'll use dummy data
    
    //Parse forecast data into arrays
    //*IMPLEMENT FUNCTION FOR THIS* - Note: Might not have to do this since data comes back in JSON
    
    //Retrieve user's preferred visualization type from the database
    //var preferredVis = retrivePreferredVis(userID);
    
    //Create user's preferred visualization
    //twoVariableChart(visType, forecastDays, weatherInfo1, weatherInfo2)
    
    /*
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

//CHART: THREE VARIABLE, DUAL AXIS
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


//CHART SELECTION: Determine what type of plot to show based on checkboxes
function determineViableCharts(weatherParameters, weatherSelections) {
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
				console.log("in temp");
			} else if (i >= 3 && i < 6) {		//If a percentage checkbox is checked (precip chance, cloud cover, humidity)
				countPercentage ++;
				console.log("in percent");
			} else if (i >= 6 && i < 8) {		//If a velocity checkbox is checked (mean wind, peak wind gust)
				countVelocity ++;
				console.log("in velocity");
			} else {								//If the pressure checkbox is checked
				countPressure ++;				
			}
			console.log("i is " + i);
			paramsToPlot.push(weatherParameters[i]);		//Add the current weather parameter to the array of parameters to plot
		}
	}
	
	var typeCounts = [countTemperature, countPercentage, countVelocity, countPressure];
	for (i = 0; i < typeCounts.length; i ++) {
		if (typeCounts[i] > 0) {
			uniqueTypes ++;
		}
	}
	
	console.log(typeCounts);
	console.log(uniqueTypes);
	console.log(paramsToPlot);
	
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
	
	console.log(chartCategory);
	
	return [chartCategory, paramsToPlot];
	
}







	