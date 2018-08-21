package com.techelevator.model;

public interface CityDAO {
	
	public City getCityById(long id);
	
	public City getCityByNameAndState(String cityName, String stateName);

}
