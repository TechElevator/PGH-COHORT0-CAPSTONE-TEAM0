package com.techelevator.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.techelevator.model.User;
import com.techelevator.model.UserDAO;

@Controller
public class UserController {

	private UserDAO userDAO;

	@Autowired
	public UserController(UserDAO userDAO) {
		this.userDAO = userDAO;
	}

	@RequestMapping(path = "/users/new", method = RequestMethod.GET)
	public String displayNewUserForm(ModelMap modelHolder) {
		if (!modelHolder.containsAttribute("user")) {
			modelHolder.addAttribute("user", new User());
		}
		return "newUser";
	}

	@RequestMapping(path = "/users", method = RequestMethod.POST)
	public String createUser(@Valid @ModelAttribute User user, BindingResult result, RedirectAttributes flash) {
		System.out.println("posting to /users");
		if (result.hasErrors()) {
			System.out.println("has errors");
			flash.addFlashAttribute("user", user);
			flash.addFlashAttribute(BindingResult.MODEL_KEY_PREFIX + "user", result);
			return "redirect:/users/new";
		}
		
		System.out.println("about to userDAO stuff");
		System.out.println(" " + user.getUserName() +" " + user.getPassword() +" " + user.getDefaultCity() +" " + user.getDefaultUnits() +" " + 
				user.getDefaultVisualization() +" " + user.getDefaultRegion() +" " +  user.getDefaultLatitude() +" " + 
				user.getDefaultLongitude() +" " +  user.getDefaultPopulation() +" " +  user.getDefaultTimezone());
		
		
		userDAO.saveUser2(user.getUserName(), user.getPassword(), user.getDefaultCity(), user.getDefaultUnits(),
				user.getDefaultVisualization(), user.getDefaultRegion(), user.getDefaultLatitude(),
				user.getDefaultLongitude(), user.getDefaultPopulation(), user.getDefaultTimezone());
		return "redirect:/login";
	}

	@RequestMapping(path = "/users/{currentUser.name}/settings", method = RequestMethod.GET)
	public String showSettingsPage(HttpServletRequest request) {
		HttpSession session = request.getSession();
		session.getAttribute("currentUser");

		return "settings";

	}

	@RequestMapping(path = "/users/{currentUser.name}/settings", method = RequestMethod.POST)
	public String updateSettings(HttpSession session, @RequestParam String newPassword, @RequestParam String defaultViz,
			@RequestParam String defaultTempUnit, @RequestParam long homeCity) {

		User currentUser = (User) session.getAttribute("currentUser");
		userDAO.updatePassword(currentUser.getUserName(), newPassword);
		userDAO.updateDefaultVisualization(currentUser.getUserName(), defaultViz);
		userDAO.updateUnits(currentUser.getUserName(), defaultTempUnit);
		userDAO.updateDefaultCity(currentUser.getUserName(), homeCity);

		return "redirect:/users/{userName}";

	}
}
