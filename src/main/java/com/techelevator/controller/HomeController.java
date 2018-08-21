package com.techelevator.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.techelevator.model.BarChartForecastGenerator;
import com.techelevator.model.DailyForecast;

@Controller	
public class HomeController {

@RequestMapping(path = "/", method = RequestMethod.GET)
	public String showGenericHomePage(HttpServletRequest request) {
	
		//FOR DEMO PURPOSES------------------------------------------------------
		//Create a dummy daily forecast object, pass to BarChartForecastGenerator
		//In the real application, this forecast object will be created after
		//making a call to the weather api to get an actual 7 day forecast
		String chartTitle = "Test Chart: Daily Forecast";
		DailyForecast dailyForecast = new DailyForecast();
		ArrayList<Integer> highTemps = new ArrayList<Integer>();
		ArrayList<String> forecastDays = new ArrayList<String>();
		highTemps.add(60);
		highTemps.add(62);
		highTemps.add(77);
		highTemps.add(84);
		highTemps.add(85);
		highTemps.add(78);
		highTemps.add(75);
		forecastDays.add("Wedensday");
		forecastDays.add("Thursday");
		forecastDays.add("Friday");
		forecastDays.add("Saturday");
		forecastDays.add("Sunday");
		forecastDays.add("Monday");
		forecastDays.add("Tuesday");
		
		dailyForecast.setForecastDay(forecastDays);
		dailyForecast.setHighs(highTemps);
		//BarChartForecastGenerator barChartGenerator = new BarChartForecastGenerator(chartTitle, dailyForecast);
		//barChartGenerator.generateForecastBarChart(barChartGenerator);
		
		//END DEMO PURPOSES-----------------------------------------------------
		
	
		return "homepage";
	}
	


	
@RequestMapping(path = "/users/{currentUser.name}/settings", method = RequestMethod.GET)
	public String showSettingsPage (HttpServletRequest request) {
	HttpSession session = request.getSession();
	session.getAttribute("currentUser");
	
	return "settings";
	
}



}