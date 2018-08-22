package com.techelevator.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.techelevator.model.APICalls;
import com.techelevator.model.BarChartForecastGenerator;
import com.techelevator.model.DailyForecast;
import com.techelevator.model.UserDAO;

@Controller
public class AuthenticationController {

	private UserDAO userDAO;

	@Autowired
	public AuthenticationController(UserDAO userDAO) {
		this.userDAO = userDAO;
	}

	@RequestMapping(path="/login", method=RequestMethod.GET)
	public String displayLoginForm() {
		return "login";
	}
	
	@RequestMapping(path="/login", method=RequestMethod.POST)
	public String login(@RequestParam String userName, 
						@RequestParam String password, 
						@RequestParam(required=false) String destination,
						HttpSession session) {
		if(userDAO.searchForUsernameAndPassword(userName, password)) {
			session.setAttribute("currentUser", userDAO.getUserByUserName(userName));
			session.setAttribute("currentUserName", userName);
			
			if(destination != null && ! destination.isEmpty()) {
				return "redirect:" + destination;
			} else {
				return "redirect:/users/"+userName;
			}
		} else {
			return "redirect:/login";
		}
	}

	
	@RequestMapping(path = "/users/{userName}", method = RequestMethod.GET)
		public String displayUserDashboard(@PathVariable String userName, HttpServletRequest request) {
		HttpSession session = request.getSession();
		session.getAttribute("currentUser");
		
		//Call to an API. Parse JSON data into Java DailyForecast object. Make a bar chart.
		String chartTitle = "Daily Forecast: High Temperatures";
		DailyForecast dailyForecast = new DailyForecast();
		APICalls apiCalls = new APICalls();
		DailyForecast dailyForecast2 = apiCalls.retrieveDailyForecast("40.4406,-79.9959", dailyForecast);
		BarChartForecastGenerator barChartGenerator = new BarChartForecastGenerator(chartTitle, dailyForecast2);
		
		
		
		
		return "userDashboard";
	}
	
	@RequestMapping(path="/logout", method=RequestMethod.POST)
	public String logout(ModelMap model, HttpSession session) {
		model.remove("currentUser");
		session.invalidate();
		return "redirect:/login";
	}
}
