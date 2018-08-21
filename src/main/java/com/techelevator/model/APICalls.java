package com.techelevator.model;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.net.URLConnection;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
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
	}
	
	public void retrieveDailyForecast(String latLon) {
		System.out.println("Now starting API call test for forecast: ");
		
		URL obj = null;
		String url = "https://api.weather.gov//points/" + latLon + "/forecast";
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
		
	}
	
}
