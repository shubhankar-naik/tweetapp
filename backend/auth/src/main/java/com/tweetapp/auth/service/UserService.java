package com.tweetapp.auth.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tweetapp.auth.exception.UserAlreadyExistsException;
import com.tweetapp.auth.exception.UserDoesntExistsException;
import com.tweetapp.auth.model.User;
import com.tweetapp.auth.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class UserService {

	@Autowired
	UserRepository userRepository;
	
	public User registerNewUser(User user) {
		user.setUserName(user.getUserName().toLowerCase());
		log.info("Inside register new user service");
		if(userRepository.existsById(user.getUserName())) {
			log.error("Username already exists");
			throw new UserAlreadyExistsException("Username already exists");
		}
		return userRepository.save(user);
		
	}
	
	public User checkuserName(String userName, String newPassword) {
		log.info("Inside forgot password checking username service");
		if(!userRepository.existsById(userName.toLowerCase())) {
			throw new UserDoesntExistsException("Username doesn't exists");
			
		}
		User user=userRepository.findByUserName(userName.toLowerCase());
		user.setPassword(newPassword);
		userRepository.save(user);
		log.info("new password saved");
		return user;
	}
	
	public List<String> getAllUsers(){
		log.info("Inside get all users service");
		List<User> userList=new ArrayList<User>();
		List<String> usernames= new ArrayList<String>();
		userList=userRepository.findusers();
		for(User u:userList) {
			usernames.add(u.getUserName());
		}
		return usernames;
	}
	
	public List<String> getUserNames(String username){
		log.info("Inside get usernames on basis of search service");
		List<User> userList=new ArrayList<User>();
		List<String> usernames= new ArrayList<String>();
		userList=userRepository.findByUserNameStartsWith(username.toLowerCase());
		for(User u:userList) {
			usernames.add(u.getUserName());
		}
		return usernames;
	}
	
	
}
