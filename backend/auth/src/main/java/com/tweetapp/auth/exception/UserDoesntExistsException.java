package com.tweetapp.auth.exception;

@SuppressWarnings("serial")
public class UserDoesntExistsException extends RuntimeException {
	public UserDoesntExistsException(String message) {
		super(message);
	}
}
