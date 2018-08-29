package com.techelevator.controller;

import javax.servlet.http.HttpServletRequest;
import javax.swing.JOptionPane;
import javax.servlet.http.HttpSession;
import javax.swing.JOptionPane;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.techelevator.model.TwilioDb;
import com.techelevator.model.TwilioDbDAO;
import com.techelevator.model.User;
import com.techelevator.model.UserDAO;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

@Controller
public class UserController {

	private UserDAO userDAO;
	private TwilioDbDAO twilioDbDAO;

	@Autowired
	public UserController(UserDAO userDAO, TwilioDbDAO twilioDbDAO) {
		this.userDAO = userDAO;
		this.twilioDbDAO = twilioDbDAO;
	}

	@RequestMapping(path = "/users/new", method = RequestMethod.GET)
	public String displayNewUserForm(ModelMap modelHolder) {
		if (!modelHolder.containsAttribute("user")) {
			modelHolder.addAttribute("user", new User());
		}
		return "newUser";
	}

	@RequestMapping(path = "/users/new", method = RequestMethod.POST)
	public String createUser(@Valid @ModelAttribute User user, BindingResult result, RedirectAttributes flash, HttpServletRequest request) {
	System.out.println("posting to /users/new");
	if (result.hasErrors()) {
	System.out.println("has errors");
	flash.addFlashAttribute("user", user);
	flash.addFlashAttribute(BindingResult.MODEL_KEY_PREFIX + "user", result);
	return "redirect:/users/new";
	}

	// System.out.println(" " + user.getUserName() + " " + user.getPassword() + " " + user.getDefaultCity() + " "
	// + user.getDefaultUnits() + " " + user.getDefaultVisualization() + " " + user.getDefaultRegion() + " "
	// + user.getDefaultLatitude() + " " + user.getDefaultLongitude() + " " + user.getDefaultPopulation() + " "
	// + user.getDefaultTimezone());

	    try {
	    userDAO.saveUser2(user.getUserName(), user.getPassword(), user.getDefaultCity(), user.getDefaultUnits(),
	            user.getDefaultVisualization(), user.getDefaultRegion(), user.getDefaultLatitude(),
	            user.getDefaultLongitude(), user.getDefaultPopulation(), user.getDefaultTimezone());

	    
	    
	    }catch(DuplicateKeyException e ) {
	    
	    	request.setAttribute("isDuplicateUsername", true);
	    System.out.println(request.getAttribute("isDuplicateUsername"));
	    	System.out.println("duplicate username found in database");
	              
	        return "newUser";
	        
	    }
	    
	    catch (Exception e){
	    	System.out.println("some error happened on the way to the database");
	        return "redirect:/users/new";
	    }
	    
	    return "redirect:/login";
	}

	@RequestMapping(path = "/users/{currentUser.name}/settings", method = RequestMethod.GET)
	public String showSettingsPage(HttpServletRequest request) {
		HttpSession session = request.getSession();
		session.getAttribute("currentUser");

		return "settings";

	}

	@RequestMapping(path = "/users/{currentUser.name}/settings", method = RequestMethod.POST)
	public String updateSettings(HttpSession session, @RequestParam String newPassword,
			@RequestParam String confirmPassword, @RequestParam String defaultViz, @RequestParam String defaultTempUnit,
			@RequestParam String defaultCity, @RequestParam double defaultLatitude,
			@RequestParam double defaultLongitude,
			/* @RequestParam long defaultPopulation, */ @RequestParam String defaultRegion,
			@RequestParam String defaultTimezone, @RequestParam String phoneNumber) {

		System.out.println(defaultCity);

		User currentUser = (User) session.getAttribute("currentUser");

		System.out.println("got user from session");
		System.out.println(currentUser.getUserName());

		if (newPassword != null && newPassword.length() >= 8 && newPassword.equals(confirmPassword)
				&& confirmPassword != null && confirmPassword.length() >= 8) {
			System.out.println("Updating password now.");
			userDAO.updatePassword(currentUser.getUserName(), newPassword);
		} else {
			System.out.println("Did not update password.");
		}

		if (defaultCity != null && !defaultCity.equals("")) {
			System.out.println("got into city change");
			System.out.println(defaultCity);
			userDAO.updateDefaultCity(currentUser.getUserName(), defaultCity);
			userDAO.updateDefaultLatitude(currentUser.getUserName(), defaultLatitude);
			userDAO.updateDefaultLongitude(currentUser.getUserName(), defaultLongitude);
			// userDAO.updateDefaultPopulation(currentUser.getUserName(),
			// defaultPopulation);
			userDAO.updateDefaultRegion(currentUser.getUserName(), defaultRegion);
			userDAO.updateDefaultTimezone(currentUser.getUserName(), defaultTimezone);
		}

		if (defaultViz != null && !defaultViz.equals("")) {
			System.out.println("got into viz change");
			userDAO.updateDefaultVisualization(currentUser.getUserName(), defaultViz);
		}
		
		if (phoneNumber != null && !phoneNumber.equals("+1 ")) {
			System.out.println("got into phone number change");
			System.out.println("Received phone value: " + phoneNumber);
			
			userDAO.updatePhone(currentUser.getUserName(), phoneNumber);
			
			TwilioDb twilioDb = twilioDbDAO.getCredentials();
			
	        Twilio.init(twilioDb.getAccountSid(), twilioDb.getAuthToken());

	        Message message = Message
	                .creator(new PhoneNumber("+1" + phoneNumber.replaceAll("[^\\d]", "").substring(1)), // to
	                        new PhoneNumber(twilioDb.getFromPhone()), // from
	                        "Thanks for registering your number, " + currentUser.getUserName() + "!\nLove, WeatherViz")
	                .create();

	        System.out.println(message.getSid());
			
		}


		if (defaultTempUnit != null && !defaultTempUnit.equals("")) {
			System.out.println("got into temp change");
			userDAO.updateUnits(currentUser.getUserName(), defaultTempUnit);
		}

		session.setAttribute("currentUser", userDAO.getUserByUserName(currentUser.getUserName()));
		session.setAttribute("currentUserName", currentUser.getUserName());

		return "redirect:/users/{currentUser.name}";

	}
}
