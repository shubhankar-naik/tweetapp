package com.tweetapp.auth.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.tweetapp.auth.config.JwtTokenUtil;
import com.tweetapp.auth.dto.JwtRequest;
import com.tweetapp.auth.service.JwtUserDetailsService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tweetapp.auth.model.User;

@SpringBootTest
@AutoConfigureMockMvc
public class ControllerTest {
	
	@SuppressWarnings("deprecation")
	@BeforeEach
	public void init() {
		MockitoAnnotations.initMocks(this);
	}
	
	@Mock
	JwtAuthenticationController auth;

	@Autowired
	private MockMvc mockMvc;

	@MockBean
	private JwtUserDetailsService userDetailsService;

	@MockBean
	private JwtTokenUtil jwtTokenUtil;

	@MockBean
	private AuthenticationManager authenticationManager;

	static User user;
	
	String apiVersion="/api/v1.0/tweets";
	@BeforeAll
	static void setUser(){
		user = new User("user", "pass", "firstname","lastname","a@b.com","0987676543");
	}
//	@Test
//	void testBadRequestGenerateToken() throws Exception {
//		this.mockMvc.perform(post(apiVersion+"/login")).andExpect(status().isBadRequest());
//	}

	@Test
	void testAuthorizedGenerateToken() throws Exception {

		
		UserDetails details = new org.springframework.security.core.userdetails.User(user.getUserName(),
				user.getPassword(), new ArrayList<>());
		when(jwtTokenUtil.generateToken(details)).thenReturn("token");
		when(userDetailsService.loadUserByUsername("shubhankarnaik")).thenReturn(details);
		ObjectMapper mapper = new ObjectMapper();
		String jsonString = mapper.writeValueAsString(new JwtRequest("shubhankarnaik", "root"));
		this.mockMvc.perform(post(apiVersion+"/login").contentType(MediaType.APPLICATION_JSON).content(jsonString));
	}

//	@Test
//	void testBadRequest() throws Exception {
//		this.mockMvc.perform(post(apiVersion+"/login")).andExpect(status().isBadRequest());
//	}

	@Test
	void testRandomUrl() throws Exception {
		this.mockMvc.perform(get("/other/url")).andExpect(status().isNotFound());
	}

	@Test
	void textExistingUserAuthenticate() throws Exception {
		
		UserDetails details = new org.springframework.security.core.userdetails.User(user.getUserName(),
				user.getPassword(), new ArrayList<>());
		UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
				"shubhankarnaik", "roo");
		when(authenticationManager.authenticate(new UsernamePasswordAuthenticationToken("shubhankarnaik", "root")))
				.thenReturn(usernamePasswordAuthenticationToken);
		when(userDetailsService.loadUserByUsername("shubhankarnaik")).thenReturn(details);
		when(jwtTokenUtil.getUsernameFromToken("token")).thenReturn("shubhankarnaik");
		when(jwtTokenUtil.generateToken(details)).thenReturn("token");
		ObjectMapper mapper = new ObjectMapper();
		mockMvc.perform(MockMvcRequestBuilders.post(apiVersion+"/login").contentType(MediaType.APPLICATION_JSON)
				.content(mapper.writeValueAsString(new JwtRequest("shubhankarnaik", "root"))));

	}

	@Test
	void textExistingUserAuthorize() throws Exception {
		
		UserDetails details = new org.springframework.security.core.userdetails.User(user.getUserName(),
				user.getPassword(), new ArrayList<>());
		when(userDetailsService.loadUserByUsername("user")).thenReturn(details);
		when(jwtTokenUtil.getUsernameFromToken("token")).thenReturn("shubhankarnaik");
		mockMvc.perform(MockMvcRequestBuilders.post(apiVersion+"/authorize").header("Authorization", "Bearer token"))
				.andExpect(status().isOk());

	}

	@Test
	void textNullTokenAuthorize() throws Exception {
		
		UserDetails details = new org.springframework.security.core.userdetails.User(user.getUserName(),
				user.getPassword(), new ArrayList<>());
		when(userDetailsService.loadUserByUsername("shubhankarnaik")).thenReturn(details);
		when(jwtTokenUtil.getUsernameFromToken("token")).thenReturn("shubhankarnaik");
		mockMvc.perform(MockMvcRequestBuilders.post(apiVersion+"/authorize").header("Authorization", "")
				.contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk());

	}
	
	@Test 
	void testRegisterNewUser() throws Exception{
		String usr=this.mapToJson(user);
		MvcResult mvcResult=mockMvc.perform(post(apiVersion+"/register").contentType("application/json").content(usr)).andReturn();
		
	}
	
	@Test
	void testForgotPassword() throws Exception{
		String username="user";
		String usr=this.mapToJson(user);
		MvcResult mvcResult=mockMvc.perform(get(apiVersion+"/"+username+"/forgot").contentType("application/json").content(usr)).andReturn();
		
	}
	
	@Test
	void testGetAllUsers() throws Exception{
		
		when(auth.authorizeTheRequest("Bearer hello")).thenReturn(true);
		
	}
	
	@Test
	void testGetUserNames() throws Exception{
		String username="user";
		when(auth.authorizeTheRequest("Bearer hello")).thenReturn(true);
		MvcResult mvcResult=mockMvc.perform(get(apiVersion+"/user/search/"+username).header("Authorization", "Bearer hello")).andReturn();
		
	}
	
	@Test
    void heatlthCheck() throws Exception {
        this.mockMvc.perform(get(apiVersion+"/health-check")).andExpect(status().isOk());
    }
	
	String mapToJson(Object object) throws JsonProcessingException{
		ObjectMapper ob=new ObjectMapper();
		return ob.writeValueAsString(object);
	}

}
