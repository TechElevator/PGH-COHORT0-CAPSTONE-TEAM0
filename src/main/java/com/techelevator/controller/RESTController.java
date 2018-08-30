package com.techelevator.controller;


import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.techelevator.model.APICalls;
import com.techelevator.model.DailyForecast;
import com.techelevator.model.TwilioDb;
import com.techelevator.model.TwilioDbDAO;
import com.techelevator.model.User;
import com.techelevator.model.UserDAO;
import com.techelevator.model.darkSkyForecast;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

//Rest controller for serving JSON objects
@RestController
public class RESTController {

	private UserDAO userDAO;
	private TwilioDbDAO twilioDbDAO;
	
	@Autowired 
	public RESTController(UserDAO userDAO, TwilioDbDAO twilioDbDAO) {
		this.userDAO = userDAO;
		this.twilioDbDAO = twilioDbDAO;
	}
	
	
	/*
	@Autowired
	private SurveyDao surveyDao;
	*/
	
	@RequestMapping(value = "API/dailyForecast/{latLon}", method = RequestMethod.GET, produces = "application/json")
	public darkSkyForecast serveDailyForecastJSON(@PathVariable String latLon) {

		//latLon = latLon;
		APICalls apiCalls = new APICalls();
		
		System.out.println("Great job!");
		
		return apiCalls.retrieveDailyForecastFromDarkSky(latLon);
		
	}
	
	@RequestMapping(value = "API/historical/{latLon}/{date}", method = RequestMethod.GET, produces = "application/json")
	public darkSkyForecast serveHistoricalForecastJSON(@PathVariable String latLon, @PathVariable String date) {

		//latLon = latLon;
		APICalls apiCalls = new APICalls();
		
		System.out.println("Great job, historically!");
		System.out.println(date);
		
		return apiCalls.retrieveHistoricalConditionsFromDarkSky(latLon, Long.parseLong(date));
		
	}
	
	@RequestMapping(value = "API/current/{latLon}", method = RequestMethod.GET, produces = "application/json")
	public darkSkyForecast serveCurrentConditionsJSON(@PathVariable String latLon, HttpServletRequest request) {
		System.out.println("In the rest controller twilio area");
		
		HttpSession session = request.getSession();
		User currentUser = (User) session.getAttribute("currentUser");
		//latLon = "39.00,-79.9959";
		APICalls apiCalls = new APICalls();
		
		System.out.println("Great job!");
		
		darkSkyForecast currentConditions = apiCalls.retrieveCurrentConditionsFromDarkSky(latLon);
		
		System.out.println("Mean Wind is: "+ currentConditions.getMeanWind().get(0));
		try {
		String phoneNumber = currentUser.getPhone();
		TwilioDb twilioDb = twilioDbDAO.getCredentials();
		Twilio.init(twilioDb.getAccountSid(), twilioDb.getAuthToken());
		
		 Message message = Message
	                .creator(new PhoneNumber("+1" + phoneNumber.replaceAll("[^\\d]", "")), // to
	                        new PhoneNumber(twilioDb.getFromPhone()), // from
	                        "Current Temp: " + currentConditions.getHighs().get(0) + "\u00b0" + "F\n" +
	                        "Precipitation: " + currentConditions.getPrecipChance().get(0) + "% chance \n"+ 
	                        "Humidity: " + currentConditions.getHumidity().get(0).intValue() + "%\n" + 
	                        "Mean Wind: " + currentConditions.getMeanWind().get(0) + " m/s \n" + 
	                        "Wind Gust: " + currentConditions.getGustWind().get(0) + " m/s \n" +
	                        "Wind Direction: " + currentConditions.getWindDirection().get(0) + "\u00b0" +
	                        "\nCloud cover: " + currentConditions.getCloudCover().get(0)*100 + "%\n"
	                        		+ "-WeatherViz-")
	                .create();
		
		System.out.println("code after the rest controller text message");
		}catch(NullPointerException e) {
			System.out.println("There wasn't a phone number for: " + currentUser.getUserName());
		}
		return currentConditions;
		
	}


	/*
	@RequestMapping(value = "API/surveyList/{surveyID}", method = RequestMethod.GET, produces = "application/json")
	public List<Option> getQuestionsInJSON(@PathVariable int surveyID) {

		List<Option> optionList = surveyDao.getSurveyOptions(surveyID);
		return optionList;
	}
	
	@RequestMapping(value = "/surveyAdd", method = RequestMethod.POST)
	public void addSurvey(@RequestBody Survey newSurvey) {
		surveyDao.saveSurvey(newSurvey);
	}
	
	*/
	
	//Still need to make optionDao & jdbcOptionDao and implement the saveNewOption method
	/*
	@RequestMapping(value = "/optionAdd", method = RequestMethod.POST)
	public void addOption(@RequestBody Option newOption) {
		surveyDao.saveNewOption(newOption);
	}
	*/
		

	
}
