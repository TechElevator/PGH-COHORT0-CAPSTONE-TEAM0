package com.techelevator.model;

import java.util.Timer;
import java.util.TimerTask;

import javax.sql.DataSource;

import org.bouncycastle.util.encoders.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import com.techelevator.model.User;
import com.techelevator.security.PasswordHasher;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

@Component
public class JDBCUserDAO implements UserDAO {

	private JdbcTemplate jdbcTemplate;
	private PasswordHasher hashMaster;

	@Autowired
	public JDBCUserDAO(DataSource dataSource, PasswordHasher hashMaster) {
		this.jdbcTemplate = new JdbcTemplate(dataSource);
		this.hashMaster = hashMaster;
	}

/*
	@Override
	public void saveUser(String userName, String password, long defaultCityId, String defaultUnits,
			String defaultVisualization) {
		byte[] salt = hashMaster.generateRandomSalt();
		String hashedPassword = hashMaster.computeHash(password, salt);
		String saltString = new String(Base64.encode(salt));

		jdbcTemplate.update(
				"INSERT INTO app_user(user_name, password, salt, default_city_id, default_units, default_visualization) VALUES (?, ?, ?, ?, ?, ?)",
				userName, hashedPassword, saltString, defaultCityId, defaultUnits, defaultVisualization);
	}
	*/

	@Override
	public void saveUser2(String userName, String password, String defaultCity, String defaultUnits,
			String defaultVisualization, String defaultRegion, double defaultLatitude, double defaultLongitude,
			int defaultPopulation, String defaultTimezone) {
		
		byte[] salt = hashMaster.generateRandomSalt();
		String hashedPassword = hashMaster.computeHash(password, salt);
		String saltString = new String(Base64.encode(salt));
		System.out.println("you are here line 46");
		jdbcTemplate.update(
				"INSERT INTO app_user(user_name, password, salt, default_city, default_units, default_visualization, default_region, default_latitude, default_longitude, default_population, default_timezone ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
				userName, hashedPassword, saltString, defaultCity, defaultUnits, defaultVisualization, defaultRegion,
				defaultLatitude, defaultLongitude, defaultPopulation, defaultTimezone);
		
		//BEGIN TWILIO TEST
		
/*	    final String ACCOUNT_SID =
	            "ACc662cd062611460d4b264698fc7dec62";
	    final String AUTH_TOKEN =
	            "49dc4284ba5cfba87f9c1a2454d598d9";
	    
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

        Message message = Message
                .creator(new PhoneNumber("+14126573458"), // to
                        new PhoneNumber("+18782187024"), // from
                        "Where's Wallace?")
                .create();

        System.out.println(message.getSid());
        */
        
        //END TWILIO TEST


		
	}

	@Override
	public boolean searchForUsernameAndPassword(String userName, String password) {
		String sqlSearchForUser = "SELECT * " + "FROM app_user " + "WHERE UPPER(user_name) = ? ";

		SqlRowSet user = jdbcTemplate.queryForRowSet(sqlSearchForUser, userName.toUpperCase());
		if (user.next()) {
			String dbSalt = user.getString("salt");
			String dbHashedPassword = user.getString("password");
			String givenPassword = hashMaster.computeHash(password, Base64.decode(dbSalt));
			return dbHashedPassword.equals(givenPassword);
		} else {
			return false;
		}
	}

	@Override
	public void updatePassword(String userName, String password) {
		byte[] salt = hashMaster.generateRandomSalt();
		String hashedPassword = hashMaster.computeHash(password, salt);
		String saltString = new String(Base64.encode(salt));
		System.out.println("password: " + password);
		System.out.println("hashedPassword: " + hashedPassword);
		System.out.println("saltString: " + saltString);
		jdbcTemplate.update("UPDATE app_user SET password = ? WHERE user_name = ?", hashedPassword, userName);
		jdbcTemplate.update("UPDATE app_user SET salt = ? WHERE user_name = ?", saltString, userName);
	}

	@Override
	public void updateUnits(String userName, String units) {
		jdbcTemplate.update("UPDATE app_user SET default_units = ? WHERE user_name = ?", units, userName);
	}
	
	@Override
	public void updateDefaultVisualization(String userName, String defaultVisualization) {
		jdbcTemplate.update("UPDATE app_user SET default_visualization = ? WHERE user_name = ?", defaultVisualization,
				userName);
	}

	@Override
	public void updateDefaultUnits(String userName, String defaultUnits) {
		jdbcTemplate.update("UPDATE app_user SET default_visualization = ? WHERE user_name = ?", defaultUnits,
				userName);
	}

	@Override
	public void updateDefaultCity(String userName, String defaultCity) {
		jdbcTemplate.update("UPDATE app_user SET default_city = ? WHERE user_name = ?", defaultCity, userName);
	}
	
	@Override
	public void updateDefaultRegion(String userName, String defaultRegion) {
		jdbcTemplate.update("UPDATE app_user SET default_region = ? WHERE user_name = ?", defaultRegion, userName);
	}
	
	@Override
	public void updateDefaultLatitude(String userName, double defaultLatitude) {
		jdbcTemplate.update("UPDATE app_user SET default_latitude = ? WHERE user_name = ?", defaultLatitude, userName);
	}
	
	@Override
	public void updateDefaultLongitude(String userName, double defaultLongitude) {
		jdbcTemplate.update("UPDATE app_user SET default_longitude = ? WHERE user_name = ?", defaultLongitude, userName);
	}
	

	@Override
	public void updateDefaultPopulation(String userName, long defaultPopulation) {
		jdbcTemplate.update("UPDATE app_user SET default_population = ? WHERE user_name = ?", defaultPopulation, userName);
	}
	
	
	@Override
	public void updateDefaultTimezone(String userName, String defaultTimezone) {
		jdbcTemplate.update("UPDATE app_user SET default_timezone = ? WHERE user_name = ?", defaultTimezone, userName);
	}
	
	@Override
	public void updatePhone(String userName, String phone) {
		String cleanedPhone = phone.replaceAll("[^\\d]", "").substring(1);
		System.out.println("Cleaned phone is " + cleanedPhone);
		jdbcTemplate.update("UPDATE app_user SET phone = ? WHERE user_name = ?", cleanedPhone, userName);
	}


	@Override
	public Object getUserByUserName(String userName) {
		String sqlSearchForUsername = "SELECT * " + "FROM app_user " + "WHERE UPPER(user_name) = ? ";

		SqlRowSet user = jdbcTemplate.queryForRowSet(sqlSearchForUsername, userName.toUpperCase());
		User thisUser = null;
		if (user.next()) {
			thisUser = new User();
			thisUser.setUserName(user.getString("user_name"));
			thisUser.setPassword(user.getString("password"));
			thisUser.setDefaultCity(user.getString("default_city"));
			thisUser.setDefaultLatitude(user.getDouble("default_latitude"));
			thisUser.setDefaultLongitude(user.getDouble("default_longitude"));
			thisUser.setDefaultPopulation(user.getInt("default_population"));
			thisUser.setDefaultRegion(user.getString("default_region"));
			thisUser.setDefaultTimezone(user.getString("default_timezone"));
			thisUser.setDefaultUnits(user.getString("default_units"));
			thisUser.setDefaultVisualization(user.getString("default_visualization"));
			thisUser.setPhone(user.getString("phone"));
		}

		return thisUser;
	}

}
