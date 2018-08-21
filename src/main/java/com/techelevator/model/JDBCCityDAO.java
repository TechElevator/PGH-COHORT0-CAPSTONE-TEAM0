package com.techelevator.model;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

@Component
public class JDBCCityDAO implements CityDAO {

	private JdbcTemplate jdbcTemplate;

	@Autowired
	public JDBCCityDAO(DataSource datasource) {
		this.jdbcTemplate = new JdbcTemplate(datasource);
	}

	@Override
	public City getCityById(long id) {
		City resultCity = new City();

		String stringSearch = "SELECT id, city, state_id, state_name, lat, lng, population, density, timezone FROM city WHERE id = ?;";

		SqlRowSet results = jdbcTemplate.queryForRowSet(stringSearch, id);

		if (results.next()) {
			resultCity = mapRowToCity(results);
		} else {
			resultCity = null;
		}
		return resultCity;

	}	
	
	public City getCityByNameAndState(String cityName, String stateName) {
		City resultCity = new City();

		String stringSearch = "SELECT id, city, state_id, state_name, lat, lng, population, density, timezone FROM city WHERE city = ? AND state_id = ?;";

		SqlRowSet results = jdbcTemplate.queryForRowSet(stringSearch, cityName, stateName);

		if (results.next()) {
			resultCity = mapRowToCity(results);
		} else {
			resultCity = null;
		}
		return resultCity;
		
	}
	
	private City mapRowToCity(SqlRowSet results) {
		  City cityRow = new City();
		  	cityRow.setCityId(results.getLong("id"));
		  	cityRow.setCityName(results.getString("city"));
		  	cityRow.setStateId(results.getString("state_id"));
		  	cityRow.setStateName(results.getString("state_name"));
		  	cityRow.setLatitude(results.getDouble("lat"));	    
		  	cityRow.setLongitude(results.getDouble("lng"));
		  	cityRow.setPopulation(results.getDouble("population"));
		  	cityRow.setDensity(results.getDouble("density"));
		  	cityRow.setTimezone(results.getString("timezone"));
		  	 	
		  	return cityRow;
	}

}
