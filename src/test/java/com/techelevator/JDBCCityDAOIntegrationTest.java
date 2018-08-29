package com.techelevator;

import javax.sql.DataSource;

import org.junit.Assert;
import org.junit.Test;

import com.techelevator.model.City;
import com.techelevator.model.JDBCCityDAO;


public class JDBCCityDAOIntegrationTest extends DAOIntegrationTest {
	


/*	
=======
=======
>>>>>>> b542813099d37f88f62b155bf6e2bbc795bef0f0
	/*
>>>>>>> d99850002b8c33be4b5c9b3b9cffc1655a42e33c
	private DataSource dataSource = getDataSource();
	private JDBCCityDAO cityDAO = new JDBCCityDAO(dataSource);
	
	
	@Test
	public void get_seattle_by_id_test() {
		City seattleTest = new City();
		seattleTest = cityDAO.getCityById(1840021117);
		Assert.assertEquals("Seattle", seattleTest.getCityName());
		Assert.assertEquals("Washington", seattleTest.getStateName());
		Assert.assertEquals("WA", seattleTest.getStateId());
		Assert.assertEquals(47.6217, seattleTest.getLatitude(), 0.0);
		Assert.assertEquals(-122.3238, seattleTest.getLongitude(), 0.0);
		Assert.assertEquals(3541236, seattleTest.getPopulation());
		Assert.assertEquals(3243.0, seattleTest.getDensity(), 0.0);
		Assert.assertEquals("America/Los_Angeles", seattleTest.getTimezone());
		Assert.assertEquals("47.6217,-122.3238", seattleTest.getLatLon());
	}
	
	@Test
	public void get_seattle_by_name_and_state_test() {
		City seattleTest = new City();
		seattleTest = cityDAO.getCityByNameAndState("Seattle",  "WA");
		Assert.assertEquals(1840021117, seattleTest.getCityId());
		Assert.assertEquals("Washington", seattleTest.getStateName());
		Assert.assertEquals(47.6217, seattleTest.getLatitude(), 0.0);
		Assert.assertEquals(-122.3238, seattleTest.getLongitude(), 0.0);
		Assert.assertEquals(3541236, seattleTest.getPopulation());
		Assert.assertEquals(3243.0, seattleTest.getDensity(), 0.0);
		Assert.assertEquals("America/Los_Angeles", seattleTest.getTimezone());
		Assert.assertEquals("47.6217,-122.3238", seattleTest.getLatLon());
	}
*/
}
