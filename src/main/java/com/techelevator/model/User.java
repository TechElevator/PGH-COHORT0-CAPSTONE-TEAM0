package com.techelevator.model;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class User {
	private String userName;
	
	@Size(min=10, message="Password too short, must be at least 10")
	@Pattern.List({
		@Pattern(regexp=".*[a-z].*", message="Must have a lower case"),
		@Pattern(regexp=".*[A-Z].*", message="Must have a capital")
	})
	private String password;
	private String role;
	private long defaultCityId;
	private String defaultVisualization;
	private String defaultUnits;
	private String defaultCity;
	private String defaultRegion;
	private double defaultLatitude;
	private double defaultLongitude;
	private int defaultPopulation;
	private String defaultTimezone;
	
	private String confirmPassword;
	public String getUserName() {
		return userName;
	}
	/**
	 * @return the role
	 */
	public String getRole() {
		return role;
	}
	/**
	 * @param role the role to set
	 */
	public void setRole(String role) {
		this.role = role;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getConfirmPassword() {
		return confirmPassword;
	}
	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}
	public long getDefaultCityId() {
		return defaultCityId;
	}
	public void setDefaultCityId(long defaultCityId) {
		this.defaultCityId = defaultCityId;
	}
	public String getDefaultVisualization() {
		return defaultVisualization;
	}
	public void setDefaultVisualization(String defaultVisualization) {
		this.defaultVisualization = defaultVisualization;
	}
	public String getDefaultUnits() {
		return defaultUnits;
	}
	public void setDefaultUnits(String defaultUnits) {
		this.defaultUnits = defaultUnits;
	}
	public String getDefaultCity() {
		return defaultCity;
	}
	public void setDefaultCity(String defaultCity) {
		this.defaultCity = defaultCity;
	}
	public String getDefaultRegion() {
		return defaultRegion;
	}
	public void setDefaultRegion(String defaultRegion) {
		this.defaultRegion = defaultRegion;
	}
	public double getDefaultLatitude() {
		return defaultLatitude;
	}
	public void setDefaultLatitude(double defaultLatitude) {
		this.defaultLatitude = defaultLatitude;
	}
	public double getDefaultLongitude() {
		return defaultLongitude;
	}
	public void setDefaultLongitude(double defaultLongitude) {
		this.defaultLongitude = defaultLongitude;
	}
	public int getDefaultPopulation() {
		return defaultPopulation;
	}
	public void setDefaultPopulation(int defaultPopulation) {
		this.defaultPopulation = defaultPopulation;
	}
	public String getDefaultTimezone() {
		return defaultTimezone;
	}
	public void setDefaultTimezone(String defaultTimezone) {
		this.defaultTimezone = defaultTimezone;
	}

}
