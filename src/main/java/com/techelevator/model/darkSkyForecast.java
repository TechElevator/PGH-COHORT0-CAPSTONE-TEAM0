package com.techelevator.model;

import java.util.ArrayList;

public class darkSkyForecast {

	private ArrayList<Integer> time;
	private ArrayList<Integer> highs;
	private ArrayList<Integer> lows;
	private ArrayList<Integer> meanWind;
	private ArrayList<Integer> gustWind;
	private ArrayList<Integer> windDirection;
	private ArrayList<String> summary;
	private ArrayList<Double> precipChance;
	private ArrayList<Double> precipIntensity;
	private ArrayList<String> precipType;
	private ArrayList<Integer> dewPoint;
	private ArrayList<Double> humidity;
	private ArrayList<Integer> pressure;
	private ArrayList<Double> cloudCover;
	private ArrayList<String> icon;
	
	public ArrayList<Integer> getTime() {
		return time;
	}
	public ArrayList<Integer> getHighs() {
		return highs;
	}
	public ArrayList<Integer> getLows() {
		return lows;
	}
	public ArrayList<Integer> getMeanWind() {
		return meanWind;
	}
	public ArrayList<Integer> getGustWind() {
		return gustWind;
	}
	public ArrayList<Integer> getWindDirection() {
		return windDirection;
	}
	public ArrayList<String> getSummary() {
		return summary;
	}
	public ArrayList<Double> getPrecipChance() {
		return precipChance;
	}
	public ArrayList<Double> getPrecipIntensity() {
		return precipIntensity;
	}
	public ArrayList<String> getPrecipType() {
		return precipType;
	}
	public ArrayList<Integer> getDewPoint() {
		return dewPoint;
	}
	public ArrayList<Double> getHumidity() {
		return humidity;
	}
	public ArrayList<Integer> getPressure() {
		return pressure;
	}
	public ArrayList<Double> getCloudCover() {
		return cloudCover;
	}
	public ArrayList<String> getIcon() {
		return icon;
	}
	public void setTime(ArrayList<Integer> time) {
		this.time = time;
	}
	public void setHighs(ArrayList<Integer> highs) {
		this.highs = highs;
	}
	public void setLows(ArrayList<Integer> lows) {
		this.lows = lows;
	}
	public void setMeanWind(ArrayList<Integer> meanWind) {
		this.meanWind = meanWind;
	}
	public void setGustWind(ArrayList<Integer> gustWind) {
		this.gustWind = gustWind;
	}
	public void setWindDirection(ArrayList<Integer> windDirection) {
		this.windDirection = windDirection;
	}
	public void setSummary(ArrayList<String> summary) {
		this.summary = summary;
	}
	public void setPrecipChance(ArrayList<Double> precipChance) {
		this.precipChance = precipChance;
	}
	public void setPrecipIntensity(ArrayList<Double> precipIntensity) {
		this.precipIntensity = precipIntensity;
	}
	public void setPrecipType(ArrayList<String> precipType) {
		this.precipType = precipType;
	}
	public void setDewPoint(ArrayList<Integer> dewPoint) {
		this.dewPoint = dewPoint;
	}
	public void setHumidity(ArrayList<Double> humidity) {
		this.humidity = humidity;
	}
	public void setPressure(ArrayList<Integer> pressure) {
		this.pressure = pressure;
	}
	public void setCloudCover(ArrayList<Double> cloudCover) {
		this.cloudCover = cloudCover;
	}
	public void setIcon(ArrayList<String> icon) {
		this.icon = icon;
	}
	
	
	
}
