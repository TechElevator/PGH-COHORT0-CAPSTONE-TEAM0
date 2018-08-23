package com.techelevator.model;

public interface UserDAO {

	public void saveUser(String userName, String password, long defaultCityId, String defaultUnits, String defaultVisualization);

	public boolean searchForUsernameAndPassword(String userName, String password);

	public void updatePassword(String userName, String password);
	
	public void updateUnits(String userName, String units);

	public Object getUserByUserName(String userName);

}
