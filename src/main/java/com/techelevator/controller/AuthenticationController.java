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
import com.techelevator.model.JDBCTwilioDbDAO;
import com.techelevator.model.TwilioDb;
import com.techelevator.model.TwilioDbDAO;
import com.techelevator.model.User;
import com.techelevator.model.UserDAO;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

@Controller
public class AuthenticationController {

	private UserDAO userDAO;
	private TwilioDbDAO twilioDbDAO;
	

	@Autowired
	public AuthenticationController(UserDAO userDAO, TwilioDbDAO twilioDbDAO) {
		this.userDAO = userDAO;
		this.twilioDbDAO = twilioDbDAO;
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
		User currentUser = (User) session.getAttribute("currentUser");
		
		//Call to an API. Parse JSON data into Java DailyForecast object. Make a bar chart.
		/*COMMENTED OUT FOR WEDNESDAY AUG22 DEMO BECAUSE API SERVICE IS DOWN
		String chartTitle = "Daily Forecast: High Temperatures";
		DailyForecast dailyForecast = new DailyForecast();
		APICalls apiCalls = new APICalls();
		DailyForecast dailyForecast2 = apiCalls.retrieveDailyForecast("40.4406,-79.9959", dailyForecast);
		BarChartForecastGenerator barChartGenerator = new BarChartForecastGenerator(chartTitle, dailyForecast2);
		 */
		try {
		String phoneNumber = currentUser.getPhone();
		TwilioDb twilioDb = twilioDbDAO.getCredentials();
		Twilio.init(twilioDb.getAccountSid(), twilioDb.getAuthToken());

        Message message = Message
                .creator(new PhoneNumber("+1" + phoneNumber.replaceAll("[^\\d]", "")), // to
                        new PhoneNumber(twilioDb.getFromPhone()), // from
                        "You are on the dashboard" + currentUser.getUserName() + "!\nLove, WeatherViz")
                .create();
		
		}
		catch (NullPointerException e){
			System.out.println("There wasn't a phone number for: " + currentUser.getUserName());
			
		}
		return "userDashboard";
		
	}
	
	@RequestMapping(path="/logout", method=RequestMethod.POST)
	public String logout(ModelMap model, HttpSession session) {
		model.remove("currentUser");
		session.invalidate();
		return "redirect:/login";
	}
}
