package com.tweetapp.auth.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
@Document(collection = "user")
public class User {
	
	@Id
	@NotEmpty
	private String userName;

	@NotEmpty(message = "Password cannot be null")
	private String password;
	
	@NotEmpty(message = "First Name cannot be null")
	private String firstName;
	
	@NotEmpty(message = "Last Name cannot be null")
	private String lastName;
	
	@NotEmpty(message = "Email Id cannot be null")
	@Pattern(regexp = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$", message = "wrong emailId format")
	@Indexed(unique = true)
	private String emailId;
	
	@NotEmpty(message = "Contact Number cannot be null")
	@Pattern(regexp="^[1-9][0-9]{9}",message = "contactNumber should have 10 digits starting with nonzero")
	private String contactNumber;
	
	
}
