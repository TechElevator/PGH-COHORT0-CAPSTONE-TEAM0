$( document ).ready(function() {
    console.log( "ready!" );
    
    var visType = "areaspline";
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
    		seriesName : "High",
    		seriesData : [70, 69, 77, 85, 83, 87, 77]
    }
    var weatherInfo2 = {
    		seriesName : "Low",
    		seriesData : [51, 52, 60, 63, 63, 65, 58]
    }
    
    singleVariableChart(visType, forecastDays, weatherInfo1);
    
    //twoVariableChart(visType, forecastDays, weatherInfo1, weatherInfo2);
    
    
    
 
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
            zoomType: 'x'
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
            zoomtype: 'x'
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






	