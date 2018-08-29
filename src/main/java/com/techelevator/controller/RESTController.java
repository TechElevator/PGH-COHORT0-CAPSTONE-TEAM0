package com.techelevator.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.techelevator.model.APICalls;
import com.techelevator.model.DailyForecast;
import com.techelevator.model.darkSkyForecast;

//Rest controller for serving JSON objects
@RestController
public class RESTController {

	/*
	@Autowired
	private SurveyDao surveyDao;
	*/
	
	@RequestMapping(value = "API/dailyForecast/{latLon}", method = RequestMethod.GET, produces = "application/json")
	public darkSkyForecast serveDailyForecastJSON(@PathVariable String latLon) {

		latLon = "39.00,-79.9959";
		APICalls apiCalls = new APICalls();
		
		System.out.println("Great job!");
		
		return apiCalls.retrieveDailyForecastFromDarkSky(latLon);
		
	}
	
	@RequestMapping(value = "API/current/{latLon}", method = RequestMethod.GET, produces = "application/json")
	public darkSkyForecast serveCurrentConditionsJSON(@PathVariable String latLon) {

		latLon = "39.00,-79.9959";
		APICalls apiCalls = new APICalls();
		
		System.out.println("Great job!");
		
		return apiCalls.retrieveCurrentConditionsFromDarkSky(latLon);
		
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
