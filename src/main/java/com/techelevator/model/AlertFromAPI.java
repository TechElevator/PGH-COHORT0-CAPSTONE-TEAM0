package com.techelevator.model;

import java.util.List;

public class AlertFromAPI {

	private String type;
	private List<String> features;
	private String title;
	private String updated;
	
	public String getType() {
		return type;
	}
	public List<String> getFeatures() {
		return features;
	}
	public String getTitle() {
		return title;
	}
	public String getUpdated() {
		return updated;
	}
	public void setType(String type) {
		this.type = type;
	}
	public void setFeatures(List<String> features) {
		this.features = features;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public void setUpdated(String updated) {
		this.updated = updated;
	}
	
}
