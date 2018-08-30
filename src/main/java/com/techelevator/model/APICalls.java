package com.techelevator.model;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.omg.CORBA.portable.InputStream;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;


public class APICalls {

	public void retrieveStationID(String latLon) {
		System.out.println("Now starting API call test: ");
		URL obj = null;
		String url = "https://api.weather.gov//points/" + latLon + "/stations";
		try {
			obj = new URL(url);
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			System.out.println("You messed up - malformed url exception");
			e.printStackTrace();
		}
		HttpURLConnection con = null;
		try {
			con = (HttpURLConnection) obj.openConnection();
		} catch (IOException e) {
			System.out.println("You messed up - IOE exception");
			e.printStackTrace();
		}
		try {
			con.setRequestMethod("GET");
		} catch (ProtocolException e) {
			System.out.println("You messed up - Protocol exception");
			e.printStackTrace();
		}
		
		BufferedReader in = null;
		try {
			in = new BufferedReader( new InputStreamReader(con.getInputStream()));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String inputLine;
		StringBuffer response = new StringBuffer();
		try {
			while ((inputLine = in.readLine()) != null) {
				response.append(inputLine);
			}
		} catch (IOException e1) {
			System.out.println("messed up, IOException when tyring while inputline = in.readline");
			e1.printStackTrace();
		}
		try {
			in.close();
		} catch (IOException e) {
			System.out.println("Messed up, IOexception when trying to close in");
			e.printStackTrace();
		}
		System.out.println(response.toString());
		
		
		ObjectMapper objMapper = new ObjectMapper();
		AlertFromAPI apiAlert = new AlertFromAPI();
		try {
			apiAlert = objMapper.readValue(response.toString(), AlertFromAPI.class);
		} catch (JsonParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e) {
			System.out.println("You messed up - JsonMappingException");
			e.printStackTrace();
		} catch (IOException e) {
			System.out.println("You messed up - IOException when trying");
			e.printStackTrace();
		}
		
		System.out.println("");
		System.out.println("Type: " + apiAlert.getType());
		System.out.println("Features: " + apiAlert.getFeatures());
		System.out.println("Title: " + apiAlert.getTitle());
		System.out.println("Updated: " + apiAlert.getUpdated());
		
	
	
	}
	
	
	/*
	public void retrieveStationID(String latLon) {
		System.out.println("Now starting API call test: ");
		URL obj = null;
		String url = "https://api.weather.gov//points/" + latLon + "/stations";
		try {
			obj = new URL(url);
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			System.out.println("You messed up - malformed url exception");
			e.printStackTrace();
		}
		HttpURLConnection con = null;
		try {
			con = (HttpURLConnection) obj.openConnection();
		} catch (IOException e) {
			System.out.println("You messed up - IOE exception");
			e.printStackTrace();
		}
		try {
			con.setRequestMethod("GET");
		} catch (ProtocolException e) {
			System.out.println("You messed up - Protocol exception");
			e.printStackTrace();
		}
		
		BufferedReader in = null;
		try {
			in = new BufferedReader( new InputStreamReader(con.getInputStream()));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		String inputLine;
		StringBuffer response = new StringBuffer();
		try {
			while ((inputLine = in.readLine()) != null) {
				response.append(inputLine);
			}
		} catch (IOException e1) {
			System.out.println("messed up, IOException when tyring while inputline = in.readline");
			e1.printStackTrace();
		}
		try {
			in.close();
		} catch (IOException e) {
			System.out.println("Messed up, IOexception when trying to close in");
			e.printStackTrace();
		}
		System.out.println(response.toString());
		
		/*
		ObjectMapper objMapper = new ObjectMapper();
		AlertFromAPI apiAlert = new AlertFromAPI();
		try {
			apiAlert = objMapper.readValue(response.toString(), AlertFromAPI.class);
		} catch (JsonParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JsonMappingException e) {
			System.out.println("You messed up - JsonMappingException");
			e.printStackTrace();
		} catch (IOException e) {
			System.out.println("You messed up - IOException when trying");
			e.printStackTrace();
		}
		
		System.out.println("");
		System.out.println("Type: " + apiAlert.getType());
		System.out.println("Features: " + apiAlert.getFeatures());
		System.out.println("Title: " + apiAlert.getTitle());
		System.out.println("Updated: " + apiAlert.getUpdated());
		*/
	
	
	//}
	
	
	//THIS IS FOR THE WEATHER.GOV API
	public DailyForecast retrieveDailyForecastFromNWS(String latLon) {
		DailyForecast dailyForecast = new DailyForecast();
		System.out.println("Now starting API call test for forecast: ");
		
		URL obj = null;
		String url = "https://api.weather.gov//points/" + latLon + "/forecast";
		try {
			obj = new URL(url);
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			System.out.println("Malformed url exception");
			e.printStackTrace();
		}
		HttpURLConnection con = null;
		try {
			con = (HttpURLConnection) obj.openConnection();
		} catch (IOException e) {
			System.out.println("IOE exception");
			e.printStackTrace();
		}
		try {
			con.setRequestMethod("GET");
		} catch (ProtocolException e) {
			System.out.println("Protocol exception");
			e.printStackTrace();
		}
		
		BufferedReader in = null;
		try {
			in = new BufferedReader( new InputStreamReader(con.getInputStream()));
		} catch (IOException e) {
			e.printStackTrace();
		}
		String inputLine;
		StringBuffer response = new StringBuffer();
		try {
			while ((inputLine = in.readLine()) != null) {
				response.append(inputLine);
			}
		} catch (IOException e1) {
			System.out.println("OException when tyring while inputline = in.readline");
			e1.printStackTrace();
		}
		try {
			in.close();
		} catch (IOException e) {
			System.out.println("IOexception when trying to close in");
			e.printStackTrace();
		}
		//System.out.println(response.toString());
		
		JSONParser parser = new JSONParser();
		JSONObject jsonObj = null;
		JSONArray jsonArr = null;
		try {
			jsonObj = (JSONObject) parser.parse(response.toString());
			//System.out.println("SUCCESSFULLY GOT PAST JSON OBJ");
			//System.out.println(jsonObj.get("properties"));
			
			JSONObject jsonObjNested = (JSONObject) jsonObj.get("properties");
			jsonArr = (JSONArray) jsonObjNested.get("periods");
			
			
			//System.out.println("SUCCESSFULLY GOT PAST JSON Arr");
			if (jsonArr == null) {
				//System.out.println("nested object is null");
			} else {
				//System.out.println("nested object IS NOT NULL!");
			}
			System.out.println(jsonArr.toJSONString());
			
		} catch (ParseException e) {
			System.out.println("Parse exception");
			e.printStackTrace();
		}
		
		
		ArrayList<Integer> highTemps = new ArrayList<Integer>();
		ArrayList<Integer> lowTemps = new ArrayList<Integer>();
		ArrayList<String> forecastDays = new ArrayList<String>();
		
		
		//Iterate through forecast days
		for (int i = 0; i < jsonArr.size(); i ++) {
			//System.out.println(i);
			JSONObject currentForecast = (JSONObject) jsonArr.get(i);
			//System.out.println(currentForecast.toJSONString());
			String test = (String) currentForecast.get("detailedForecast");
			//System.out.println(test);
			
			//System.out.println("before if statements, i is: " + i);
			if (i == 0) {
				//System.out.println("i is 0");
				forecastDays.add("Today");			
				Long temperature = (Long) currentForecast.get("temperature");
				highTemps.add((int) (long) temperature);
			} else if (i % 2 == 0) {
				//System.out.println("(even) i is: " + i);
				forecastDays.add((String) currentForecast.get("name"));
				Long temperature = (Long) currentForecast.get("temperature");
				highTemps.add((int) (long) temperature);
			} else {
				//System.out.println("(odd) i is " + i);
				Long temperature = (Long) currentForecast.get("temperature");
				lowTemps.add((int) (long) temperature);
			}
			
			//System.out.println("-------------------------------------");
			
		}
		
		//System.out.println("IN API CALLS, FORECASTDAYS LENGTH: " + forecastDays.size());
		
		dailyForecast.setForecastDay(forecastDays);
		dailyForecast.setHighs(highTemps);
		dailyForecast.setLow(lowTemps);
		
		System.out.println(dailyForecast.getHighs().get(0));
		System.out.println(dailyForecast.getLow().get(0));
		System.out.println(dailyForecast.getHighs().get(1));
		System.out.println(dailyForecast.getLow().get(1));
		
		return dailyForecast;
		
	}
	
	
	//THIS IS FOR THE DARKSKY API
		public darkSkyForecast retrieveDailyForecastFromDarkSky(String latLon) {
			darkSkyForecast dailyForecast = new darkSkyForecast();
			System.out.println("Now starting API call test for forecast!!: ");
			
			URL obj = null;
			String url = "https://api.darksky.net/forecast/7dd0bbccb34922418a87a9089a43068e/" + latLon;
			try {
				obj = new URL(url);
			} catch (MalformedURLException e) {
				// TODO Auto-generated catch block
				System.out.println("Malformed url exception");
				e.printStackTrace();
			}
			HttpURLConnection con = null;
			try {
				con = (HttpURLConnection) obj.openConnection();
			} catch (IOException e) {
				System.out.println("IOE exception");
				e.printStackTrace();
			}
			try {
				con.setRequestMethod("GET");
			} catch (ProtocolException e) {
				System.out.println("Protocol exception");
				e.printStackTrace();
			}
			
			BufferedReader in = null;
			try {
				in = new BufferedReader( new InputStreamReader(con.getInputStream()));
			} catch (IOException e) {
				e.printStackTrace();
			}
			String inputLine;
			StringBuffer response = new StringBuffer();
			try {
				while ((inputLine = in.readLine()) != null) {
					response.append(inputLine);
				}
			} catch (IOException e1) {
				System.out.println("OException when tyring while inputline = in.readline");
				e1.printStackTrace();
			}
			try {
				in.close();
			} catch (IOException e) {
				System.out.println("IOexception when trying to close in");
				e.printStackTrace();
			}
			//System.out.println(response.toString());
			
			JSONParser parser = new JSONParser();
			JSONObject jsonObj = null;
			JSONArray jsonArr = null;
			try {
				jsonObj = (JSONObject) parser.parse(response.toString());
				//System.out.println("SUCCESSFULLY GOT PAST JSON OBJ");
				//System.out.println(jsonObj.get("properties"));
				
				System.out.println(jsonObj.toJSONString());
				
				JSONObject jsonObjNested = (JSONObject) jsonObj.get("daily");
				jsonArr = (JSONArray) jsonObjNested.get("data");
				
				
				//System.out.println("SUCCESSFULLY GOT PAST JSON Arr");
				if (jsonArr == null) {
					//System.out.println("nested object is null");
				} else {
					//System.out.println("nested object IS NOT NULL!");
				}
				System.out.println(jsonArr.toJSONString());
				
			} catch (ParseException e) {
				System.out.println("Parse exception");
				e.printStackTrace();
			}
			
			ArrayList<String> dayOfWeek = new ArrayList<String>();
			ArrayList<Integer> time = new ArrayList<Integer>();
			ArrayList<Integer> highTemp = new ArrayList<Integer>();
			ArrayList<Integer> lowTemp = new ArrayList<Integer>();
			ArrayList<Integer> meanWind = new ArrayList<Integer>();
			ArrayList<Integer> windGust = new ArrayList<Integer>();
			ArrayList<Integer> windDirection = new ArrayList<Integer>();
			ArrayList<String> summary = new ArrayList<String>();
			ArrayList<Double> precipChance = new ArrayList<Double>();
			ArrayList<Double> precipIntensity = new ArrayList<Double>();
			ArrayList<String> precipType = new ArrayList<String>();
			ArrayList<Integer> dewPoint = new ArrayList<Integer>();
			ArrayList<Double> humidity = new ArrayList<Double>();
			ArrayList<Integer> pressure = new ArrayList<Integer>();
			ArrayList<Double> cloudCover = new ArrayList<Double>();
			
			
			//Iterate through forecast days
			for (int i = 0; i < jsonArr.size(); i ++) {
				//System.out.println(i);
				JSONObject currentForecast = (JSONObject) jsonArr.get(i);
				//System.out.println(currentForecast.toJSONString());
				String test = (String) currentForecast.get("detailedForecast");
				//System.out.println(test);
				
				time.add((Integer) (int) (long) currentForecast.get("time"));
				highTemp.add(((Number) currentForecast.get("temperatureHigh")).intValue());
				lowTemp.add(((Number) currentForecast.get("temperatureLow")).intValue());
				meanWind.add(((Number) currentForecast.get("windSpeed")).intValue());
				windGust.add(((Number) currentForecast.get("windGust")).intValue());
				windDirection.add(((Number) currentForecast.get("windBearing")).intValue());
				precipChance.add(((Number) currentForecast.get("precipProbability")).doubleValue());
				precipIntensity.add(((Number) currentForecast.get("precipIntensity")).doubleValue());
				dewPoint.add(((Number) currentForecast.get("dewPoint")).intValue());
				humidity.add(((Number) currentForecast.get("humidity")).doubleValue());
				pressure.add(((Number) currentForecast.get("pressure")).intValue());
				cloudCover.add(((Number) currentForecast.get("cloudCover")).doubleValue());
				precipType.add((String) currentForecast.get("precipType"));
				summary.add((String) currentForecast.get("summary"));
				//dayOfWeek.add((String) currentForecast.get("temperatureHigh"));
				
				System.out.println(highTemp.get(i));
				
			}
			
			//System.out.println("IN API CALLS, FORECASTDAYS LENGTH: " + forecastDays.size());
			
			//dailyForecast.setForecastDay(forecastDays);
			dailyForecast.setHighs(highTemp);
			dailyForecast.setLows(lowTemp);
			dailyForecast.setMeanWind(meanWind);
			dailyForecast.setGustWind(windGust);
			dailyForecast.setWindDirection(windDirection);
			dailyForecast.setPrecipChance(precipChance);
			dailyForecast.setPrecipIntensity(precipIntensity);
			dailyForecast.setDewPoint(dewPoint);
			dailyForecast.setHumidity(humidity);
			dailyForecast.setPressure(pressure);
			dailyForecast.setCloudCover(cloudCover);
			dailyForecast.setPrecipType(precipType);
			dailyForecast.setTime(time);
			dailyForecast.setSummary(summary);

			//System.out.println(dailyForecast.getHighs().get(0));
			//System.out.println(dailyForecast.getLow().get(0));
			//System.out.println(dailyForecast.getHighs().get(1));
			System.out.println(dailyForecast.getLows().get(1));
			
			return dailyForecast;
			
		}
		
		public darkSkyForecast retrieveCurrentConditionsFromDarkSky(String latLon) {
			darkSkyForecast currentConditions = new darkSkyForecast();
			System.out.println("Now starting API call test for forecast!!: ");
			
			URL obj = null;
			String url = "https://api.darksky.net/forecast/7dd0bbccb34922418a87a9089a43068e/" + latLon;
			try {
				obj = new URL(url);
			} catch (MalformedURLException e) {
				// TODO Auto-generated catch block
				System.out.println("Malformed url exception");
				e.printStackTrace();
			}
			HttpURLConnection con = null;
			try {
				con = (HttpURLConnection) obj.openConnection();
			} catch (IOException e) {
				System.out.println("IOE exception");
				e.printStackTrace();
			}
			try {
				con.setRequestMethod("GET");
			} catch (ProtocolException e) {
				System.out.println("Protocol exception");
				e.printStackTrace();
			}
			
			BufferedReader in = null;
			try {
				in = new BufferedReader( new InputStreamReader(con.getInputStream()));
			} catch (IOException e) {
				e.printStackTrace();
			}
			String inputLine;
			StringBuffer response = new StringBuffer();
			try {
				while ((inputLine = in.readLine()) != null) {
					response.append(inputLine);
				}
			} catch (IOException e1) {
				System.out.println("OException when tyring while inputline = in.readline");
				e1.printStackTrace();
			}
			try {
				in.close();
			} catch (IOException e) {
				System.out.println("IOexception when trying to close in");
				e.printStackTrace();
			}
			//System.out.println(response.toString());
			
			JSONParser parser = new JSONParser();
			JSONObject jsonObj = null;
			JSONArray jsonArr = null;
			JSONObject jsonObjNested = null;
			try {
				jsonObj = (JSONObject) parser.parse(response.toString());
				//System.out.println("SUCCESSFULLY GOT PAST JSON OBJ");
				//System.out.println(jsonObj.get("properties"));
				
				System.out.println(jsonObj.toJSONString());
				
				jsonObjNested = (JSONObject) jsonObj.get("currently");
				
				System.out.println("jsonObjNestedIs: ");
				System.out.println(jsonObjNested.toJSONString());
				
				
				
				
				//System.out.println("SUCCESSFULLY GOT PAST JSON Arr");
				if (jsonArr == null) {
					//System.out.println("nested object is null");
				} else {
					//System.out.println("nested object IS NOT NULL!");
				}
				//System.out.println(jsonArr.toJSONString());
				
			} catch (ParseException e) {
				System.out.println("Parse exception");
				e.printStackTrace();
			}
			
			ArrayList<String> dayOfWeek = new ArrayList<String>();
			ArrayList<Integer> time = new ArrayList<Integer>();
			ArrayList<Integer> highTemp = new ArrayList<Integer>();
			ArrayList<Integer> lowTemp = new ArrayList<Integer>();
			ArrayList<Integer> meanWind = new ArrayList<Integer>();
			ArrayList<Integer> windGust = new ArrayList<Integer>();
			ArrayList<Integer> windDirection = new ArrayList<Integer>();
			ArrayList<String> summary = new ArrayList<String>();
			ArrayList<Double> precipChance = new ArrayList<Double>();
			ArrayList<Double> precipIntensity = new ArrayList<Double>();
			ArrayList<String> precipType = new ArrayList<String>();
			ArrayList<Integer> dewPoint = new ArrayList<Integer>();
			ArrayList<Double> humidity = new ArrayList<Double>();
			ArrayList<Integer> pressure = new ArrayList<Integer>();
			ArrayList<Double> cloudCover = new ArrayList<Double>();
			
			
			//Iterate through forecast days
			//for (int i = 0; i < jsonObjNested.size(); i ++) {
				//System.out.println(i);
				JSONObject currentForecast = (JSONObject) jsonObjNested;
				//System.out.println(currentForecast.toJSONString());
				//String test = (String) currentForecast.get("detailedForecast");
				System.out.println("current forecast is: " + currentForecast);
				
				//time.add((Integer) (int) (long) currentForecast.get("time"));
				highTemp.add(((Number) currentForecast.get("temperature")).intValue());
				//lowTemp.add(((Number) currentForecast.get("temperatureLow")).intValue());
				meanWind.add(((Number) currentForecast.get("windSpeed")).intValue());
				windGust.add(((Number) currentForecast.get("windGust")).intValue());
				windDirection.add(((Number) currentForecast.get("windBearing")).intValue());
				precipChance.add(((Number) currentForecast.get("precipProbability")).doubleValue());
				//precipIntensity.add((Double) (double) currentForecast.get("precipIntensity"));
				//dewPoint.add((Integer) (int) (double) currentForecast.get("dewPoint"));
				humidity.add(((Number) currentForecast.get("humidity")).doubleValue());
				//pressure.add(((Number) currentForecast.get("pressure")).intValue());
				cloudCover.add(((Number) currentForecast.get("cloudCover")).doubleValue());
				//precipType.add((String) currentForecast.get("precipType"));
				summary.add((String) currentForecast.get("summary"));
				//dayOfWeek.add((String) currentForecast.get("temperatureHigh"));
				
				System.out.println("high temp is: " + highTemp);
				
			//}
			
			//System.out.println("IN API CALLS, FORECASTDAYS LENGTH: " + forecastDays.size());
			
			//dailyForecast.setForecastDay(forecastDays);
			currentConditions.setHighs(highTemp);
			//currentConditions.setLows(lowTemp);
			currentConditions.setMeanWind(meanWind);
			currentConditions.setGustWind(windGust);
			currentConditions.setWindDirection(windDirection);
			currentConditions.setPrecipChance(precipChance);
			//currentConditions.setPrecipIntensity(precipIntensity);
			//currentConditions.setDewPoint(dewPoint);
			currentConditions.setHumidity(humidity);
			//currentConditions.setPressure(pressure);
			currentConditions.setCloudCover(cloudCover);
			//currentConditions.setPrecipType(precipType);
			//currentConditions.setTime(time);

			//System.out.println(dailyForecast.getHighs().get(0));
			//System.out.println(dailyForecast.getLow().get(0));
			//System.out.println(dailyForecast.getHighs().get(1));
			//System.out.println(currentConditions.getLows().get(1));
			
			return currentConditions;
			
		}
		
		public darkSkyForecast retrieveHistoricalConditionsFromDarkSky(String latLon, Long unixTime) {
			darkSkyForecast historicalForecast = new darkSkyForecast();
			ArrayList<Long> unixTimes = new ArrayList<Long>();
			Long secondsInDay = (long) 86400;
			
			ArrayList<String> dayOfWeek = new ArrayList<String>();
			ArrayList<Integer> time = new ArrayList<Integer>();
			ArrayList<Integer> highTemp = new ArrayList<Integer>();
			ArrayList<Integer> lowTemp = new ArrayList<Integer>();
			ArrayList<Integer> meanWind = new ArrayList<Integer>();
			ArrayList<Integer> windGust = new ArrayList<Integer>();
			ArrayList<Integer> windDirection = new ArrayList<Integer>();
			ArrayList<String> summary = new ArrayList<String>();
			ArrayList<Double> precipChance = new ArrayList<Double>();
			ArrayList<Double> precipIntensity = new ArrayList<Double>();
			ArrayList<String> precipType = new ArrayList<String>();
			ArrayList<Integer> dewPoint = new ArrayList<Integer>();
			ArrayList<Double> humidity = new ArrayList<Double>();
			ArrayList<Integer> pressure = new ArrayList<Integer>();
			ArrayList<Double> cloudCover = new ArrayList<Double>();
			
			System.out.println("Now starting API call for historic data: ");
			
			for (int i = 1; i <= 7; i++) {
			
				URL obj = null;
				String url = "https://api.darksky.net/forecast/7dd0bbccb34922418a87a9089a43068e/" + latLon + "," + (unixTime + (i * secondsInDay));
				try {
					obj = new URL(url);
				} catch (MalformedURLException e) {
					// TODO Auto-generated catch block
					System.out.println("Malformed url exception");
					e.printStackTrace();
				}
				HttpURLConnection con = null;
				try {
					con = (HttpURLConnection) obj.openConnection();
				} catch (IOException e) {
					System.out.println("IOE exception");
					e.printStackTrace();
				}
				try {
					con.setRequestMethod("GET");
				} catch (ProtocolException e) {
					System.out.println("Protocol exception");
					e.printStackTrace();
				}
				
				BufferedReader in = null;
				try {
					in = new BufferedReader( new InputStreamReader(con.getInputStream()));
				} catch (IOException e) {
					e.printStackTrace();
				}
				String inputLine;
				StringBuffer response = new StringBuffer();
				try {
					while ((inputLine = in.readLine()) != null) {
						response.append(inputLine);
					}
				} catch (IOException e1) {
					System.out.println("OException when tyring while inputline = in.readline");
					e1.printStackTrace();
				}
				try {
					in.close();
				} catch (IOException e) {
					System.out.println("IOexception when trying to close in");
					e.printStackTrace();
				}
				//System.out.println(response.toString());
				
				JSONParser parser = new JSONParser();
				JSONObject jsonObj = null;
				JSONArray jsonArr = null;
				try {
					jsonObj = (JSONObject) parser.parse(response.toString());
					//System.out.println("SUCCESSFULLY GOT PAST JSON OBJ");
					//System.out.println(jsonObj.get("properties"));
					
					System.out.println(jsonObj.toJSONString());
					
					JSONObject jsonObjNested = (JSONObject) jsonObj.get("daily");
					jsonArr = (JSONArray) jsonObjNested.get("data");
					
					
					//System.out.println("SUCCESSFULLY GOT PAST JSON Arr");
					if (jsonArr == null) {
						//System.out.println("nested object is null");
					} else {
						//System.out.println("nested object IS NOT NULL!");
					}
					System.out.println(jsonArr.toJSONString());
					
				} catch (ParseException e) {
					System.out.println("Parse exception");
					e.printStackTrace();
				}
				
				
				
				
				//Iterate through forecast days
				for (int j = 0; j < jsonArr.size(); j ++) {
					//System.out.println(i);
					JSONObject currentForecast = (JSONObject) jsonArr.get(j);
					//System.out.println(currentForecast.toJSONString());
					String test = (String) currentForecast.get("detailedForecast");
					//System.out.println(test);
					System.out.println("======THIS IS THE JSON STRING:");
					System.out.println(currentForecast.toJSONString());
					
					
					time.add((Integer) (int) (long) currentForecast.get("time"));
					highTemp.add((Integer) (int) (double) currentForecast.get("temperatureHigh"));
					lowTemp.add((Integer) (int) (double) currentForecast.get("temperatureLow"));
					meanWind.add(((Number) currentForecast.get("windSpeed")).intValue());
					//windGust.add(((Number) currentForecast.get("windGust")).intValue());
					//windGust.add(100);
					windDirection.add((Integer) (int) (long) currentForecast.get("windBearing"));
					precipChance.add(((Number) currentForecast.get("precipProbability")).doubleValue());
					precipIntensity.add(((Number) currentForecast.get("precipIntensity")).doubleValue());
					dewPoint.add(((Number) currentForecast.get("dewPoint")).intValue());
					humidity.add(((Number) currentForecast.get("humidity")).doubleValue());
					pressure.add(((Number) currentForecast.get("pressure")).intValue());
					cloudCover.add(((Number) currentForecast.get("cloudCover")).doubleValue());
					precipType.add((String) currentForecast.get("precipType"));
					summary.add((String) currentForecast.get("summary"));
					//dayOfWeek.add((String) currentForecast.get("temperatureHigh"));
					
					System.out.println(highTemp.get(j));
					
				}
				
			}
			
			//System.out.println("IN API CALLS, FORECASTDAYS LENGTH: " + forecastDays.size());
			
			//dailyForecast.setForecastDay(forecastDays);
			historicalForecast.setHighs(highTemp);
			historicalForecast.setLows(lowTemp);
			historicalForecast.setMeanWind(meanWind);
			//historicalForecast.setGustWind(windGust);
			historicalForecast.setWindDirection(windDirection);
			historicalForecast.setPrecipChance(precipChance);
			historicalForecast.setPrecipIntensity(precipIntensity);
			historicalForecast.setDewPoint(dewPoint);
			historicalForecast.setHumidity(humidity);
			historicalForecast.setPressure(pressure);
			historicalForecast.setCloudCover(cloudCover);
			historicalForecast.setPrecipType(precipType);
			historicalForecast.setTime(time);
			historicalForecast.setSummary(summary);

			//System.out.println(historicalForecast.getHighs().get(0));
			//System.out.println(historicalForecast.getLow().get(0));
			//System.out.println(historicalForecast.getHighs().get(1));
			System.out.println(historicalForecast.getLows().get(1));
			
			return historicalForecast;
			
				
			
		}
	
}
