package com.techelevator.model;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import com.techelevator.security.PasswordHasher;

@Component
public class JDBCTwilioDbDAO implements TwilioDbDAO {
	
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	public JDBCTwilioDbDAO(DataSource dataSource) {
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}


	
	public TwilioDb getCredentials() {
		
		String sqlSearchForCredentials = "SELECT * FROM twilio_auth;";
		
		SqlRowSet creds = jdbcTemplate.queryForRowSet(sqlSearchForCredentials);
		TwilioDb twilio = new TwilioDb();
		if (creds.next()) {
			twilio.setAccountSid(creds.getString("account_sid"));
			twilio.setAuthToken(creds.getString("auth_token"));
			twilio.setFromPhone(creds.getString("from_phone"));
		}
		
		return twilio;
	}
		
		
		
//		String sqlSearchForUsername = "SELECT * " + "FROM app_user " + "WHERE UPPER(user_name) = ? ";
//
//		SqlRowSet user = jdbcTemplate.queryForRowSet(sqlSearchForUsername, userName.toUpperCase());
//		User thisUser = null;
//		if (user.next()) {
//			thisUser = new User();
//			thisUser.setUserName(user.getString("user_name"));
//			thisUser.setPassword(user.getString("password"));
//			thisUser.setDefaultCity(user.getString("default_city"));
//			thisUser.setDefaultLatitude(user.getDouble("default_latitude"));
//			thisUser.setDefaultLongitude(user.getDouble("default_longitude"));
//			thisUser.setDefaultPopulation(user.getInt("default_population"));
//			thisUser.setDefaultRegion(user.getString("default_region"));
//			thisUser.setDefaultTimezone(user.getString("default_timezone"));
//			thisUser.setDefaultUnits(user.getString("default_units"));
//			thisUser.setDefaultVisualization(user.getString("default_visualization"));
//			thisUser.setPhone(user.getString("phone"));
//		}
//
//		return thisUser;	
	
	
	

}
