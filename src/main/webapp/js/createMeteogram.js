
	//Making these global instead of needing to pass 9+ arguments into functions. Better approach??
	var hiTempVisibility;
    var lowTempVisibility;
    var dewPointVisibility;
    var precipVisibility;
    var humidityVisibility;
    var cloudCoverVisibility;
    var meanWindVisibility;
    var windGustVisibility;
    var pressureVisibility;


	function initiateMeteogram(weatherData, weatherSelections) {
	    console.log("-----In Meteogram creation-----");
		console.log(weatherSelections);
	    
	    hiTempVisibility = weatherSelections[0];
	    lowTempVisibility = weatherSelections[1];
	    dewPointVisibility = weatherSelections[2];
	    precipVisibility = weatherSelections[3];
	    humidityVisibility = weatherSelections[4];
	    cloudCoverVisibility = weatherSelections[5];
	    meanWindVisibility = weatherSelections[6];
	    windGustVisibility = weatherSelections[7];
	    pressureVisibility = weatherSelections[8];
	    
	    console.log(dewPointVisibility);
	    
	    /*
	    this.hiTemperatures = weatherData[0];
	    this.loTemperatures = weatherData[1];
	    this.dewPoint = weatherData[2];
	    this.precipitations = weatherData[3];
	    this.humidity = weatherData[4];
	    this.cloudCover = weatherData[5];
	    this.meanWind = weatherData[6];
	    this.windGusts = weatherData[7];
	    this.pressures = weatherData[8];
	    */
	    
		// Parallel arrays for the chart data
	    //this.symbols = [];
	    this.precipitations = [10, 11, 82, 64, 26, 14, 10];
	    this.meanWinds = [[10,180],[11,167],[7,120],[5,133],[1,283],[5,259],[3,234]];
	    this.windGusts = [[12,180],[13,167],[10,120],[10,133],[3,283],[7,259],[6,234]];
	    this.hiTemperatures = [32, 35, 38, 45, 41, 38, 34];
	    this.loTemperatures = [22, 23, 25, 28, 27, 24, 24];
	    this.dewPoint = [27, 28, 29, 30, 33, 25, 28];
	    this.pressures = [1001, 1010, 1013, 1002, 1001, 1000, 998];
	    this.cloudCover = [20, 25, 23, 47, 52, 13, 12];
	    this.humidity = [47, 53, 73, 77, 39, 40, 42];
	
	    
	
	    // Run
	    createMGram()
	    
	}
	
	/**
	 * Function to smooth the temperature line. The original data provides only whole degrees,
	 * which makes the line graph look jagged. So we apply a running mean on it, but preserve
	 * the unaltered value in the tooltip.
	 */
	Meteogram.prototype.smoothLine = function (data) {
	    var i = data.length,
	        sum,
	        value;
	
	    while (i--) {
	        data[i].value = value = data[i].y; // preserve value for tooltip
	
	        // Set the smoothed value to the average of the closest points, but don't allow
	        // it to differ more than 0.5 degrees from the given value
	        sum = (data[i - 1] || data[i]).y + value + (data[i + 1] || data[i]).y;
	        data[i].y = Math.max(value - 0.5, Math.min(sum / 3, value + 0.5));
	    }
	};
	
	/**
	 * Draw the weather symbols on top of the temperature series. The symbols are
	 * fetched from yr.no's MIT licensed weather symbol collection.
	 * https://github.com/YR/weather-symbols
	 */
	Meteogram.prototype.drawWeatherSymbols = function (chart) {
	    var meteogram = this;
	
	    $.each(chart.series[0].data, function (i, point) {
	        if (meteogram.resolution > 36e5 || i % 2 === 0) {
	
	            chart.renderer
	                .image(
	                    'https://cdn.rawgit.com/YR/weather-symbols/6.0.2/dist/svg/' +
	                        meteogram.symbols[i] + '.svg',
	                    point.plotX + chart.plotLeft - 8,
	                    point.plotY + chart.plotTop - 30,
	                    30,
	                    30
	                )
	                .attr({
	                    zIndex: 5
	                })
	                .add();
	        }
	    });
	};
	
	
	/**
	 * Draw blocks around wind arrows, below the plot area
	 */
	function drawBlocksForWindArrows(chart) {
	    var xAxis = chart.xAxis[0],
	        x,
	        pos,
	        max,
	        isLong,
	        isLast,
	        i;
	
	    for (pos = xAxis.min, max = xAxis.max, i = 0; pos <= max + 36e5; pos += 36e5, i += 1) {
	
	        // Get the X position
	        isLast = pos === max + 36e5;
	        x = Math.round(xAxis.toPixels(pos)) + (isLast ? 0.5 : -0.5);
	
	        // Draw the vertical dividers and ticks
	        if (this.resolution > 36e5) {
	            isLong = pos % this.resolution === 0;
	        } else {
	            isLong = i % 2 === 0;
	        }
	        chart.renderer.path(['M', x, chart.plotTop + chart.plotHeight + (isLong ? 0 : 28),
	            'L', x, chart.plotTop + chart.plotHeight + 32, 'Z'])
	            .attr({
	                'stroke': chart.options.chart.plotBorderColor,
	                'stroke-width': 1
	            })
	            .add();
	    }
	
	      // Center items in block
	    chart.get('windbarbs').markerGroup.attr({
	        translateX: chart.get('windbarbs').markerGroup.translateX + 8
	    });
	
	};
	
	/**
	 * Get the title based on the XML data
	 */
	function getTitle() {
	    console.log("in getTitle");
		return '' 
	};
	
	/**
	 * Build and return the Highcharts options structure
	 */
	function getChartOptions() {
	    console.log("in chart options")
		var meteogram = this;
	
	    return {
	        chart: {
	            renderTo: 'forecastChart',
	            marginBottom: 70,
	            marginRight: 40,
	            marginTop: 50,
	            backgroundColor:'rgba(255, 255, 255, 0.0)',
	            plotBorderWidth: 1,
	            //height: 310,
	            alignTicks: false,
	            zoomstype: 'xy',
	            scrollablePlotArea: {
	                minWidth: 720
	            }
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
	
	        defs: {
	            patterns: [{
	                'id': 'precipitation-error',
	                'path': {
	                    d: [
	                        'M', 3.3, 0, 'L', -6.7, 10,
	                        'M', 6.7, 0, 'L', -3.3, 10,
	                        'M', 10, 0, 'L', 0, 10,
	                        'M', 13.3, 0, 'L', 3.3, 10,
	                        'M', 16.7, 0, 'L', 6.7, 10
	                    ].join(' '),
	                    stroke: '#68CFE8',
	                    strokeWidth: 1
	                }
	            }]
	        },
	
	        title: {
	            text: this.getTitle(),
	            align: 'left',
	            style: {
	                whiteSpace: 'nowrap',
	                textOverflow: 'ellipsis'
	            }
	        },
	
	        //credits: {
	        //    text: 'Forecast from <a href="http://yr.no">yr.no</a>',
	        //    href: this.xml.querySelector('credit link').getAttribute('url'),
	        //    position: {
	        //        x: -40
	        //    }
	        //},
	
	        tooltip: {
	            shared: true,
	            useHTML: true,
	            headerFormat:
	                
	                '<b>{point.point.symbolName}</b><br>'
	
	        },
	
	        xAxis: [{ // Bottom X axis
	            type: 'linear',
	            //tickInterval: 2 * 36e5, // two hours
	            //minorTickInterval: 36e5, // one hour
	            tickLength: 0,
	            gridLineWidth: 1,
	            gridLineColor: (Highcharts.theme && Highcharts.theme.background2) || '#F0F0F0',
	            startOnTick: false,
	            endOnTick: false,
	            minPadding: 0,
	            maxPadding: 0,
	            offset: 30,
	            showLastLabel: true,
	            labels: {
	            		format: 'Day {value}',
		            align: 'left',
		            x: 0,
		            y: -5,
		            style: {
		            		fontSize: "14px"
		            }
	            	},
	            crosshair: true
	        }, { // Top X axis
	            //linkedTo: 0,
	            //type: 'datetime',
	            //tickInterval: 1,
	            //labels: {
	                //format: '{value:<span style="font-size: 12px; font-weight: bold">%a</span> %b %e}',
	            		//format: 'Day {value}',
	                //align: 'left',
	                //x: 3,
	                //y: -5
	            //},
	            //opposite: true,
	            //tickLength: 20,
	            //gridLineWidth: 1
	        }], 
	
	        yAxis: [{ // temperature axis
	            title: {
	                text: 'Temperature',
	            },
	            labels: {
	                format: '{value} F',
	                style: {
	                    fontSize: '10px'
	                },
	                x: -3
	            },
	            plotLines: [{ // zero plane
	                value: 0,
	                color: '#BBBBBB',
	                width: 1,
	                zIndex: 2
	            }],
	            maxPadding: 0.3,
	            minRange: 8,
	            tickInterval: 1,
	            gridLineColor: (Highcharts.theme && Highcharts.theme.background2) || '#F0F0F0'
	
	        }, { // precipitation axis
	            title: {
	                text: null
	            },
	            labels: {
	                enabled: false
	            },
	            gridLineWidth: 0,
	            tickLength: 0,
	            minRange: 10,
	            min: 0
	
	        }, { // Air pressure
	            allowDecimals: false,
	            title: { // Title on top of axis
	                text: 'mb',
	                offset: 0,
	                align: 'high',
	                rotation: 0,
	                style: {
	                    fontSize: '10px',
	                    color: 'green',
	                },
	                textAlign: 'left',
	                x: 3
	            },
	            labels: {
	            	format: '{value} mb',    
	            	style: {
	                    fontSize: '8px',
	                    color: 'green'
	                },
	                y: 2,
	                x: 3
	            },
	            gridLineWidth: 0,
	            opposite: true,
	            showLastLabel: false
	        }],
	
	        legend: {
	            enabled: false
	        },
	
	        plotOptions: {
	            series: {
	                pointPlacement: 'between'
	            }
	        },
	
	
	        series: [{
	            name: 'High Temperature',
	            data: this.hiTemperatures,
	            visible: hiTempVisibility,
	            type: 'spline',
	            marker: {
	                enabled: false,
	                states: {
	                    hover: {
	                        enabled: true
	                    }
	                }
	            },
	            tooltip: {
	                valueSuffix: ' F'
	            },
	            zIndex: 1,
	            color: '#FF3333',
	            negativeColor: '#48AFE8',
	            visible: true
	        },{
	            name: 'Low Temperature',
	            data: this.loTemperatures,
	            visible: lowTempVisibility,
	            type: 'spline',
	            marker: {
	                enabled: false,
	                states: {
	                    hover: {
	                        enabled: true
	                    }
	                }
	            },
	            tooltip: {
	                valueSuffix: ' F'
	            },
	            zIndex: 1,
	            color: 'black',
	            negativeColor: '#48AFE8',
	            visible: true
	        }, {
	            name: 'Dew Point',
	            data: this.dewPoint,
	            visible: dewPointVisibility,
	            type: 'spline',
	            marker: {
	                enabled: false,
	                states: {
	                    hover: {
	                        enabled: true
	                    }
	                }
	            },
	            tooltip: {
	                valueSuffix: ' F'
	            },
	        
	            zIndex: 1,
	            color: '#66f756',
	            negativeColor: '#48AFE8'
	        }, {
	            name: 'Precipitation',
	            data: this.precipitationsError,
	            type: 'column',
	            color: 'url(#precipitation-error)',
	            yAxis: 1,
	            groupPadding: 0,
	            //pointPadding: 0,
	            tooltip: {
	                valueSuffix: ' %',
	                pointFormat: '<span style="color:{point.color}">\u25CF</span> ' +
	                    '{series.name}: <b>{point.minvalue} mm - {point.maxvalue} mm</b><br/>'
	            },
	            grouping: false,
	            dataLabels: {
	                enabled: meteogram.hasPrecipitationError,
	                formatter: function () {
	                    if (this.point.maxvalue > 0) {
	                        return this.point.maxvalue;
	                    }
	                },
	                style: {
	                    fontSize: '8px',
	                    color: 'gray'
	                }
	            }
	        }, {
	            name: 'Precipitation',
	            data: this.precipitations,
	            visible: precipVisibility,
	            type: 'column',
	            color: '#4256f4',
	            yAxis: 1,
	            //pointPlacement: .3,
	            //groupPadding: 0,
	            pointPadding: 0.0,
	            grouping: false,
	            dataLabels: {
	                enabled: !meteogram.hasPrecipitationError,
	                formatter: function () {
	                    if (this.y > 0) {
	                        return this.y;
	                    }
	                },
	                style: {
	                    fontSize: '8px',
	                    color: 'gray'
	                }
	            },
	            tooltip: {
	                valueSuffix: ' %'
	            }
	        }, {
	            name: 'Humidity',
	            data: this.humidity,
	            visible: humidityVisibility,
	            type: 'column',
	            color: '#18CFE8',
	            yAxis: 1,
	            //pointPlacement: 0.7,
	            //groupPadding: 0,
	            pointPadding: 0.2,
	            grouping: false,
	            dataLabels: {
	                enabled: !meteogram.hasPrecipitationError,
	                formatter: function () {
	                    if (this.y > 0) {
	                        return this.y;
	                    }
	                },
	                style: {
	                    fontSize: '8px',
	                    color: 'gray'
	                }
	            },
	            tooltip: {
	                valueSuffix: ' %'
	            }
	        }, {
	            name: 'Cloud Cover',
	            data: this.cloudCover,
	            type: 'column',
	            color: 'white',
	            visible: cloudCoverVisibility,
	            yAxis: 1,
	            //pointPlacement: 1,
	            //groupPadding: 0,
	            pointPadding: 0.4,
	            grouping: false,
	            dataLabels: {
	                enabled: !meteogram.hasPrecipitationError,
	                formatter: function () {
	                    if (this.y > 0) {
	                        return this.y;
	                    }
	                },
	                style: {
	                    fontSize: '8px',
	                    color: 'gray'
	                }
	            },
	            tooltip: {
	                valueSuffix: ' %'
	            }
	        }, {
	            name: 'Pressure',
	            color: 'green',
	            type: "spline",
	            data: this.pressures,
	            visible: pressureVisibility,
	            marker: {
	                enabled: false
	            },
	            shadow: false,
	            tooltip: {
	                valueSuffix: ' mb'
	            },
	            dashStyle: 'shortdot',
	            yAxis: 2
	        }, {
	            name: 'Mean Wind',
	            type: 'windbarb',
	            id: 'windbarbs',
	            color: 'black',
	            lineWidth: 1.5,
	            data: this.meanWinds,
	            visible: meanWindVisibility,
	            vectorLength: 25,
	            yOffset: -435,
	            tooltip: {
	                valueSuffix: ' m/s'
	            }
	        }, {
	            name: 'Wind Gusts',
	            type: 'windbarb',
	            id: 'windbarbsGust',
	            color: 'red',
	            data: this.windGusts,
	            lineWidth: 1.5,
	            visible: windGustVisibility,
	            vectorLength: 25,
	            yOffset: -405,
	            tooltip: {
	                valueSuffix: ' m/s'
	            }
	        }]
	    };
	};
	
	/**
	 * Post-process the chart from the callback function, the second argument to Highcharts.Chart.
	 */
	//Meteogram.prototype.onChartLoad = function (chart) {
	function onChartLoad(chart) {
	
	    //this.drawWeatherSymbols(chart);
	    //this.drawBlocksForWindArrows(this.chart);
	
	};
	
	/**
	 * Create the chart. This function is called async when the data file is loaded and parsed.
	 */
	function createMGram() {
	    console.log("in createMGram")
		var meteogram = this;
	    this.chart = new Highcharts.Chart(this.getChartOptions(), function (chart) {
	        meteogram.onChartLoad(this.chart);
	    });
	};
	
	Meteogram.prototype.error = function () {
	    $('#loading').html('<i class="fa fa-frown-o"></i> Failed loading data, please try again later');
	};
	
	
	
	
	
	 // On DOM ready...
	
	// Set the hash to the yr.no URL we want to parse
	var place,
	    url;
	if (!location.hash) {
	    place = 'United_Kingdom/England/London';
	    //place = 'France/Rhône-Alpes/Val_d\'Isère~2971074';
	    //place = 'Norway/Sogn_og_Fjordane/Vik/Målset';
	    //place = 'United_States/California/San_Francisco';
	    //place = 'United_States/Minnesota/Minneapolis';
	
	    location.hash = 'https://www.yr.no/place/' + place + '/forecast_hour_by_hour.xml';
	}
	
	// Then get the XML file through Highcharts' CORS proxy. Our proxy is limited to
	// this specific location. Useing the third party, rate limited cors.io service
	// for experimenting with other locations.
	url = location.hash.substr(1);
	$.ajax({
	    dataType: 'xml',
	    url: url === 'https://www.yr.no/place/United_Kingdom/England/London/forecast_hour_by_hour.xml' ?
	        'https://www.highcharts.com/samples/data/cors.php?url=' + url :
	        'https://cors.io/?' + url,
	    success: function (xml) {
	        window.meteogram = new Meteogram(xml, 'container');
	    },
	    error: Meteogram.prototype.error
	});

	
	
