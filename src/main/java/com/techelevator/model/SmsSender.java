package com.techelevator.model;

	// Install the Java helper library from twilio.com/docs/libraries/java
	import com.twilio.Twilio;
	import com.twilio.rest.api.v2010.account.Message;
	import com.twilio.type.PhoneNumber;

	public class SmsSender {
		/*
	    // Find your Account Sid and Auth Token at twilio.com/console
	    public static final String ACCOUNT_SID =
	            "ACc662cd062611460d4b264698fc7dec62";
	    public static final String AUTH_TOKEN =
	            "49dc4284ba5cfba87f9c1a2454d598d9";

	    public static void main(String[] args) {
	        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

	        Message message = Message
	                .creator(new PhoneNumber("+14126573458"), // to
	                        new PhoneNumber("+18782187024"), // from
	                        "Where's Wallace?")
	                .create();

	        System.out.println(message.getSid());
	        
	    }
	    */
	}