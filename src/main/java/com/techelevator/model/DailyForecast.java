package com.techelevator.model;

import java.util.ArrayList;

public class DailyForecast {

	private ArrayList<String> forecastDay;
	private ArrayList<Integer> highs;
	private ArrayList<Integer> low;
	private ArrayList<Integer> windSpeed;
	private ArrayList<String> windDirection;
	private ArrayList<String> shortDescription;
	private ArrayList<String> longDescription;
	
	public ArrayList<String> getForecastDay() {
		return forecastDay;
	}
	public ArrayList<Integer> getHighs() {
		return highs;
	}
	public ArrayList<Integer> getLow() {
		return low;
	}
	public ArrayList<Integer> getWindSpeed() {
		return windSpeed;
	}
	public ArrayList<String> getWindDirection() {
		return windDirection;
	}
	public ArrayList<String> getShortDescription() {
		return shortDescription;
	}
	public ArrayList<String> getLongDescription() {
		return longDescription;
	}
	public void setForecastDay(ArrayList<String> forecastDay) {
		this.forecastDay = forecastDay;
	}
	public void setHighs(ArrayList<Integer> highs) {
		this.highs = highs;
	}
	public void setLow(ArrayList<Integer> low) {
		this.low = low;
	}
	public void setWindSpeed(ArrayList<Integer> windSpeed) {
		this.windSpeed = windSpeed;
	}
	public void setWindDirection(ArrayList<String> windDirection) {
		this.windDirection = windDirection;
	}
	public void setShortDescription(ArrayList<String> shortDescription) {
		this.shortDescription = shortDescription;
	}
	public void setLongDescription(ArrayList<String> longDescription) {
		this.longDescription = longDescription;
	}
	
	
	
}
