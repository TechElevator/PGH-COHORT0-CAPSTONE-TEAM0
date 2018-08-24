package com.techelevator.model;

public interface UserDAO {

	public void saveUser(String userName, String password, long defaultCityId, String defaultUnits,
			String defaultVisualization);

	public boolean searchForUsernameAndPassword(String userName, String password);

	public void updatePassword(String userName, String password);

	public void updateUnits(String userName, String units);

	public void updateDefaultVisualization(String userName, String defaultVisualization);

	public Object getUserByUserName(String userName);

	public void updateDefaultUnits(String userName, String defaultUnits);

	public void updateDefaultCity(String userName, long cityId);

	public void saveUser2(String userName, String password, String defaultCity, String defaultUnits,
			String defaultVisualization, String defaultRegion, double defaultLatitude, double defaultLongitude,
			int defaultPopulation, String defaultTimezone);
}
