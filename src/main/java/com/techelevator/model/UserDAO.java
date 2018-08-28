package com.techelevator.model;

public interface UserDAO {

/*	public void saveUser(String userName, String password, long defaultCityId, String defaultUnits,
			String defaultVisualization);
			*/

	public boolean searchForUsernameAndPassword(String userName, String password);

	public void updatePassword(String userName, String password);

	public void updateUnits(String userName, String units);

	public void updateDefaultVisualization(String userName, String defaultVisualization);

	public Object getUserByUserName(String userName);

	public void updateDefaultUnits(String userName, String defaultUnits);

	public void updateDefaultCity(String userName, String defaultCity);
	
	public void updateDefaultRegion(String userName, String defaultRegion);
	
	public void updateDefaultLatitude(String userName, double defaultLatitude);
	
	public void updateDefaultLongitude(String userName, double defaultLongitude);
	
	public void updatePhone(String userName, String phone);
	
	public void updateDefaultPopulation(String userName, long defaultPopulation);
	
	public void updateDefaultTimezone(String userName, String defaultTimezone);

	public void saveUser2(String userName, String password, String defaultCity, String defaultUnits,
			String defaultVisualization, String defaultRegion, double defaultLatitude, double defaultLongitude,
			int defaultPopulation, String defaultTimezone);
}
