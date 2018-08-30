var latitude = $("#userData").data("latitude");
var longitude = $("#userData").data("longitude");

function loadMapScenario() {
                
				console.log(latitude);
				console.log(longitude);
	
				var map = new Microsoft.Maps.Map(document.getElementById('liveRadar'), {
                    /* No need to set credentials if already passed in URL */
                    center: new Microsoft.Maps.Location(latitude, longitude),
                    zoom: 7,
                    mapTypeId: Microsoft.Maps.MapTypeId.canvasDark });
                var pushpin = new Microsoft.Maps.Pushpin(map.getCenter(), { color: 'yellow'});
                map.entities.push(pushpin);
                // tile url from Iowa Environmental Mesonet of Iowa State University
                var urlTemplate = 'https://mesonet.agron.iastate.edu/cache/tile.py/1.0.0/nexrad-n0q-{timestamp}/{zoom}/{x}/{y}.png';
                var timestamps = ['900913-m50m', '900913-m45m', '900913-m40m', '900913-m35m', '900913-m30m', '900913-m25m', '900913-m20m', '900913-m15m', '900913-m10m', '900913-m05m', '900913'];
                var tileSources = [];
                for (var i = 0; i < timestamps.length; i++) {
                    var tileSource = new Microsoft.Maps.TileSource({
                        uriConstructor: urlTemplate.replace('{timestamp}', timestamps[i])
                    });
                    tileSources.push(tileSource);
                }
                var animatedLayer = new Microsoft.Maps.AnimatedTileLayer({ mercator: tileSources, frameRate: 500 });
                map.layers.insert(animatedLayer);
                
            }