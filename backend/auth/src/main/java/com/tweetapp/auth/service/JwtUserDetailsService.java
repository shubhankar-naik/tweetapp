package com.tweetapp.auth.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.tweetapp.auth.dto.MyUserDetails;
import com.tweetapp.auth.model.User;
import com.tweetapp.auth.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class JwtUserDetailsService implements UserDetailsService {
	
	@Autowired
	private UserRepository userDao;

//	@SuppressWarnings("unused")
//	@Autowired
//	private PasswordEncoder bcryptEncoder;

	@Override
	public UserDetails loadUserByUsername(String userName) {
		/** fetching user by userName, if user is null the throw exception, otherwise
		 * return user
		 */
		User user = userDao.findByUserName(userName);
		if (user == null) {
			throw new UsernameNotFoundException("User not found with username: " + userName);
		}
		log.info("User found");
		log.info("user successfully located");
		//org.springframework.security.core.userdetails.User u=new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(),new ArrayList<>());
		
		return new MyUserDetails(user);
		//return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(),new ArrayList<>());
	}
	
	

}