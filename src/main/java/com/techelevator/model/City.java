package com.techelevator.model;


public class City {
	
	private long cityId;
	private String cityName;
	private String stateId;
	private String stateName;
	private double latitude;
	private double longitude;
	private long population;
	private double density;
	private String timezone;
	
	
	public long getCityId() {
		return this.cityId;
	}
	public void setCityId(long cityId) {
		this.cityId = cityId;
	}
	public String getCityName() {
		return this.cityName;
	}
	public void setCityName(String cityName) {
		this.cityName = cityName;
	}
	public String getStateId() {
		return this.stateId;
	}
	public void setStateId(String stateId) {
		this.stateId = stateId;
	}
	public String getStateName() {
		return this.stateName;
	}
	public void setStateName(String stateName) {
		this.stateName = stateName;
	}
	public double getLatitude() {
		return this.latitude;
	}
	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}
	public double getLongitude() {
		return this.longitude;
	}
	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}
	public long getPopulation() {
		return this.population;
	}
	public void setPopulation(double population) {
		this.population = (long)population;
	}
	public double getDensity() {
		return this.density;
	}
	public void setDensity(double density) {
		this.density = density;
	}
	public String getTimezone() {
		return this.timezone;
	}
	public void setTimezone(String timezone) {
		this.timezone = timezone;
	}
	
	
	
	
	
	
}