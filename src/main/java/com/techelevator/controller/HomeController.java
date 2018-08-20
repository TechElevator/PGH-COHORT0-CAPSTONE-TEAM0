package com.techelevator.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller	
public class HomeController {

@RequestMapping(path = "/", method = RequestMethod.GET)
	public String showGenericHomePage(HttpServletRequest request) {
		
	return "homepage";
	}
	


	
@RequestMapping(path = "/users/{currentUser.name}/settings", method = RequestMethod.GET)
	public String showSettingsPage (HttpServletRequest request) {
	HttpSession session = request.getSession();
	session.getAttribute("currentUser");
	
	return "settings";
	
}



}