package com.techelevator.model;

public class TwilioDb {
	
	private String accountSid;
	private String authToken;
	private String fromPhone;
	
	public String getAccountSid() {
		return this.accountSid;
	}
	public void setAccountSid(String accountSid) {
		this.accountSid = accountSid;
	}
	public String getAuthToken() {
		return this.authToken;
	}
	public void setAuthToken(String authToken) {
		this.authToken = authToken;
	}
	public String getFromPhone() {
		return this.fromPhone;
	}
	public void setFromPhone(String fromPhone) {
		this.fromPhone = fromPhone;
	}
	
	

}
