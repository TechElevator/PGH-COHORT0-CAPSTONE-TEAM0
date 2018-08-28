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
	
	/*
	}
	
	
//	
//	public DailyForecast retrieveDailyForecast(String latLon, DailyForecast dailyForecast) {
//		System.out.println("Now starting API call test for forecast: ");
//		
//		URL obj = null;
//		String url = "https://api.weather.gov//points/" + latLon + "/forecast";
//		try {
//			obj = new URL(url);
//		} catch (MalformedURLException e) {
//			// TODO Auto-generated catch block
//			System.out.println("Malformed url exception");
//			e.printStackTrace();
//		}
//		HttpURLConnection con = null;
//		try {
//			con = (HttpURLConnection) obj.openConnection();
//		} catch (IOException e) {
//			System.out.println("IOE exception");
//			e.printStackTrace();
//		}
//		try {
//			con.setRequestMethod("GET");
//		} catch (ProtocolException e) {
//			System.out.println("Protocol exception");
//			e.printStackTrace();
//		}
//		
//		BufferedReader in = null;
//		try {
//			in = new BufferedReader( new InputStreamReader(con.getInputStream()));
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//		String inputLine;
//		StringBuffer response = new StringBuffer();
//		try {
//			while ((inputLine = in.readLine()) != null) {
//				response.append(inputLine);
//			}
//		} catch (IOException e1) {
//			System.out.println("OException when tyring while inputline = in.readline");
//			e1.printStackTrace();
//		}
//		try {
//			in.close();
//		} catch (IOException e) {
//			System.out.println("IOexception when trying to close in");
//			e.printStackTrace();
//		}
//		//System.out.println(response.toString());
//		
//		JSONParser parser = new JSONParser();
//		JSONObject jsonObj = null;
//		JSONArray jsonArr = null;
//		try {
//			jsonObj = (JSONObject) parser.parse(response.toString());
//			//System.out.println("SUCCESSFULLY GOT PAST JSON OBJ");
//			//System.out.println(jsonObj.get("properties"));
//			
//			JSONObject jsonObjNested = (JSONObject) jsonObj.get("properties");
//			jsonArr = (JSONArray) jsonObjNested.get("periods");
//			
//			
//			//System.out.println("SUCCESSFULLY GOT PAST JSON Arr");
//			if (jsonArr == null) {
//				//System.out.println("nested object is null");
//			} else {
//				//System.out.println("nested object IS NOT NULL!");
//			}
//			System.out.println(jsonArr.toJSONString());
//			
//		} catch (ParseException e) {
//			System.out.println("Parse exception");
//			e.printStackTrace();
//		}
//		
//		
//		ArrayList<Integer> highTemps = new ArrayList<Integer>();
//		ArrayList<Integer> lowTemps = new ArrayList<Integer>();
//		ArrayList<String> forecastDays = new ArrayList<String>();
//		
//		
//		//Iterate through forecast days
//		for (int i = 0; i < jsonArr.size(); i ++) {
//			//System.out.println(i);
//			JSONObject currentForecast = (JSONObject) jsonArr.get(i);
//			//System.out.println(currentForecast.toJSONString());
//			String test = (String) currentForecast.get("detailedForecast");
//			//System.out.println(test);
//			
//			//System.out.println("before if statements, i is: " + i);
//			if (i == 0) {
//				//System.out.println("i is 0");
//				forecastDays.add("Today");			
//				Long temperature = (Long) currentForecast.get("temperature");
//				highTemps.add((int) (long) temperature);
//			} else if (i % 2 == 0) {
//				//System.out.println("(even) i is: " + i);
//				forecastDays.add((String) currentForecast.get("name"));
//				Long temperature = (Long) currentForecast.get("temperature");
//				highTemps.add((int) (long) temperature);
//			} else {
//				//System.out.println("(odd) i is " + i);
//				Long temperature = (Long) currentForecast.get("temperature");
//				lowTemps.add((int) (long) temperature);
//			}
//			
//			//System.out.println("-------------------------------------");
//			
//		}
//		
//		//System.out.println("IN API CALLS, FORECASTDAYS LENGTH: " + forecastDays.size());
//		
//		dailyForecast.setForecastDay(forecastDays);
//		dailyForecast.setHighs(highTemps);
//		dailyForecast.setLow(lowTemps);
//		
//		return dailyForecast;
*/		
//	}
	
}
